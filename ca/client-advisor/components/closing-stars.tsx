'use client'

import { useEffect, useRef } from 'react'

// Row 37 (Lu #22461 approved v7): only the stars twinkle, in place. The earth,
// the horizon and the text stay still. 10 s seamless loop (every frequency is
// a whole multiple of 2π/10s). Source: motionintern earth-motion-demo.html.

const IMG_W = 2400
const IMG_H = 683
const LOOP_MS = 10000

// The demo laid the 2400×683 image out as object-cover / top on 1440×720.
// Star positions are stored in that frame and converted to image pixels once,
// so they stay glued to the picture at any section size.
const DEMO_SCALE = 720 / IMG_H
const DEMO_OFFSET_X = (1440 - IMG_W * DEMO_SCALE) / 2

type Star = {
  x: number
  y: number
  r: number
  peakR: number
  halo: string
  blur: number
  base: number
  peak: number
  phase: number
  freq: number
  spike?: number
}

const W = '#ffffff'
const star = (
  x: number, y: number, r: number, peakR: number, halo: string, blur: number,
  base: number, peak: number, phase: number, freq: number, spike?: number,
): Star => ({
  x: (x - DEMO_OFFSET_X) / DEMO_SCALE,
  y: y / DEMO_SCALE,
  r: r / DEMO_SCALE,
  peakR: peakR / DEMO_SCALE,
  halo, blur, base, peak, phase, freq,
  spike: spike === undefined ? undefined : spike / DEMO_SCALE,
})

const STARS: Star[] = [
  // Tier 1: five anchor stars with a 4-point glint at peak
  star(220, 175, 2.2, 3.0, '#bae6fd', 6, 0.15, 1.0, 0.5, 2, 6),
  star(420, 155, 2.0, 2.8, '#e0f2fe', 5, 0.12, 0.95, 2.3, 2, 5),
  star(720, 132, 2.4, 3.2, '#bae6fd', 7, 0.18, 1.0, 4.1, 3, 7),
  star(1020, 155, 2.0, 2.8, '#e0f2fe', 5, 0.12, 0.95, 1.4, 2, 5),
  star(1240, 180, 2.2, 3.0, '#bae6fd', 6, 0.15, 1.0, 3.6, 3, 6),
  // Tier 2: ten mid stars
  star(150, 205, 1.4, 1.9, '#7dd3fc', 3, 0.1, 0.75, 1.2, 2),
  star(280, 168, 1.5, 2.0, '#bae6fd', 3, 0.1, 0.78, 4.8, 3),
  star(340, 152, 1.3, 1.7, '#7dd3fc', 2.5, 0.08, 0.7, 3.1, 2),
  star(500, 142, 1.6, 2.2, '#bae6fd', 3.5, 0.12, 0.8, 0.8, 2),
  star(630, 136, 1.4, 1.9, '#7dd3fc', 3, 0.08, 0.72, 5.4, 3),
  star(800, 136, 1.5, 2.0, '#bae6fd', 3, 0.1, 0.75, 2.9, 2),
  star(920, 145, 1.3, 1.7, '#7dd3fc', 2.5, 0.08, 0.7, 4.4, 3),
  star(1110, 165, 1.6, 2.2, '#bae6fd', 3.5, 0.12, 0.8, 0.2, 2),
  star(1170, 172, 1.4, 1.9, '#7dd3fc', 3, 0.08, 0.72, 3.9, 3),
  star(1290, 195, 1.5, 2.0, '#bae6fd', 3, 0.1, 0.75, 1.9, 2),
  // Tier 3: seven faint deep-space stars
  star(670, 125, 1.0, 1.3, '#7dd3fc', 2, 0.05, 0.5, 2.2, 1),
  star(770, 126, 1.1, 1.4, '#bae6fd', 2, 0.06, 0.52, 5.1, 2),
  star(180, 185, 1.0, 1.3, '#7dd3fc', 2, 0.05, 0.48, 3.4, 2),
  star(570, 148, 1.0, 1.3, '#bae6fd', 2, 0.05, 0.48, 1.7, 3),
  star(860, 140, 1.0, 1.3, '#7dd3fc', 2, 0.05, 0.48, 4.9, 2),
  star(1060, 170, 1.1, 1.4, '#bae6fd', 2, 0.06, 0.5, 2.8, 1),
  star(1210, 160, 1.0, 1.3, '#7dd3fc', 2, 0.05, 0.48, 0.6, 3),
]

export function ClosingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let raf = 0
    let start = 0
    let cssW = 0
    let cssH = 0
    let dpr = 1

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      cssW = rect.width
      cssH = rect.height
      canvas.width = Math.max(1, Math.round(cssW * dpr))
      canvas.height = Math.max(1, Math.round(cssH * dpr))
    }

    const draw = (tMs: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (!cssW || !cssH) return
      // object-fit: cover; object-position: top center
      const scale = Math.max(cssW / IMG_W, cssH / IMG_H)
      const ox = (cssW - IMG_W * scale) / 2
      const omega = (2 * Math.PI) / LOOP_MS
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      for (const s of STARS) {
        const px = ox + s.x * scale
        const py = s.y * scale
        if (px < -10 || px > cssW + 10 || py > cssH) continue
        const raw = 0.5 + 0.5 * Math.sin(tMs * omega * s.freq + s.phase)
        const pulse = Math.pow(raw, 2.6)
        const alpha = s.base + pulse * (s.peak - s.base)
        const radius = (s.r + pulse * (s.peakR - s.r)) * scale

        ctx.save()
        ctx.beginPath()
        ctx.arc(px, py, radius, 0, Math.PI * 2)
        ctx.fillStyle = W
        ctx.globalAlpha = alpha
        ctx.shadowColor = s.halo
        ctx.shadowBlur = s.blur * (0.8 + 0.6 * pulse)
        ctx.fill()

        if (s.spike && pulse > 0.45) {
          const k = (pulse - 0.45) / 0.55
          const len = s.spike * scale * k
          ctx.beginPath()
          ctx.strokeStyle = W
          ctx.lineWidth = 0.8
          ctx.globalAlpha = k * 0.9 * alpha
          ctx.moveTo(px - len, py)
          ctx.lineTo(px + len, py)
          ctx.moveTo(px, py - len)
          ctx.lineTo(px, py + len)
          ctx.stroke()
        }
        ctx.restore()
      }
    }

    const frame = (now: number) => {
      if (!start) start = now
      draw((now - start) % LOOP_MS)
      raf = requestAnimationFrame(frame)
    }

    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    const update = () => {
      // Reduced motion or off-screen / hidden tab: no animation. Reduced
      // motion shows the plain still picture (no stars drawn at all).
      if (reduce.matches) {
        stop()
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
      }
      if (visible && !document.hidden) {
        if (!raf) raf = requestAnimationFrame(frame)
      } else {
        stop()
      }
    }

    resize()
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting)
        update()
      },
      { rootMargin: '100px' },
    )
    io.observe(canvas)
    const ro = new ResizeObserver(() => {
      resize()
      if (!raf) draw(0)
    })
    ro.observe(canvas)
    reduce.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      reduce.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
