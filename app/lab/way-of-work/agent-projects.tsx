'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import './agent-projects.css'

const IMG = '/assets/images/lab/hiw-tools'

const PROJECTS = [
  {
    id: 'monitor',
    title: 'Agent Monitor',
    body: 'See the work in progress.',
    href: '/lab/tools#monitor',
    image: `${IMG}/monitor-real-demo-v3.png`,
    alt: 'Agent Monitor demo interface',
    mediaClass: 'monitor wide-full',
    demoLabel: 'Demo data',
  },
  {
    id: 'scranton',
    title: 'Scranton',
    body: 'Keep the team in one conversation.',
    href: '/lab/tools#scranton',
    image: `${IMG}/scranton-real-demo-v3.png`,
    alt: 'Scranton demo workspace interface',
    mediaClass: 'scranton wide-full',
    demoLabel: 'Demo workspace',
  },
  {
    id: 'office',
    title: 'Pixel Office',
    body: 'See the team share a space.',
    href: '/lab/tools#office',
    image: `${IMG}/office-v4.gif`,
    alt: 'Pixel Office demo scene',
    mediaClass: 'office',
  },
] as const

export function AgentProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const syncEdges = useCallback(() => {
    const rail = railRef.current
    if (!rail || window.matchMedia('(max-width: 719px)').matches) return
    const max = rail.scrollWidth - rail.clientWidth
    setAtStart(rail.scrollLeft <= 4)
    setAtEnd(max <= 4 || rail.scrollLeft >= max - 4)
  }, [])

  useEffect(() => {
    syncEdges()
    window.addEventListener('resize', syncEdges)
    return () => window.removeEventListener('resize', syncEdges)
  }, [syncEdges])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) {
      node.classList.add('ww-projects--in')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add('ww-projects--in')
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const move = (dir: -1 | 1) => {
    const rail = railRef.current
    const card = rail?.querySelector<HTMLElement>('.ww-projects-card')
    if (!rail || !card) return
    rail.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' })
    window.setTimeout(syncEdges, 320)
  }

  return (
    <section ref={sectionRef} className="ww-projects" aria-label="Agent project entrances">
      <div className="ww-projects-controls" aria-hidden={false}>
        <button type="button" aria-label="Previous projects" disabled={atStart} onClick={() => move(-1)}>
          ←
        </button>
        <button type="button" aria-label="Next projects" disabled={atEnd} onClick={() => move(1)}>
          →
        </button>
      </div>
      <div
        className="ww-projects-rail"
        ref={railRef}
        onScroll={syncEdges}
        tabIndex={0}
        role="list"
        aria-label="Explore the three projects"
      >
        {PROJECTS.map((p) => (
          <a key={p.id} className="ww-projects-card" href={p.href} role="listitem">
            <div className={`ww-projects-media ${p.mediaClass}`}>
              <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
              {'demoLabel' in p && p.demoLabel ? (
                <span className="ww-projects-demo">{p.demoLabel}</span>
              ) : null}
            </div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
