'use client'

import { useEffect, useRef } from 'react'

const SRC = '/lab/way-of-work/human-ai-design.html'

/**
 * The source page has no site header. Shift it down by the fixed bar,
 * and keep the projects dialog in the visible window while the page scrolls.
 */
const HEADER_FIX = `
main { padding-top: 4rem !important; }
html, body { background: #fdfcf9; }
dialog[open] {
  position: fixed !important;
  top: var(--dialog-top, 50%) !important;
  right: 0 !important;
  bottom: auto !important;
  left: 0 !important;
  margin-block: 0 !important;
  transform: translateY(-50%);
}
`

export function HumanAiPage() {
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    let observer: ResizeObserver | undefined
    let dialog: HTMLDialogElement | null = null

    const fit = () => {
      const doc = frame.contentDocument
      if (!doc) return
      const main = doc.querySelector('main')
      const header = document.querySelector('.header-frame')
      if (main && header) {
        const hb = header.getBoundingClientRect()
        const fb = frame.getBoundingClientRect()
        const pad = getComputedStyle(header)
        const left = hb.left + Number.parseFloat(pad.paddingLeft) - fb.left
        const right = fb.right - (hb.right - Number.parseFloat(pad.paddingRight))
        main.style.paddingLeft = `${Math.max(0, left)}px`
        main.style.paddingRight = `${Math.max(0, right)}px`
      }
      // body, not the document element: the document element's scroll height
      // stays at the iframe height, so a shorter next page could never shrink.
      const next = Math.ceil(doc.body?.scrollHeight ?? doc.documentElement.scrollHeight) + 16
      const current = Number.parseFloat(frame.style.height) || 0
      if (Math.abs(next - current) > 2) frame.style.height = `${next}px`
    }

    const placeDialog = (force = false) => {
      if (!dialog || (!force && !dialog.open)) return
      const frameTop = frame.getBoundingClientRect().top
      const height = dialog.offsetHeight || 240
      const minTop = 112 + height / 2 - frameTop
      const maxTop = window.innerHeight - 24 - height / 2 - frameTop
      const ideal = window.innerHeight / 2 - frameTop
      const top = Math.min(Math.max(ideal, minTop), Math.max(minTop, maxTop))
      dialog.style.setProperty('--dialog-top', `${top}px`)
    }

    const onLoad = () => {
      const doc = frame.contentDocument
      if (!doc?.head) return
      const style = doc.createElement('style')
      style.textContent = HEADER_FIX
      doc.head.appendChild(style)
      dialog = doc.getElementById('projects-dialog') as HTMLDialogElement | null
      dialog?.addEventListener('toggle', () => {
        requestAnimationFrame(placeDialog)
      })
      doc.getElementById('projects-button')?.addEventListener(
        'click',
        () => placeDialog(true),
        true,
      )
      fit()
      observer?.disconnect()
      observer = new ResizeObserver(fit)
      observer.observe(doc.documentElement)
      if (doc.body) observer.observe(doc.body)
    }

    const onResize = () => {
      fit()
      placeDialog()
    }
    frame.addEventListener('load', onLoad)
    window.addEventListener('scroll', placeDialog, { passive: true })
    window.addEventListener('resize', onResize)
    if (frame.contentDocument?.readyState === 'complete') onLoad()
    return () => {
      frame.removeEventListener('load', onLoad)
      window.removeEventListener('scroll', placeDialog)
      window.removeEventListener('resize', onResize)
      observer?.disconnect()
    }
  }, [])

  return (
    <iframe
      ref={frameRef}
      title="Human × AI — Design Practice"
      src={SRC}
      style={{
        display: 'block',
        width: '100%',
        height: '100svh',
        border: 0,
        background: '#fdfcf9',
      }}
    />
  )
}
