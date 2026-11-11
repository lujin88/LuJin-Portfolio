'use client'

import { useEffect, useRef } from 'react'
import { SiteClosing } from '../../components/site-closing'
import { ToolsHeroIllus } from './tools-hero-illus'
import './tools-page.css'

const IMG = '/assets/images/lab/hiw-tools'

const PROJECTS = [
  {
    id: 'monitor',
    title: 'Agent Monitor',
    body: 'See the work in progress.',
    image: `${IMG}/monitor-real-demo-v3.png`,
    alt: 'Agent Monitor demo interface',
    mediaClass: 'monitor',
    href: 'https://github.com/lujin88/agent-monitor',
  },
  {
    id: 'scranton',
    title: 'Scranton',
    body: 'Keep the team in one conversation.',
    image: `${IMG}/scranton-real-demo-v3.png`,
    alt: 'Scranton demo workspace interface',
    mediaClass: 'scranton',
    href: 'https://github.com/lujin88/Scranton',
  },
  {
    id: 'office',
    title: 'Pixel Office',
    body: 'See the team share a space.',
    image: `${IMG}/office-v4.gif`,
    alt: 'Pixel Office demo scene',
    mediaClass: 'office',
    href: 'https://github.com/lujin88/agent-monitor/tree/main/pixel-min',
  },
] as const

export function ToolsPage() {
  const pageRef = useRef<HTMLDivElement>(null)

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
              Three tools.
              <br />
              One working team.
            </h2>
            <p className="tools-hero__lead">
              Agent Monitor, Scranton and Pixel Office.
              <br />
              A closer look at how I work with my agents.
            </p>
          </div>
          <ToolsHeroIllus />
        </section>

        <div className="tools-rail">
          {PROJECTS.map((p) => (
            <article key={p.id} id={p.id} className="tools-card" tabIndex={-1}>
              <div className={`tools-card__media tools-card__media--${p.mediaClass}`}>
                <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
              </div>
              <h3>{p.title}</h3>
              <a
                className="tools-card__github"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </main>

      <SiteClosing className="tools-closing" />
    </div>
  )
}
