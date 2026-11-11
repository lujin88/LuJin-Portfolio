'use client'

import { useEffect, useRef } from 'react'
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
  },
  {
    id: 'scranton',
    title: 'Scranton',
    body: 'Keep the team in one conversation.',
    image: `${IMG}/scranton-real-demo-v3.png`,
    alt: 'Scranton demo workspace interface',
    mediaClass: 'scranton wide-full',
    demoLabel: 'Demo workspace',
  },
  {
    id: 'office',
    title: 'Pixel Office',
    body: 'See the team share a space.',
    image: `${IMG}/office-v4.gif`,
    alt: 'Pixel Office demo scene',
    mediaClass: 'office',
  },
] as const

export function ToolsPage() {
  const mainRef = useRef<HTMLElement>(null)

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
          <section key={s.id} id={s.id} className="tools-section" aria-labelledby={`${s.id}-title`}>
            <h2 id={`${s.id}-title`}>{s.title}</h2>
            <p>{s.body}</p>
            <div className={`tools-media ${s.mediaClass}`}>
              <img src={s.image} alt={s.alt} loading="lazy" decoding="async" />
              {'demoLabel' in s && s.demoLabel ? (
                <span className="tools-demo">{s.demoLabel}</span>
              ) : null}
            </div>
          </section>
        ))}
      </main>
      <SiteClosing className="tools-closing" />
    </div>
  )
}
