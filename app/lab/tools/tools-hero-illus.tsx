'use client'

import { useEffect, useRef, useState } from 'react'

const STILL = '/lab/way-of-work/field-notes/score.webp'
const MOTION = '/lab/way-of-work/field-notes/score-loop-v21.webp'

export function ToolsHeroIllus() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [src, setSrc] = useState(STILL)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false

    const sync = () => {
      const next = visible && !reduced.matches ? MOTION : STILL
      setSrc((prev) => (prev === next ? prev : next))
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false
        sync()
      },
      { threshold: 0.15 },
    )
    io.observe(root)
    const onReduced = () => sync()
    reduced.addEventListener('change', onReduced)
    sync()

    return () => {
      io.disconnect()
      reduced.removeEventListener('change', onReduced)
    }
  }, [])

  return (
    <div className="tools-hero__illus-wrap" ref={rootRef} data-tools-parallax="0.1">
      <img
        className="tools-hero-illus"
        src={src}
        width={800}
        height={375}
        alt="A bear, rabbit and fox review the work. The designer points at the open rulebook."
        decoding="async"
      />
    </div>
  )
}
