'use client'

import { useEffect, useRef } from 'react'

import { SiteClosing } from '../components/site-closing'

const SRC = '/ai-companion-pet/diandian.html'

/**
 * The export ships its own site bar. The portfolio header is the real nav,
 * so that bar stays hidden.
 */
const HEADER_FIX = `
.prototype-note,
.page-bottom { display: none !important; }
.site-header {
  position: absolute !important;
  height: auto !important;
  inset: 5.25rem auto auto max(24px, calc((100vw - 1240px) / 2)) !important;
  width: auto !important;
  background: none !important;
  pointer-events: none;
  z-index: 40;
}
.site-header:before { display: none !important; }
.site-header .nav {
  height: auto !important;
  padding: 0 !important;
  gap: 0 !important;
}
.site-header .brand,
.site-header #nav-links,
.site-header .contact-link,
.site-header .mobile-menu { display: none !important; }
.site-header .nav-actions {
  margin: 0 !important;
  pointer-events: auto;
}
.site-header,
.scrubber { display: none !important; }
/* Shell pill. Primary M for section CTAs; secondary shares the same
   radius, gap, type, and motion. Paint stays on the paper theme. */
.prototype-link,
.studio-open,
.studio-download {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.5rem !important;
  box-sizing: border-box !important;
  white-space: nowrap !important;
  border-radius: 999px !important;
  border: 1px solid #0a0a0a !important;
  padding: 0.875rem 1.75rem !important;
  min-height: 2.75rem !important;
  font-family: Poppins, Arial, sans-serif !important;
  font-size: 0.95rem !important;
  font-weight: 400 !important;
  line-height: 1 !important;
  letter-spacing: 0 !important;
  color: #0a0a0a !important;
  background: transparent !important;
  text-decoration: none !important;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1), background-color 320ms cubic-bezier(0.22, 1, 0.36, 1), color 320ms cubic-bezier(0.22, 1, 0.36, 1) !important;
}
.studio-download {
  border-color: #c7c5c0 !important;
  color: #5d5b57 !important;
}
.prototype-link .ri,
.studio-open .ri,
.studio-download .ri {
  font-size: 16px !important;
  line-height: 1 !important;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1) !important;
}
.prototype-link .ri:before,
.studio-open .ri:before { content: "\\ea6c" !important; }
.prototype-link:hover,
.studio-open:hover {
  background: #0a0a0a !important;
  color: #f7f6f2 !important;
  border-color: #0a0a0a !important;
  transform: translateY(-2px);
}
.studio-download:hover {
  color: #0a0a0a !important;
  border-color: #0a0a0a !important;
  background: transparent !important;
  transform: translateY(-2px);
}
.prototype-link:hover .ri,
.studio-open:hover .ri,
.studio-download:hover .ri { transform: translateX(3px) !important; }
.prototype-link:active,
.studio-open:active,
.studio-download:active { transform: translateY(0) scale(0.97) !important; }
.prototype-link:focus-visible,
.studio-open:focus-visible,
.studio-download:focus-visible {
  outline: 2px solid #0a0a0a !important;
  outline-offset: 3px !important;
}
.studio-footer { align-items: center !important; }
.hero { height: auto !important; min-height: 780px; }
.hero-copy p { max-width: 28rem !important; }
.hero-layout { padding-top: 112px !important; }
@media (min-width: 1600px) {
  .hero { min-height: 830px; }
  .hero-layout { padding-top: 140px !important; }
}
@media (max-width: 760px) {
  .site-header { inset: 4.75rem auto auto 22px !important; }
  .hero { min-height: 0; }
  .hero-copy p { max-width: none !important; }
  .hero-layout { padding-top: 128px !important; }
  .studio-footer { flex-wrap: wrap !important; }
}
@media (prefers-reduced-motion: reduce) {
  .prototype-link, .studio-open, .studio-download,
  .prototype-link:hover, .studio-open:hover, .studio-download:hover,
  .prototype-link .ri, .studio-open .ri, .studio-download .ri {
    transition: none !important;
    transform: none !important;
  }
}
`

export function DiandianPage() {
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    let observer: ResizeObserver | undefined

    const fit = () => {
      const doc = frame.contentDocument
      if (!doc?.body) return
      doc.documentElement.style.overflow = 'hidden'
      const next = Math.ceil(doc.body.scrollHeight)
      const current = Number.parseFloat(frame.style.height) || 0
      if (Math.abs(next - current) > 2) frame.style.height = `${next}px`
    }

    // The iframe is as tall as the page, so its own viewport would mark every
    // video as visible. Play only the ones in the site window.
    const syncVideos = () => {
      const doc = frame.contentDocument
      if (!doc) return
      const frameTop = frame.getBoundingClientRect().top
      doc.querySelectorAll('video').forEach((node) => {
        const video = node as HTMLVideoElement
        const rect = video.getBoundingClientRect()
        const top = frameTop + rect.top
        const bottom = frameTop + rect.bottom
        const visible = bottom > 0 && top < window.innerHeight
        if (visible) video.play().catch(() => {})
        else video.pause()
      })
    }

    const onLoad = () => {
      const doc = frame.contentDocument
      if (!doc?.head) return
      if (!doc.getElementById('diandian-header-fix')) {
        const style = doc.createElement('style')
        style.id = 'diandian-header-fix'
        style.textContent = HEADER_FIX
        doc.head.appendChild(style)
      }
      fit()
      syncVideos()
      observer?.disconnect()
      observer = new ResizeObserver(() => {
        fit()
        syncVideos()
      })
      observer.observe(doc.documentElement)
      if (doc.body) observer.observe(doc.body)
    }

    const onScroll = () => syncVideos()
    frame.addEventListener('load', onLoad)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    if (frame.contentDocument?.readyState === 'complete') onLoad()
    return () => {
      frame.removeEventListener('load', onLoad)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      observer?.disconnect()
    }
  }, [])

  return (
    <>
      <iframe
        ref={frameRef}
        title="Diandian — Turn. Talk. Play."
        src={SRC}
        style={{
          display: 'block',
          width: '100%',
          height: '100svh',
          border: 0,
          background: '#f7f6f2',
        }}
      />
      <SiteClosing className="dd-closing" />
    </>
  )
}
