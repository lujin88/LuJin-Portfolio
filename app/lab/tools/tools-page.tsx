'use client'

import { useEffect, useRef, useState } from 'react'
import { SiteClosing } from '../../components/site-closing'
import './tools-page.css'

const IMG = '/assets/images/lab/hiw-tools'

const SECTIONS = [
  {
    id: 'monitor',
    title: 'Agent Monitor',
    body: 'See the work in progress.',
    image: `${IMG}/monitor-real-demo-v3.png`,
    alt: 'Agent Monitor demo interface',
    mediaClass: 'monitor wide-full',
    demoLabel: 'Demo data',
    zoomable: true,
    compact: true,
  },
  {
    id: 'scranton',
    title: 'Scranton',
    body: 'Keep the team in one conversation.',
    image: `${IMG}/scranton-real-demo-v3.png`,
    alt: 'Scranton demo workspace interface',
    mediaClass: 'scranton wide-full',
    demoLabel: 'Demo workspace',
    zoomable: true,
    compact: true,
  },
  {
    id: 'office',
    title: 'Pixel Office',
    body: 'See the team share a space.',
    image: `${IMG}/office-v4.gif`,
    alt: 'Pixel Office demo scene',
    mediaClass: 'office wide-full',
  },
] as const

type Lightbox = { src: string; alt: string }

export function ToolsPage() {
  const mainRef = useRef<HTMLElement>(null)
  const lightboxRef = useRef<HTMLDialogElement>(null)
  const zoomTriggerRef = useRef<HTMLButtonElement | null>(null)
  const scrollLockY = useRef(0)
  const [lightbox, setLightbox] = useState<Lightbox | null>(null)

  useEffect(() => {
    const dialog = lightboxRef.current
    if (!dialog) return
    if (lightbox) {
      if (!dialog.open) dialog.showModal()
    } else if (dialog.open) dialog.close()
  }, [lightbox])

  useEffect(() => {
    if (!lightbox) return
    scrollLockY.current = window.scrollY
    const { body } = document
    body.style.position = 'fixed'
    body.style.top = `-${scrollLockY.current}px`
    body.style.left = '0'
    body.style.right = '0'
  return () => {
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      window.scrollTo(0, scrollLockY.current)
    }
  }, [lightbox])

  const openLightbox = (src: string, alt: string, trigger: HTMLButtonElement) => {
    zoomTriggerRef.current = trigger
    setLightbox({ src, alt })
  }

  const handleLightboxClose = () => {
    setLightbox(null)
    requestAnimationFrame(() => zoomTriggerRef.current?.focus())
  }

  useEffect(() => {
    const root = mainRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sections = root.querySelectorAll<HTMLElement>('.tools-section')
    if (reduced.matches) {
      sections.forEach((el) => el.classList.add('tools-section--in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('tools-section--in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="tools-page">
      <main className="tools-main" ref={mainRef}>
        <p className="tools-back">
          <a href="/lab/way-of-work">← How I Work</a>
        </p>
        <h1 className="tools-sr-only">Playground tools</h1>
        {SECTIONS.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className={`tools-section${'compact' in s && s.compact ? ' tools-section--compact' : ''}`}
            aria-labelledby={`${s.id}-title`}
          >
            <h2 id={`${s.id}-title`}>{s.title}</h2>
            <p>{s.body}</p>
            <div className={`tools-media ${s.mediaClass}`}>
              {'zoomable' in s && s.zoomable ? (
                <button
                  type="button"
                  className="tools-zoom-trigger"
                  aria-label={`View full size: ${s.alt}`}
                  onClick={(e) => openLightbox(s.image, s.alt, e.currentTarget)}
                >
                  <img src={s.image} alt={s.alt} loading="lazy" decoding="async" />
                </button>
              ) : (
                <img src={s.image} alt={s.alt} loading="lazy" decoding="async" />
              )}
              {'demoLabel' in s && s.demoLabel ? (
                <span className="tools-demo">{s.demoLabel}</span>
              ) : null}
            </div>
          </section>
        ))}
      </main>
      <SiteClosing className="tools-closing" />
      <dialog
        ref={lightboxRef}
        className="tools-lightbox"
        onClose={handleLightboxClose}
        aria-label={lightbox?.alt}
      >
        <form method="dialog" className="tools-lightbox__bar">
          <button type="submit" className="tools-lightbox__close">
            Close
          </button>
        </form>
        {lightbox ? (
          <div className="tools-lightbox__scroll">
            <img src={lightbox.src} alt={lightbox.alt} />
          </div>
        ) : null}
      </dialog>
    </div>
  )
}
