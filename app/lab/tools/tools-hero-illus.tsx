'use client'

import { useEffect, useRef } from 'react'
import { Scene } from '../way-of-work/field-notes'
import '../way-of-work/field-notes.css'

const JUDGEMENT = 2

export function ToolsHeroIllus() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const scene = root.querySelector<SVGSVGElement>('.ww-drawing')
    const image = scene?.querySelector<SVGImageElement>('.ww-ensemble')
    if (!scene || !image) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false

    const sync = () => {
      const url =
        visible && !reduced.matches ? image.dataset.motion! : image.dataset.still!
      if (image.getAttribute('href') !== url) image.setAttribute('href', url)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false
        sync()
      },
      { threshold: 0.15 },
    )
    io.observe(scene)
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
      <Scene index={JUDGEMENT} />
    </div>
  )
}
