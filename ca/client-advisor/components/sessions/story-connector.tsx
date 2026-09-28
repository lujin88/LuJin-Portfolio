'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { ARC, JOIN_Y, NODE_INSET_PX, VIEW_H, VIEW_W, arcY } from '@/lib/story-arc'

/** Extra viewBox margin so Gaussian blur is never clipped at the SVG edge. */
const PAD = 0.18
const VB_X = -VIEW_W * PAD
const VB_Y = -VIEW_H * PAD
const VB_W = VIEW_W * (1 + 2 * PAD)
const VB_H = VIEW_H * (1 + 2 * PAD)

export function StoryConnector() {
  const markerRef = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState<{ top: number; height: number } | null>(null)
  const [rest, setRest] = useState({ x: 48, y: arcY(48) })

  useLayoutEffect(() => {
    const wrap = markerRef.current?.parentElement
    if (!wrap) return

    const place = () => {
      const overlay = markerRef.current
      const mandate = wrap.querySelector<HTMLElement>('[aria-labelledby="mandate-heading"]')
      if (!overlay || !mandate) return
      const wr = wrap.getBoundingClientRect()
      const height = wr.width * (VIEW_H / VIEW_W)
      setBox({
        top: mandate.getBoundingClientRect().top - wr.top - height * JOIN_Y,
        height,
      })

      const front = wrap.querySelector<HTMLElement>('.ca-s02-ui-card--front')
      const overlayBox = overlay.getBoundingClientRect()
      if (!front || overlayBox.height < 8) return
      const frontBox = front.getBoundingClientRect()
      const x = ((frontBox.left - NODE_INSET_PX - overlayBox.left) / overlayBox.width) * VIEW_W
      setRest({ x, y: arcY(x) })
    }

    place()
    const ro = new ResizeObserver(place)
    ro.observe(wrap)
    window.addEventListener('resize', place)
    document.fonts?.ready.then(place)
    const id = window.setTimeout(place, 80)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', place)
      window.clearTimeout(id)
    }
  }, [])

  return (
    <div
      ref={markerRef}
      className="ca-story-connector pointer-events-none absolute left-0 z-[1] hidden overflow-visible lg:block"
      style={
        box
          ? { top: box.top, height: box.height, width: '100%' }
          : { visibility: 'hidden' }
      }
      aria-hidden="true"
    >
      <svg
        className="ca-story-connector-svg"
        viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        overflow="visible"
      >
        <defs>
          <radialGradient
            id="ca-story-bloom"
            gradientUnits="userSpaceOnUse"
            cx={rest.x}
            cy={rest.y}
            r="22"
          >
            <stop offset="0%" stopColor="#7ec8ff" stopOpacity="0.55" />
            <stop offset="28%" stopColor="#4aa6ff" stopOpacity="0.28" />
            <stop offset="62%" stopColor="#1a5fd4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#163e8c" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="ca-story-stroke"
            gradientUnits="userSpaceOnUse"
            cx={rest.x}
            cy={rest.y}
            r="20"
          >
            <stop offset="0%" stopColor="#b7e4ff" stopOpacity="0.72" />
            <stop offset="22%" stopColor="#7ec8ff" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#3d8eff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#1a5fd4" stopOpacity="0" />
          </radialGradient>
          <filter
            id="ca-story-glow"
            x={VB_X - 8}
            y={VB_Y - 8}
            width={VB_W + 16}
            height={VB_H + 16}
            filterUnits="userSpaceOnUse"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="far" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="near" />
            <feMerge>
              <feMergeNode in="far" />
              <feMergeNode in="near" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={ARC}
          fill="none"
          stroke="url(#ca-story-bloom)"
          strokeWidth="0.7"
          strokeLinecap="round"
          opacity="0.7"
          filter="url(#ca-story-glow)"
        />
        <path
          d={ARC}
          fill="none"
          stroke="url(#ca-story-stroke)"
          strokeWidth="0.11"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
    </div>
  )
}
