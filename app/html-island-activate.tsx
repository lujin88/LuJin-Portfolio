'use client'

import { useLayoutEffect, useRef } from 'react'

function cloneScript(from: HTMLScriptElement) {
  const script = document.createElement('script')
  for (const attr of from.attributes) {
    script.setAttribute(attr.name, attr.value)
  }
  const type = (script.getAttribute('type') || '').toLowerCase()
  if (type !== 'module') script.async = false
  script.textContent = from.textContent
  return script
}

function isModuleScript(script: HTMLScriptElement) {
  const type = (script.getAttribute('type') || '').toLowerCase()
  if (type === 'module') return true
  return /^\s*import\b/.test(script.textContent ?? '')
}

function restoreExecutableType(script: HTMLScriptElement) {
  if (!script.hasAttribute('data-island-script')) return
  const orig = script.getAttribute('data-island-type')
  if (orig) script.setAttribute('type', orig)
  else script.removeAttribute('type')
  script.removeAttribute('data-island-script')
  script.removeAttribute('data-island-type')
}

function replaceScripts(root: ParentNode, signal: AbortSignal) {
  const origAdd = EventTarget.prototype.addEventListener
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (typeof options === 'boolean') {
      return origAdd.call(this, type, listener, { capture: options, signal })
    }
    if (options && typeof options === 'object' && options.signal) {
      return origAdd.call(this, type, listener, options)
    }
    return origAdd.call(this, type, listener, { ...(options ?? {}), signal })
  }

  try {
    root.querySelectorAll('script').forEach((old) => {
      if (old.closest('template')) return
      if (old.hasAttribute('data-island-ran')) return
      restoreExecutableType(old)
      const next = cloneScript(old)
      const type = (next.getAttribute('type') || '').toLowerCase()
      const moduleScript = isModuleScript(next)
      if (moduleScript) next.type = 'module'
      const isClassicInline =
        !moduleScript &&
        !next.getAttribute('src') &&
        (!type || type === 'text/javascript' || type === 'application/javascript')
      // Scope top-level const/let so React Strict Mode remounts can re-run
      // classic scripts without "already been declared" errors.
      // Never wrap module scripts — wrapping `import { ... }` throws and
      // Next.js paints a white error overlay during navigation.
      if (isClassicInline) {
        next.textContent = `(function(){\n${next.textContent ?? ''}\n})();`
      }
      next.setAttribute('data-island-ran', '')
      try {
        old.replaceWith(next)
      } catch {
        next.remove()
      }
    })
  } finally {
    EventTarget.prototype.addEventListener = origAdd
  }
}

const sessions = new WeakMap<
  HTMLElement,
  {
    token: string
    abort: () => void
    arm: () => void
    disarm: () => void
    release: () => void
  }
>()
const timers = new WeakMap<HTMLElement, { on?: number; off?: number }>()

function showPaintedReveals(root: HTMLElement) {
  const viewH = window.innerHeight
  root.querySelectorAll('.reveal, .contact-reveal').forEach((node) => {
    if (!(node instanceof HTMLElement)) return
    const rect = node.getBoundingClientRect()
    if (rect.bottom > 0 && rect.top < viewH) node.classList.add('is-visible')
  })
  document.documentElement.classList.add('island-live')
}

function activate(root: HTMLElement, signal: AbortSignal) {
  const added: HTMLElement[] = []
  const observers: MutationObserver[] = []
  const NativeObserver = window.MutationObserver
  // The Tailwind CDN script keeps a document observer alive after its
  // <script> node is removed and rewrites utilities (text-ink, borders)
  // for whatever route mounts next. Track observers it creates so leaving
  // the island can disconnect them.
  const TrackingObserver = class extends NativeObserver {
    constructor(callback: MutationCallback) {
      super(callback)
      observers.push(this)
    }
  }
  const stylesBefore = new Set(document.querySelectorAll('style'))
  // Taken in the layout-effect cleanup, before the timer runs. The next
  // route's <style> tags are inserted in that gap. release() must not scan
  // again, or it deletes nodes React still owns and Back throws removeChild.
  let armed = false
  let stylesToDrop: HTMLStyleElement[] = []
  const arm = () => {
    if (armed) return
    armed = true
    document.querySelectorAll('style').forEach((style) => {
      if (!stylesBefore.has(style)) stylesToDrop.push(style)
    })
  }
  const disarm = () => {
    armed = false
    stylesToDrop = []
  }

  const restoreObserver = () => {
    if (window.MutationObserver === TrackingObserver) {
      window.MutationObserver = NativeObserver
    }
  }

  const runHeadScripts = async () => {
    const template = root.querySelector<HTMLTemplateElement>('template[data-island-head]')
    if (template?.hasAttribute('data-island-ran')) return
    template?.setAttribute('data-island-ran', '')
    const scripts = template
      ? Array.from(template.content.querySelectorAll('script'))
      : []
    for (const src of scripts) {
      if (signal.aborted) return
      restoreExecutableType(src)
      const script = cloneScript(src)
      added.push(script)
      if (src.getAttribute('src')) {
        await new Promise<void>((resolve) => {
          script.onload = () => resolve()
          script.onerror = () => resolve()
          if (signal.aborted) {
            resolve()
            return
          }
          document.head.appendChild(script)
        })
      } else {
        try {
          document.head.appendChild(script)
        } catch {
          // Inline config may run before the CDN script finishes; ignore.
        }
      }
    }
  }

  showPaintedReveals(root)
  void (async () => {
    window.MutationObserver = TrackingObserver
    try {
      await runHeadScripts()
      if (!signal.aborted) replaceScripts(root, signal)
    } finally {
      restoreObserver()
    }
  })()

  const release = () => {
    arm()
    document.documentElement.classList.remove('island-live')
    restoreObserver()
    observers.forEach((observer) => observer.disconnect())
    added.forEach((node) => node.remove())
    stylesToDrop.forEach((style) => style.remove())
    disarm()
  }

  return { arm, disarm, release }
}

export function IslandActivator({ token }: { token: string }) {
  const markerRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const marker = markerRef.current
    const root = marker?.previousElementSibling
    if (!(root instanceof HTMLElement) || !root.hasAttribute('data-html-island')) return

    // Strict Mode cleans this effect up and runs it again before the next
    // task. A mount cancels a queued teardown. Teardown that still fires
    // after the island is gone is a real leave. A new token is a new page
    // reusing this node, so the previous scripts must stop first.
    const pending = timers.get(root)
    if (pending?.off) window.clearTimeout(pending.off)
    const current = sessions.get(root)
    if (current && current.token !== token) {
      current.abort()
      current.release()
      sessions.delete(root)
    } else if (current && pending?.off) {
      current.disarm()
    }

    if (!sessions.has(root)) {
      const on = window.setTimeout(() => {
        if (!root.isConnected || sessions.has(root)) return
        const ac = new AbortController()
        const controls = activate(root, ac.signal)
        sessions.set(root, { token, abort: () => ac.abort(), ...controls })
      }, 0)
      timers.set(root, { on })
    }

    return () => {
      const pendingOn = timers.get(root)
      if (pendingOn?.on) window.clearTimeout(pendingOn.on)
      sessions.get(root)?.arm()
      const off = window.setTimeout(() => {
        if (root.isConnected && root.nextElementSibling?.hasAttribute('data-island-activator')) {
          sessions.get(root)?.disarm()
          return
        }
        const session = sessions.get(root)
        if (!session || session.token !== token) return
        session.abort()
        session.release()
        sessions.delete(root)
        timers.delete(root)
      }, 0)
      timers.set(root, { off })
    }
  }, [token])

  return (
    <span
      ref={markerRef}
      data-island-activator=""
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    />
  )
}
