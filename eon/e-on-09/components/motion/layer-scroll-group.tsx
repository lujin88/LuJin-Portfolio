'use client'

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import { prefersReducedMotion } from '@eon/lib/motion/hooks'

/**
 * Shared scroll-progress layer engine, adapted from the Index vanilla
 * scroll / rAF / data-move mechanic.
 *
 * Same motion model: one progress value, many layers, different travel
 * distances, transforms written toward rest. Progress is 0 when the
 * section top is at the bottom of the viewport and 1 when it reaches
 * the top — so travel lasts while this section becomes the focused
 * composition. No 360vh height, sticky pin, or extra scroll distance.
 *
 * Arrival latches once, matching the existing E.ON latch contract:
 * after progress completes, layers stay at rest and do not reverse.
 *
 * Transforms are never written until the user actually starts scrolling
 * this section. Load-time scroll restoration / layout events cannot
 * move layers off the CSS baseline.
 */

type LayerScrollGroupProps = {
  children: ReactNode
  className?: string
  as?: ElementType
}

function restLayers(movers: HTMLElement[]) {
  for (const el of movers) {
    el.style.transform = 'translate3d(0, 0, 0)'
    el.style.opacity = '1'
    el.style.removeProperty('transform')
    el.style.removeProperty('opacity')
  }
}

function clearLayers(movers: HTMLElement[]) {
  for (const el of movers) {
    el.style.removeProperty('transform')
    el.style.removeProperty('opacity')
  }
}

/**
 * Progress 0 when the group top is at the viewport bottom, 1 at the earlier of the group top
 * reaching the viewport top or the page reaching its maximum scroll (from the 3000 engine), so the
 * last blocks on a page still settle although their top can never reach the viewport top.
 */
function bottomAwareProgress(group: HTMLElement) {
  const vh = window.innerHeight
  const top = group.getBoundingClientRect().top
  const scroller = document.scrollingElement || document.documentElement
  const maxScroll = Math.max(0, scroller.scrollHeight - vh)
  const endTop = Math.max(0, top + window.scrollY - maxScroll)
  const span = vh - endTop
  if (span <= 1) return 1
  const p = (vh - top) / span
  return p < 0 ? 0 : p > 1 ? 1 : p
}

export function LayerScrollGroup({
  children,
  className,
  as: Comp = 'div',
}: LayerScrollGroupProps) {
  const groupRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const group = groupRef.current
    if (!group) return

    const movers = Array.from(group.querySelectorAll<HTMLElement>('[data-move]'))
    if (!movers.length) return

    clearLayers(movers)

    if (prefersReducedMotion()) {
      restLayers(movers)
      return
    }

    let ticking = false
    let latched = false
    let armed = false
    let userIntent = false
    let frame = 0
    const startScrollY = window.scrollY

    const readProgress = () => bottomAwareProgress(group)

    const initial = readProgress()
    if (initial >= 0.995) {
      restLayers(movers)
      return
    }
    // Progress seen before the user's first scroll (load, scroll restoration, anchor jump).
    let progressBeforeArm = initial

    const write = () => {
      ticking = false
      if (latched || !armed) return

      const progress = readProgress()
      if (progress >= 0.995) {
        latched = true
        restLayers(movers)
        return
      }

      const settle = 1 - progress
      for (const el of movers) {
        const distance = Number(el.dataset.move || 0)
        const fromOpacity = Number(el.dataset.fromOpacity ?? 1)
        const y = settle * distance
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
        if (fromOpacity < 1) {
          el.style.opacity = (fromOpacity + (1 - fromOpacity) * progress).toFixed(3)
        }
      }
    }

    const requestWrite = () => {
      if (latched) return
      if (ticking) cancelAnimationFrame(frame)
      ticking = true
      frame = requestAnimationFrame(write)
    }

    const markIntent = () => {
      userIntent = true
    }

    const onScroll = () => {
      if (latched) return
      if (!armed) {
        const before = progressBeforeArm
        progressBeforeArm = readProgress()
        if (!userIntent) return
        if (window.scrollY <= startScrollY) return
        // Already on screen when the user starts scrolling (mid-page reload, a section in the
        // first viewport on phones, anchor jump): the layers are at rest, and writing
        // (1 - progress) * distance now would make them jump down. Stay at rest instead.
        if (before > 0) {
          latched = true
          restLayers(movers)
          return
        }
        armed = true
      }
      requestWrite()
    }

    const onResize = () => {
      if (latched || !armed) return
      requestWrite()
    }

    window.addEventListener('wheel', markIntent, { passive: true })
    window.addEventListener('touchstart', markIntent, { passive: true })
    window.addEventListener('pointerdown', markIntent, { passive: true })
    window.addEventListener('keydown', markIntent)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    // Late-loading images change the page height, and with it the progress near the bottom.
    const pageResize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(onResize)
    pageResize?.observe(document.documentElement)
    // Reduced motion switched on mid-entry: every layer to rest right away.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onReduce = () => {
      if (!reduce.matches) return
      latched = true
      cancelAnimationFrame(frame)
      restLayers(movers)
    }
    reduce.addEventListener('change', onReduce)
    return () => {
      pageResize?.disconnect()
      reduce.removeEventListener('change', onReduce)
      cancelAnimationFrame(frame)
      window.removeEventListener('wheel', markIntent)
      window.removeEventListener('touchstart', markIntent)
      window.removeEventListener('pointerdown', markIntent)
      window.removeEventListener('keydown', markIntent)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const Element = Comp as ElementType
  return (
    <Element ref={groupRef} className={className}>
      {children}
    </Element>
  )
}
