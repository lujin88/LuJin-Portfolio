'use client'

import { useCallback, useEffect, useId, useRef, useState, type RefObject, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { conceptMockups, type ConceptMockup } from './concept-mockups'
import styles from './concept-mockup-stack.module.css'
import floating from './concept-floating.module.css'
import { useTranslation } from '@i18n/use-translation'

// B (Lu 2026-11-04): only book-view, US Tech, client view — scattered → overview in front → result.
function pose(step: number, index: number) {
  if (step === 0) return [(index - 1) * 215, (index - 1) * 18, 0.5, (index - 1) * -5, 1]
  if (step === 1) return index === 0 ? [-45, -35, 0.86, -3, 1] : [175, (index - 1.5) * 150, 0.3, (index - 1.5) * 4, 0.8]
  // Step 3 (Lu 2026-11-04): client view in front; book-view on top at the side, US Tech below.
  return index === 2 ? [-20, 0, 0.9, 0, 1] : [190, (index - 0.5) * 150, 0.28, 0, 0.6]
}

export function ConceptMockupStack() {
  const { t } = useTranslation()
  const sceneRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const titleId = useId()
  const count = conceptMockups.length
  const active = activeIndex === null ? null : conceptMockups[activeIndex]

  useEffect(() => {
    const scene = sceneRef.current
    const section = scene?.closest('section')
    if (!scene || !section) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const wide = matchMedia('(min-width: 1024px)')
    const cards = [...scene.querySelectorAll<HTMLButtonElement>('[data-concept-card]')]
    let frame = 0
    let settleFrame = 0
    let previousReduced = reduced.matches
    let previousWide = wide.matches
    let wasVisible = false
    let settling = false
    let rememberedHash = window.location.hash
    let pendingSectionHash = rememberedHash === `#${section.id}`
    const rememberHashTarget = () => {
      if (rememberedHash === window.location.hash) return
      rememberedHash = window.location.hash
      pendingSectionHash = rememberedHash === `#${section.id}`
    }
    let readingAnchor: { element: Element; top: number } | null = null
    const rememberVisibility = () => {
      // WebKit can resize/reflow before matchMedia.matches updates. Preserve the old snapshot.
      if (settling || reduced.matches !== previousReduced || wide.matches !== previousWide ||
        (innerWidth >= 1024) !== previousWide) return
      // The parent commits pinned height through React after the CSS media change.
      if (Boolean(section.style.height) !== (!previousReduced && previousWide)) return
      rememberHashTarget()
      const rect = section.getBoundingClientRect()
      // A smooth fragment scroll emits events before reaching its destination.
      if (pendingSectionHash && Math.abs(rect.top) < 2) pendingSectionHash = false
      // Restore only when the reader is inside 06, not when an edge peeks in.
      const readingLine = innerHeight / 2
      wasVisible = rect.top <= readingLine && rect.bottom > readingLine
      readingAnchor = null
      if (!wasVisible) {
        const header = document.querySelector('[data-site-header]')
        const line = Math.max(0, header?.getBoundingClientRect().bottom ?? 0) + 1
        // Use layout boxes: hit testing can still reflect the previous paint after scrollBy.
        const anchor = [...document.querySelectorAll('section')].find((element) => {
          if (element.contains(section) || section.contains(element)) return false
          const bounds = element.getBoundingClientRect()
          return bounds.top <= line && bounds.bottom > line
        })
        if (anchor) readingAnchor = { element: anchor, top: anchor.getBoundingClientRect().top }
      }
    }
    const update = () => {
      frame = 0
      rememberVisibility()
      if (reduced.matches || !wide.matches) {
        cards.forEach((card) => { card.style.transform = ''; card.style.opacity = ''; card.style.removeProperty('--z') })
        return
      }
      const rect = section.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight)))
      const step = Math.min(2, Math.floor(p * 3))
      const local = Math.max(0, Math.min(1, (p * 3 - step) / 0.35))
      const blend = local * local * (3 - 2 * local)
      const factor = scene.clientWidth / 695
      // Hand the top layer to client view halfway through the 2→3 transition, once it outgrows book-view.
      const front = step === 2 && blend >= 0.5 ? 2 : 0
      cards.forEach((card, index) => {
        const from = pose(Math.max(0, step - 1), index)
        const to = pose(step, index)
        const value = to.map((n, i) => from[i] + (n - from[i]) * blend)
        card.style.transform = `translate(-50%, -50%) translate3d(${value[0] * factor}px, ${value[1] * factor}px, 0) scale(${value[2]}) rotate(${value[3]}deg)`
        card.style.opacity = String(value[4])
        card.style.setProperty('--z', index === front ? '10' : 'auto')
      })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const onScroll = () => { rememberVisibility(); schedule() }
    const cancelRestore = () => {
      rememberHashTarget()
      pendingSectionHash = false
      // Input can arrive after reflow but before WebKit dispatches the media change.
      if (!settling && reduced.matches === previousReduced && wide.matches === previousWide &&
        (innerWidth >= 1024) === previousWide) return
      cancelAnimationFrame(settleFrame)
      settling = false
      wasVisible = false
      readingAnchor = null
      rememberedHash = window.location.hash
      schedule()
    }
    const onScrollKey = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', ' ', 'Home', 'End'].includes(event.key)) {
        cancelRestore()
      }
    }
    const onScrollbarPointer = (event: PointerEvent) => {
      if (event.target === document.documentElement) cancelRestore()
    }
    const onMediaChange = () => {
      if (reduced.matches === previousReduced && wide.matches === previousWide) return
      rememberHashTarget()
      // Retain the destination throughout smooth scrolling, until arrival or user input.
      if (!settling && pendingSectionHash) {
        wasVisible = true
        readingAnchor = null
      }
      const restoreSection = wasVisible
      const anchor = readingAnchor
      previousReduced = reduced.matches
      previousWide = wide.matches
      cancelAnimationFrame(settleFrame)
      settling = true
      schedule()
      const restore = () => {
        if (restoreSection) {
          window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY, behavior: 'instant' })
        }
      }
      const finish = () => {
        settling = false
        rememberVisibility()
        schedule()
      }
      settleFrame = requestAnimationFrame(() => {
        if (restoreSection) restore()
        // Let CSS, React and native scroll anchoring finish before measuring a residual.
        settleFrame = requestAnimationFrame(() => {
          if (restoreSection) {
            restore()
            finish()
            return
          }
          if (!anchor?.element.isConnected) {
            finish()
            return
          }
          let previousTop = anchor.element.getBoundingClientRect().top
          let previousHeight = section.getBoundingClientRect().height
          let previousScroll = window.scrollY
          let stableFrames = 0
          const settleAnchor = () => {
            if (!anchor.element.isConnected) { finish(); return }
            if (Boolean(section.style.height) !== (!reduced.matches && wide.matches)) {
              stableFrames = 0
              settleFrame = requestAnimationFrame(settleAnchor)
              return
            }
            const top = anchor.element.getBoundingClientRect().top
            const height = section.getBoundingClientRect().height
            const scroll = window.scrollY
            stableFrames = Math.abs(top - previousTop) < 0.5 &&
              Math.abs(height - previousHeight) < 0.5 && scroll === previousScroll
              ? stableFrames + 1 : 0
            previousTop = top
            previousHeight = height
            previousScroll = scroll
            if (stableFrames < 2) {
              settleFrame = requestAnimationFrame(settleAnchor)
              return
            }
            // One correction of the remaining delta, never the original layout shift.
            const delta = top - anchor.top
            if (Math.abs(delta) >= 1) window.scrollBy({ top: delta, behavior: 'instant' })
            finish()
          }
          settleFrame = requestAnimationFrame(settleAnchor)
        })
      })
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(section)
    observer.observe(scene)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('wheel', cancelRestore, { passive: true, capture: true })
    window.addEventListener('touchmove', cancelRestore, { passive: true, capture: true })
    window.addEventListener('keydown', onScrollKey, true)
    window.addEventListener('pointerdown', onScrollbarPointer, true)
    reduced.addEventListener('change', onMediaChange)
    wide.addEventListener('change', onMediaChange)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(settleFrame)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('wheel', cancelRestore, true)
      window.removeEventListener('touchmove', cancelRestore, true)
      window.removeEventListener('keydown', onScrollKey, true)
      window.removeEventListener('pointerdown', onScrollbarPointer, true)
      reduced.removeEventListener('change', onMediaChange)
      wide.removeEventListener('change', onMediaChange)
    }
  }, [])

  const close = useCallback(() => {
    setActiveIndex(null)
    openerRef.current?.focus()
  }, [])
  const step = useCallback((direction: -1 | 1) => {
    setActiveIndex((current) => current === null ? null : (current + direction + count) % count)
  }, [count])

  return (
    <div ref={sceneRef} className={floating.scene} data-concept-variant="B">
      {conceptMockups.map((item, index) => (
        <button key={item.id} type="button" data-concept-card={index} className={floating.card}
          aria-label={t(`ca.concept.mockups.${item.id}`)}
          onClick={(event) => { openerRef.current = event.currentTarget; setActiveIndex(index) }}>
          <img src={item.src.src} alt="" draggable={false} />
        </button>
      ))}
      {active && activeIndex !== null ? createPortal(
        <Lightbox item={active} index={activeIndex} count={count} titleId={titleId} closeRef={closeRef}
          closeLabel={t('common.closePreview')} prevLabel={t('common.previousScreen')} nextLabel={t('common.nextScreen')}
          alt={t(`ca.concept.mockups.${active.id}`)} onClose={close} onStep={step} />,
        document.body,
      ) : null}
    </div>
  )
}

function Lightbox({
  item,
  index,
  count,
  titleId,
  closeRef,
  closeLabel,
  prevLabel,
  nextLabel,
  alt,
  onClose,
  onStep,
}: {
  item: ConceptMockup
  index: number
  count: number
  titleId: string
  closeRef: RefObject<HTMLButtonElement | null>
  closeLabel: string
  prevLabel: string
  nextLabel: string
  alt: string
  onClose: () => void
  onStep: (direction: -1 | 1) => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = overlayRef.current
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onStep(-1)
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onStep(1)
        return
      }
      if (event.key !== 'Tab' || !root) return
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, video'),
      ).filter((el) => !el.hasAttribute('disabled'))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement
      if (event.shiftKey && (active === first || !root.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || !root.contains(active))) {
        event.preventDefault()
        first.focus()
      }
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [closeRef, onClose, onStep])

  const showNav = count > 1
  const aspectRatio = item.src.width / item.src.height

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      style={{ '--ar': aspectRatio } as CSSProperties}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className={styles.dialog}
        onClick={(event) => event.stopPropagation()}
      >
        <p id={titleId} className={styles.srOnly}>
          {alt}
        </p>
        <p className={styles.srOnly} aria-live="polite">
          {index + 1} / {count}
        </p>
        <img
          className={styles.preview}
          src={item.src.src}
          alt={alt}
          width={item.src.width}
          height={item.src.height}
        />
      </div>
      <button
        ref={closeRef}
        type="button"
        className={styles.close}
        aria-label={closeLabel}
        title={closeLabel}
        onClick={(event) => {
          event.stopPropagation()
          onClose()
        }}
      >
        <i className="ri-close-line" aria-hidden="true" />
      </button>
      {showNav ? (
        <>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navPrev}`}
            aria-label={prevLabel}
            title={prevLabel}
            onClick={(event) => {
              event.stopPropagation()
              onStep(-1)
            }}
          >
            <i className="ri-arrow-left-s-line" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navNext}`}
            aria-label={nextLabel}
            title={nextLabel}
            onClick={(event) => {
              event.stopPropagation()
              onStep(1)
            }}
          >
            <i className="ri-arrow-right-s-line" aria-hidden="true" />
          </button>
        </>
      ) : null}
    </div>
  )
}
