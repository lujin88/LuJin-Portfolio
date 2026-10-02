'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@eon/lib/utils'
import { prefersReducedMotion } from '@eon/lib/motion/hooks'

const DURATION_MS = 1800
const TARGET = 300

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function visibleRatio(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  if (rect.height <= 0 || rect.bottom <= 0 || rect.top >= vh) return 0
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
  return visible / rect.height
}

export function CountUp({ className }: { className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  // Keep the final value until animation starts — avoids a +0% flash on load
  // or while the metric is still below the fold.
  const [value, setValue] = useState(TARGET)
  const [revealed, setRevealed] = useState(true)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setValue(TARGET)
      setRevealed(true)
      return
    }

    let played = false
    let raf = 0

    const play = () => {
      if (played) return
      played = true
      // Hide for one frame while resetting to 0, then count up.
      setRevealed(false)
      setValue(0)
      const origin = performance.now()
      const frame = (now: number) => {
        const t = Math.min((now - origin) / DURATION_MS, 1)
        setRevealed(true)
        setValue(t >= 1 ? TARGET : Math.round(TARGET * easeOutCubic(t)))
        if (t < 1) raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }

    if (visibleRatio(el) >= 0.4) {
      play()
      return () => cancelAnimationFrame(raf)
    }

    setValue(TARGET)
    setRevealed(true)

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        play()
      },
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <p ref={ref} className={cn('sc-count relative', className)}>
      <span className="sr-only">+{TARGET}%</span>
      <span aria-hidden="true" style={{ opacity: revealed ? 1 : 0 }}>
        +<span className="tabular-nums">{value}</span>%
      </span>
    </p>
  )
}
