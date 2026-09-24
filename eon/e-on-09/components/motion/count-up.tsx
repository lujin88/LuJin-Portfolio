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
  const [value, setValue] = useState(TARGET)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return

    let played = false
    let raf = 0

    const play = () => {
      if (played) return
      played = true
      const origin = performance.now()
      const frame = (now: number) => {
        const t = Math.min((now - origin) / DURATION_MS, 1)
        setValue(t >= 1 ? TARGET : Math.round(TARGET * easeOutCubic(t)))
        if (t < 1) raf = requestAnimationFrame(frame)
      }
      setValue(0)
      raf = requestAnimationFrame(frame)
    }

    if (visibleRatio(el) >= 0.4) {
      play()
      return () => cancelAnimationFrame(raf)
    }

    setValue(0)

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
      <span aria-hidden="true">
        +<span className="tabular-nums">{value}</span>%
      </span>
    </p>
  )
}
