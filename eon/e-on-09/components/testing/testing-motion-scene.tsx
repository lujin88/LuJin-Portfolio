'use client'

import { Fragment, useEffect, useRef, type ReactNode } from 'react'

/** Keep the full sentence in the accessibility tree; only the visual copy types. */
export function MotionCopy({ lines, kind }: { lines: string[]; kind: 'quote' }) {
  return (
    <span data-motion-copy={kind}>
      <span className="sr-only">{lines.join(' ')}</span>
      <span aria-hidden="true">
        {lines.map((line, lineIndex) => (
          <Fragment key={lineIndex}>
            {lineIndex > 0 && <br />}
            {line.split(' ').map((word, wordIndex) => (
              <Fragment key={wordIndex}>
                {wordIndex > 0 && ' '}
                <span className="inline-block whitespace-nowrap">
                  {Array.from(word).map((letter, letterIndex) => (
                    <span key={letterIndex} data-motion-letter className="inline-block">{letter}</span>
                  ))}
                </span>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </span>
    </span>
  )
}

/** One explanatory pass. The person/media layer is deliberately not on this clock. */
export function TestingMotionScene({ children, className, sequenceKey }: {
  children: ReactNode
  className?: string
  sequenceKey: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animations: Animation[] = []
    let inView = false
    let started = false
    let completed = false
    const ease = getComputedStyle(root).getPropertyValue('--sc-ease-out').trim() || 'ease-out'
    const select = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector))
    const add = (node: Element, frames: Keyframe[], delay: number, duration: number, easing = ease) => {
      const animation = node.animate(frames, { delay, duration, easing, fill: 'both' })
      animation.pause()
      animation.currentTime = 0
      animations.push(animation)
      return animation
    }
    const reveal = (selector: string, delay: number, duration = 400) => {
      select(selector).forEach(node => add(node, [{ opacity: 0 }, { opacity: 1 }], delay, duration))
    }
    const finish = () => {
      animations.forEach(animation => animation.cancel())
      animations = []
      completed = true
      root.dataset.motionState = 'complete'
    }
    const updatePlayback = () => {
      if (completed) return
      if (reduce.matches) { finish(); return }
      if (inView && !document.hidden) {
        started = true
        root.dataset.motionState = 'playing'
        animations.forEach(animation => animation.play())
      } else {
        root.dataset.motionState = started ? 'paused' : 'ready'
        animations.forEach(animation => animation.pause())
      }
    }

    // Static/SSR is the default. JS failure or reduced motion never hides content.
    if (reduce.matches || !Element.prototype.animate || !window.IntersectionObserver) {
      root.dataset.motionState = 'complete'
      return
    }

    // SSR stays readable. If someone reaches it before hydration, keep that
    // already-visible content instead of hiding it and replaying the sequence.
    const initialRect = root.getBoundingClientRect()
    if (window.location.hash === '#auto-detect' ||
        (initialRect.top < window.innerHeight && initialRect.bottom > 0)) {
      root.dataset.motionState = 'complete'
      root.dataset.motionReason = 'already-visible'
      return
    }

    // One pass: whole image → panel → text rows → checks → label → quote → arrow.
    // Durations use the project's image/card and micro-interaction ranges.
    reveal('[data-roof-image]', 0, 300)
    reveal('[data-detect-panel]', 300, 300)
    select('[data-detect-line]').forEach((row, index) => {
      add(row, [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], 600 + index * 90, 180)
    })
    select('[data-detect-check]').forEach((check, index) => {
      add(check, [
        { opacity: 0, transform: 'scale(0.9)' },
        { opacity: 1, transform: 'scale(1)' },
      ], 1050 + index * 180, 180)
    })
    select('[data-detect-complete]').forEach(node => {
      add(node, [{ opacity: 0, transform: 'translateY(6px) scale(0.95)' }, { opacity: 1, transform: 'none' }], 1590, 240)
    })

    // Review-only clock until person footage arrives: typing → roof, nod → checks,
    // smile/speech → quote. Align these cues to the approved footage during integration.
    const typeStart = 1830
    select('[data-quote-panel]').forEach(node => {
      add(node, [{ opacity: 0, transform: 'scale(0.95)' }, { opacity: 1, transform: 'scale(1)' }], typeStart, 300)
    })
    let typeEnd = typeStart
    select('[data-motion-copy="quote"]').forEach(copy => {
      const letters = Array.from(copy.querySelectorAll('[data-motion-letter]'))
      letters.forEach((letter, index) => add(letter, [{ opacity: 0 }, { opacity: 1 }], typeStart + index * 30, 1, 'linear'))
      typeEnd = Math.max(typeEnd, typeStart + letters.length * 30)
    })
    reveal('[data-quote-attribution]', typeEnd, 180)
    reveal('[data-annotation-arrow]', typeEnd, 240)
    const end = typeEnd + 240
    root.dataset.motionDuration = String(end)
    const clock = add(root, [{}, {}], end, 1, 'linear')
    clock.onfinish = finish
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.35
      updatePlayback()
    }, { threshold: [0, 0.35] })
    observer.observe(root)
    document.addEventListener('visibilitychange', updatePlayback)
    reduce.addEventListener('change', updatePlayback)
    root.dataset.motionState = 'ready'
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', updatePlayback)
      reduce.removeEventListener('change', updatePlayback)
      animations.forEach(animation => animation.cancel())
    }
  }, [sequenceKey])

  return <div id="auto-detect" ref={ref} className={className} style={{ scrollMarginTop: '6rem' }} data-testing-motion>{children}</div>
}
