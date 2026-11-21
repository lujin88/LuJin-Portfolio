'use client'

import { useEffect, useRef } from 'react'

// Row 37 (Lu #22461 approved v7): only the stars twinkle, in place. The earth,
// the horizon and the text stay still. 10 s seamless loop (every frequency is
// a whole multiple of 2π/10s). Source: motionintern earth-motion-demo.html.

const IMG_W = 2400
const IMG_H = 683
const LOOP_MS = 10000

// Star field (Lu #22542: scattered, not in one row; dimmer). Positions are
// generated once from a fixed seed (deterministic, same on every load) inside
// a band of the sky above the quote, spread by a minimum distance so they
// look scattered. Coordinates are image pixels, so they stay glued to the
// picture at any section size.
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

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// [tier, count, r, peakR, base, peak, blur, spike]
const TIERS: [string, number, number, number, number, number, number, number][] = [
  ['#bae6fd', 5, 1.8, 2.4, 0.08, 0.55, 4, 4],
  ['#7dd3fc', 10, 1.2, 1.6, 0.06, 0.42, 2.5, 0],
  ['#7dd3fc', 7, 0.9, 1.15, 0.03, 0.28, 1.5, 0],
]

function buildStars(): Star[] {
  const rnd = mulberry32(22542)
  // image pixels: x across the picture, y in the sky/sea band above the quote
  const X0 = 90
  const X1 = IMG_W - 90
  const Y0 = 50
  const Y1 = 270
  const MIN_D = 130
  const pts: { x: number; y: number }[] = []
  let guard = 0
  while (pts.length < 22 && guard++ < 5000) {
    const x = X0 + rnd() * (X1 - X0)
    const y = Y0 + rnd() * (Y1 - Y0)
    if (pts.every((p) => Math.hypot(p.x - x, p.y - y) >= MIN_D)) pts.push({ x, y })
  }
  const out: Star[] = []
  let i = 0
  for (const [halo, count, r, peakR, base, peak, blur, spike] of TIERS) {
    for (let k = 0; k < count && i < pts.length; k++, i++) {
      out.push({
        x: pts[i].x,
        y: pts[i].y,
        r,
        peakR,
        halo,
        blur,
        base,
        peak,
        phase: rnd() * Math.PI * 2,
        freq: 1 + Math.floor(rnd() * 3),
        spike: spike || undefined,
      })
    }
  }
  return out
}

const STARS: Star[] = buildStars()

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
          ctx.globalAlpha = k * 0.6 * alpha
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
