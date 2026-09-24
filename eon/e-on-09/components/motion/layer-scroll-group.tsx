'use client'

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import { enterProgress, prefersReducedMotion } from '@eon/lib/motion/hooks'

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

    const readProgress = () =>
      enterProgress(group.getBoundingClientRect(), window.innerHeight, 1, 0)

    const initial = readProgress()
    if (initial >= 0.995) {
      restLayers(movers)
      return
    }

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
        if (!userIntent) return
        if (window.scrollY <= startScrollY) return
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
    return () => {
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
