'use client'

import { useEffect, useRef, useState } from 'react'
import { SiteClosing } from '../../components/site-closing'
import './tools-page.css'

const IMG = '/assets/images/lab/hiw-tools'
const HERO_ILLUS = '/lab/way-of-work/field-notes/worktable.webp'

const PROJECTS = [
  {
    id: 'monitor',
    title: 'Agent Monitor',
    body: 'See the work in progress.',
    explore: 'Explore Monitor',
    image: `${IMG}/monitor-real-demo-v3.png`,
    alt: 'Agent Monitor demo interface',
    mediaClass: 'monitor',
    demoLabel: 'Demo data',
    zoomable: true,
    bleed: true,
  },
  {
    id: 'scranton',
    title: 'Scranton',
    body: 'Keep the team in one conversation.',
    explore: 'Explore Scranton',
    image: `${IMG}/scranton-real-demo-v3.png`,
    alt: 'Scranton demo workspace interface',
    mediaClass: 'scranton',
    demoLabel: 'Demo workspace',
    zoomable: true,
    bleed: true,
  },
  {
    id: 'office',
    title: 'Pixel Office',
    body: 'See the team share a space.',
    explore: 'Explore Pixel Office',
    image: `${IMG}/office-v4.gif`,
    alt: 'Pixel Office demo scene',
    mediaClass: 'office',
    bleed: false,
  },
] as const

type Lightbox = { src: string; alt: string }

export function ToolsPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
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

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current
    const first = rail?.firstElementChild as HTMLElement | null
    if (!rail || !first) return
    rail.scrollBy({ left: direction * (first.offsetWidth + 24), behavior: 'smooth' })
  }

  useEffect(() => {
    const root = pageRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const details = root.querySelectorAll<HTMLElement>('.tools-detail')
    if (reduced.matches) {
      details.forEach((el) => el.classList.add('tools-detail--in'))
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('tools-detail--in')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      )
      details.forEach((el) => observer.observe(el))
      return () => observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const root = pageRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    const parallaxEls = root.querySelectorAll<HTMLElement>('[data-tools-parallax]')
    if (!parallaxEls.length) return

    let frame = 0
    const tick = () => {
      const vh = window.innerHeight
      parallaxEls.forEach((el) => {
        const rate = Number(el.dataset.toolsParallax) || 0.12
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const offset = ((center - vh / 2) / vh) * rate * vh
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    tick()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
      parallaxEls.forEach((el) => {
        el.style.transform = ''
      })
    }
  }, [])

  return (
    <div className="tools-page" ref={pageRef}>
      <main className="tools-main">
        <h1 className="tools-sr-only">Tools I built</h1>

        <section className="tools-hero" aria-labelledby="tools-hero-title">
          <div className="tools-hero__copy">
            <h2 id="tools-hero-title" className="tools-hero__title">
              The tools
              <br />
              behind the work.
            </h2>
            <p className="tools-hero__lead">
              Three projects I use to work with my agents.
              <br />
              Explore them in Playground.
            </p>
          </div>
          <img
            className="tools-hero__illus"
            data-tools-parallax="0.14"
            src={HERO_ILLUS}
            alt="How I Work illustration of Lu and her agents at the desk"
            width={640}
            height={560}
            decoding="async"
          />
        </section>

        <div className="tools-rail-controls">
          <span>Explore the three projects</span>
          <div className="tools-rail-controls__buttons">
            <button type="button" aria-label="Previous projects" onClick={() => scrollRail(-1)}>
              ←
            </button>
            <button type="button" aria-label="Next projects" onClick={() => scrollRail(1)}>
              →
            </button>
          </div>
        </div>

        <div className="tools-rail" ref={railRef}>
          {PROJECTS.map((p) => (
            <article key={p.id} className="tools-card">
              <a className="tools-card__link" href={`#${p.id}`}>
                <div className={`tools-card__media tools-card__media--${p.mediaClass}`}>
                  <img src={p.image} alt="" loading="lazy" decoding="async" />
                  {'demoLabel' in p && p.demoLabel ? (
                    <span className="tools-card__demo">{p.demoLabel}</span>
                  ) : null}
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <span className="tools-card__pill">{p.explore}</span>
              </a>
            </article>
          ))}
        </div>

        <div className="tools-details">
          {PROJECTS.map((p) => (
            <section
              key={p.id}
              id={p.id}
              className={`tools-detail${p.bleed ? ' tools-detail--bleed' : ''}`}
              aria-labelledby={`${p.id}-title`}
            >
              <h2 id={`${p.id}-title`}>{p.title}</h2>
              <p>{p.body}</p>
              <div
                className={`tools-detail__media tools-detail__media--${p.mediaClass}${
                  p.bleed ? ' tools-detail__media--wide' : ''
                }`}
              >
                <div className="tools-detail__parallax" data-tools-parallax="0.1">
                  {'zoomable' in p && p.zoomable ? (
                    <button
                      type="button"
                      className="tools-zoom-trigger"
                      aria-label={`View full size: ${p.alt}`}
                      onClick={(e) => openLightbox(p.image, p.alt, e.currentTarget)}
                    >
                      <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
                    </button>
                  ) : (
                    <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
                  )}
                </div>
                {'demoLabel' in p && p.demoLabel ? (
                  <span className="tools-detail__demo">{p.demoLabel}</span>
                ) : null}
              </div>
            </section>
          ))}
        </div>
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
