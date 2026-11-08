'use client'

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import { prefersReducedMotion } from '@eon/lib/motion/hooks'

/**
 * Shared scroll-progress layer engine ("layered arrival").
 *
 * One progress value per group, many layers (`data-move` = px of travel,
 * optional `data-from-opacity`). Layers sit `(1 - progress) × distance`
 * below their rest position and travel up as the group enters.
 *
 * Progress is 0 when the group top is at the viewport bottom and 1 at the
 * earlier of: (a) the group top reaching the viewport top, or (b) the page
 * reaching its maximum scroll position. (b) lets the last blocks on a page
 * settle even though their top can never reach the viewport top.
 *
 * Contract:
 * - Initialised from the current scroll position on mount, not on the first
 *   scroll. Groups that have already arrived stay at rest. Groups below the
 *   viewport start at their full offset while still out of view. Groups on
 *   screen at mount (painted at rest by the server HTML) ease into the
 *   parallax over the first EASE_IN_PX (or more, for long layers) of scrolling, so reload mid-page,
 *   anchor jumps and back/forward scroll restoration never show a jump.
 * - Arrival latches once: progress never decreases, and once a group is at
 *   rest it stays there, even if late-loading images make the page taller.
 * - Layout changes (resize, page height via ResizeObserver) re-run the
 *   calculation for groups that have not arrived yet.
 * - Reduced motion: at rest from the start; switching it on mid-entry puts
 *   every layer at rest immediately.
 */

type LayerScrollGroupProps = {
  children: ReactNode
  className?: string
  as?: ElementType
}

const SETTLED = 0.995
/** Minimum scroll distance over which a group that was already on screen at mount eases into the parallax. */
const EASE_IN_PX = 120
/** Max layer travel per px scrolled during the ease-in (keeps ≤2px per frame at 4px/frame). */
const EASE_IN_MAX_RATE = 0.5

function restLayers(movers: HTMLElement[]) {
  for (const el of movers) {
    el.style.removeProperty('transform')
    el.style.removeProperty('opacity')
  }
}

/** `amount` = (1 - progress) × ease-in factor; 0 = at rest, 1 = full offset. */
function writeLayers(movers: HTMLElement[], amount: number) {
  for (const el of movers) {
    const distance = Number(el.dataset.move || 0)
    const fromOpacity = Number(el.dataset.fromOpacity ?? 1)
    el.style.transform = `translate3d(0, ${(amount * distance).toFixed(2)}px, 0)`
    if (fromOpacity < 1) {
      el.style.opacity = (1 - (1 - fromOpacity) * amount).toFixed(3)
    }
  }
}

/** Progress from layout. Reads layout only; never writes. */
function readProgress(group: HTMLElement) {
  const vh = window.innerHeight
  const top = group.getBoundingClientRect().top
  const scroller = document.scrollingElement || document.documentElement
  const maxScroll = Math.max(0, scroller.scrollHeight - vh)
  // Group top (viewport coords) once the page is scrolled to the bottom.
  const topAtMaxScroll = top + window.scrollY - maxScroll
  const endTop = Math.max(0, topAtMaxScroll)
  const span = vh - endTop
  if (span <= 1) return 1 // no scroll range left in which to travel
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

    restLayers(movers)
    if (prefersReducedMotion()) return

    // Already passed: at rest for good.
    if (readProgress(group) >= SETTLED) return

    // On screen at mount: it was painted at rest by the server HTML. Writing its full offset now
    // (or on the first scroll) would jump it by up to `data-move` px. Instead the offset eases in
    // from 0 over the first EASE_IN_PX of user scrolling from y0.
    const visibleAtMount = group.getBoundingClientRect().top < window.innerHeight
    // y0 = scrollY at the user's first scroll input, read before that input scrolls. Scrolls the
    // browser does on its own (restoring position on reload / back, loading or jumping to a #hash)
    // are not input, so they never start the ease-in. Recorded once; a bfcache restore keeps it.
    let y0: number | null = null
    // Longest on-screen travel decides the ease length: a 96px layer at low progress would
    // otherwise travel ~0.7px per px scrolled during the ease-in. Nested layers add up (a 32px
    // text layer inside a 64px screenshot layer travels 96px), so sum each layer's ancestors.
    const totalDistance = (el: HTMLElement) => {
      let sum = 0
      for (let n: HTMLElement | null = el; n && n !== group; n = n.parentElement) {
        if (n.dataset.move) sum += Number(n.dataset.move)
      }
      return sum
    }
    const maxDistance = Math.max(...movers.map(totalDistance))
    const easeLength = Math.max(EASE_IN_PX, (maxDistance * (1 - readProgress(group))) / EASE_IN_MAX_RATE)

    let latched = false
    let frame = 0
    let furthest = 0
    let easeIn = visibleAtMount ? 0 : 1

    const settle = () => {
      latched = true
      cancelAnimationFrame(frame)
      restLayers(movers)
      teardown()
    }

    const update = () => {
      frame = 0
      if (latched) return
      const progress = Math.max(furthest, readProgress(group))
      furthest = progress
      if (progress >= SETTLED) {
        settle()
        return
      }
      // Like progress, the ease-in only grows: scrolling back up freezes layers (no replay).
      if (easeIn < 1 && y0 !== null) {
        const e = (window.scrollY - y0) / easeLength
        easeIn = Math.max(easeIn, e < 0 ? 0 : e > 1 ? 1 : e)
      }
      writeLayers(movers, (1 - progress) * easeIn)
    }

    const request = () => {
      if (latched || frame) return
      frame = requestAnimationFrame(update)
    }

    // Scroll events are dispatched once per frame before paint, so writing here keeps the
    // painted frame in sync with the scroll position. Deferring to rAF left one stale frame
    // after an anchor jump (96px offset painted, then snapped to 0).
    const onScroll = () => {
      if (latched) return
      if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
      update()
    }

    const INPUT_EVENTS = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const
    const onFirstInput = () => {
      if (y0 === null) y0 = window.scrollY
      removeInputListeners()
    }
    const removeInputListeners = () => {
      for (const type of INPUT_EVENTS) window.removeEventListener(type, onFirstInput, true)
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onReduce = () => {
      if (media.matches) settle()
    }

    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(request)

    function teardown() {
      cancelAnimationFrame(frame)
      frame = 0
      removeInputListeners()
      media.removeEventListener('change', onReduce)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', onScroll)
      window.removeEventListener('resize', request)
      ro?.disconnect()
    }

    // Below the viewport: the full offset is written while out of view. On screen: easeIn is 0,
    // so this first write keeps the layers exactly where they were painted.
    update()

    // Capture phase, before any handler can scroll; wheel/touch passive so scrolling is never delayed.
    if (visibleAtMount) {
      for (const type of INPUT_EVENTS) window.addEventListener(type, onFirstInput, { capture: true, passive: true })
    }
    media.addEventListener('change', onReduce)
    window.addEventListener('scroll', onScroll, { passive: true })
    // Fragment navigation scrolls in a task; hashchange runs before the next frame, the scroll
    // event may not (one stale frame measured after location.hash = …).
    window.addEventListener('hashchange', onScroll)
    window.addEventListener('resize', request)
    ro?.observe(document.body)
    ro?.observe(group)

    return () => {
      teardown()
      restLayers(movers)
    }
  }, [])

  const Element = Comp as ElementType
  return (
    <Element ref={groupRef} className={className}>
      {children}
    </Element>
  )
}
