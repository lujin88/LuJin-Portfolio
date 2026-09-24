'use client'

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { watchState } from '@eon/lib/motion/observe-once'

export const SC_EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'
export const SC_LERP = 0.18

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function clamp01(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value
}

export function smoothstep(value: number) {
  const x = clamp01(value)
  return x * x * (3 - 2 * x)
}

export function flowProgress(rect: DOMRect, viewportHeight: number) {
  return clamp01((viewportHeight - rect.top) / (rect.height + viewportHeight))
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return reduced
}

export function useInViewOnce<T extends HTMLElement>(
  options: { threshold?: number; rootMargin?: string } = {},
) {
  const { threshold = 0.01, rootMargin = '0px 0px -12% 0px' } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setInView(true)
      return
    }
    return watchState(el, setInView, threshold, rootMargin)
  }, [threshold, rootMargin])

  return { ref, inView }
}

type ProgressOptions = {
  latch?: boolean
  lerp?: number
  mapping?: 'enter' | 'flow'
  enterStart?: number
  enterEnd?: number
}

export function enterProgress(
  rect: DOMRect,
  viewportHeight: number,
  startRatio = 0.9,
  endRatio = 0.38,
) {
  const start = viewportHeight * startRatio
  const end = viewportHeight * endRatio
  return clamp01((start - rect.top) / Math.max(start - end, 1))
}

export function useElementProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  {
    latch = false,
    lerp = SC_LERP,
    mapping = 'enter',
    enterStart = 0.9,
    enterEnd = 0.38,
  }: ProgressOptions = {},
) {
  const [progress, setProgress] = useState(1)
  const latched = useRef(false)
  const armed = useRef(false)
  const current = useRef(1)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setProgress(1)
      return
    }

    let frame = 0

    const readTarget = () => {
      if (latched.current) return 1
      const rect = el.getBoundingClientRect()
      return mapping === 'flow'
        ? flowProgress(rect, window.innerHeight)
        : enterProgress(rect, window.innerHeight, enterStart, enterEnd)
    }

    const tick = () => {
      const target = readTarget()
      if (target < 0.85) armed.current = true
      current.current += (target - current.current) * lerp
      if (
        latch &&
        armed.current &&
        target >= 0.995 &&
        current.current >= 0.99
      ) {
        current.current = 1
        latched.current = true
        setProgress(1)
        return
      }
      if (Math.abs(current.current - target) < 0.001) {
        current.current = target
        setProgress(current.current)
        return
      }
      setProgress(current.current)
      frame = requestAnimationFrame(tick)
    }

    current.current = readTarget()
    setProgress(current.current)
    frame = requestAnimationFrame(tick)

    const kick = () => {
      if (latched.current) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
    }
  }, [enterEnd, enterStart, latch, lerp, mapping, ref])

  return progress
}
