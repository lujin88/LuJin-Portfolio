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

export function HtmlIsland({ head, body }: { head: string; body: string }) {
  const bodyRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const staging = document.createElement('div')
    staging.innerHTML = head
    const added: HTMLElement[] = []
    const scripts: HTMLScriptElement[] = []

    Array.from(staging.children).forEach((node) => {
      const tag = node.tagName
      if (tag === 'TITLE' || tag === 'META') return
      if (tag === 'SCRIPT') {
        scripts.push(node as HTMLScriptElement)
        return
      }
      const imported = document.importNode(node, true)
      document.head.appendChild(imported)
      added.push(imported as HTMLElement)
    })

    let cancelled = false
    const runScripts = async () => {
      for (const src of scripts) {
        if (cancelled) return
        const script = cloneScript(src)
        added.push(script)
        if (src.getAttribute('src')) {
          await new Promise<void>((resolve) => {
            script.onload = () => resolve()
            script.onerror = () => resolve()
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
    void runScripts()

    return () => {
      cancelled = true
      added.forEach((node) => node.remove())
    }
  }, [head])

  useLayoutEffect(() => {
    const root = bodyRef.current
    if (!root) return
    const ac = new AbortController()
    root.innerHTML = body
    replaceScripts(root, ac.signal)
    return () => {
      ac.abort()
      root.innerHTML = ''
    }
  }, [body])

  return (
    <div
      ref={bodyRef}
      className="min-h-svh min-w-[360px]"
      style={{ background: '#0a0a0a', color: '#f9fbfc' }}
    />
  )
}
