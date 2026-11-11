'use client'

import { useEffect, useRef } from 'react'

const STILL = '/lab/way-of-work/field-notes/score.webp'
const MOTION = '/lab/way-of-work/field-notes/score-loop-v21.webp'
const HEIGHT = 375
const MASK = 'tools-score-mask'

const ERASE =
  'M356 319L368 315L400 321L526 315L530 374L354 374Z'

export function ToolsHeroIllus() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const image = root.querySelector<SVGImageElement>('.tools-hero-illus__ensemble')
    if (!image) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false

    const sync = () => {
      const url = visible && !reduced.matches ? MOTION : STILL
      if (image.getAttribute('href') !== url) image.setAttribute('href', url)
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
      <svg
        className="tools-hero-illus"
        width={800}
        height={HEIGHT}
        viewBox={`0 0 800 ${HEIGHT}`}
        role="img"
        aria-label="A bear, rabbit and fox review the work. The designer points at the open rulebook."
      >
        <defs>
          <mask id={MASK} maskUnits="userSpaceOnUse" x="0" y="0" width="800" height={HEIGHT}>
            <rect width="800" height={HEIGHT} fill="white" />
            <path d={ERASE} fill="black" />
          </mask>
        </defs>
        <path d="" fill="#dce8f3" className="tools-hero-illus__wash" />
        <image
          className="tools-hero-illus__ensemble"
          href={STILL}
          width={800}
          height={375}
          preserveAspectRatio="xMidYMid meet"
          mask={`url(#${MASK})`}
        />
      </svg>
    </div>
  )
}
