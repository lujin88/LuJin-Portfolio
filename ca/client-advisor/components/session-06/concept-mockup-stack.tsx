'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { conceptMockups } from './concept-mockups'
import gallery from './concept-gallery.module.css'
import floating from './concept-floating.module.css'
import { useTranslation } from '@i18n/use-translation'
import { PIN_HEIGHT_QUERY, PIN_MIN_HEIGHT } from './concept-scroll-story'

// Lu #23066: open with one big card and two small ones; scrolling hands the big slot to the next card.
function pose(step: number, index: number) {
  if (index === step) return [-30, 0, 0.88, 0, 1]
  const slot = index < step ? index : index - 1
  return [190, (slot - 0.5) * 150, 0.28, 0, 0.7]
}

export function ConceptMockupStack() {
  const { t } = useTranslation()
  const sceneRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const names = conceptMockups.map((item) => t(`ca.concept.gallery.${item.id}`))

  useEffect(() => {
    const scene = sceneRef.current
    const section = scene?.closest('section')
    if (!scene || !section) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const wide = matchMedia('(min-width: 1024px)')
    // Same predicate as ConceptScrollStory: pinned only when wide and tall enough.
    const tall = matchMedia(PIN_HEIGHT_QUERY)
    const pinned = () => !reduced.matches && wide.matches && tall.matches
    const tallEnough = () => innerHeight >= PIN_MIN_HEIGHT
    const cards = [...scene.querySelectorAll<HTMLButtonElement>('[data-concept-card]')]
    let frame = 0
    let settleFrame = 0
    let previousReduced = reduced.matches
    let previousWide = wide.matches
    let previousTall = tall.matches
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
        tall.matches !== previousTall || (innerWidth >= 1024) !== previousWide ||
        tallEnough() !== previousTall) return
      // The parent commits pinned height through React after the CSS media change.
      if (Boolean(section.style.height) !== (!previousReduced && previousWide && previousTall)) return
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
      if (!pinned()) {
        cards.forEach((card) => { card.style.transform = ''; card.style.opacity = ''; card.style.filter = ''; card.style.removeProperty('--z') })
        return
      }
      const rect = section.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight)))
      const step = Math.min(2, Math.floor(p * 3))
      const local = Math.max(0, Math.min(1, (p * 3 - step) / 0.35))
      const blend = local * local * (3 - 2 * local)
      const factor = scene.clientWidth / 695
      // Hand the top layer to the incoming card halfway through each transition.
      const front = step > 0 && blend >= 0.5 ? step : Math.max(0, step - 1)
      cards.forEach((card, index) => {
        const from = pose(Math.max(0, step - 1), index)
        const to = pose(step, index)
        const value = to.map((n, i) => from[i] + (n - from[i]) * blend)
        card.style.transform = `translate(-50%, -50%) translate3d(${value[0] * factor}px, ${value[1] * factor}px, 0) scale(${value[2]}) rotate(${value[3]}deg)`
        // Stay opaque so the front page never shows the one behind it; dim the small cards with brightness instead.
        card.style.opacity = '1'
        card.style.filter = value[4] < 1 ? `brightness(${value[4]})` : ''
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
        tall.matches === previousTall && (innerWidth >= 1024) === previousWide &&
        tallEnough() === previousTall) return
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
      if (reduced.matches === previousReduced && wide.matches === previousWide &&
        tall.matches === previousTall) return
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
      previousTall = tall.matches
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
          let frames = 0
          const settleAnchor = () => {
            // Bounded: never leave a rAF loop running if the layout never settles.
            if (!anchor.element.isConnected || ++frames > 120) { finish(); return }
            if (Boolean(section.style.height) !== pinned()) {
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
    tall.addEventListener('change', onMediaChange)
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
      tall.removeEventListener('change', onMediaChange)
    }
  }, [])

  const close = useCallback(() => dialogRef.current?.close(), [])
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin === location.origin && event.data?.type === 'ca06-close') close()
    }
    window.addEventListener('message', onMessage)
    return () => {
      window.removeEventListener('message', onMessage)
      document.body.style.overflow = ''
    }
  }, [close])
  const open = (index: number, opener: HTMLButtonElement) => {
    openerRef.current = opener
    setCurrent(index)
    dialogRef.current?.showModal()
    document.body.style.overflow = 'hidden'
    setIsOpen(true)
    closeRef.current?.focus()
  }

  return (
    <div ref={sceneRef} className={floating.scene} data-concept-variant="B">
      {conceptMockups.map((item, index) => (
        <button key={item.id} type="button" data-concept-card={index} className={floating.card}
          aria-label={`${t('ca.concept.gallery.open')} ${names[index]}`}
          onClick={(event) => open(index, event.currentTarget)}>
          <img src={item.src} alt="" draggable={false} loading="lazy" decoding="async" />
        </button>
      ))}
      <dialog ref={dialogRef} className={gallery.dialog} aria-label={t('ca.concept.gallery.dialog')}
        onClose={() => { document.body.style.overflow = ''; setIsOpen(false); openerRef.current?.focus() }}>
        <div className={gallery.toolbar}>
          <div className={gallery.dialogTabs} role="group" aria-label={t('ca.concept.gallery.choose')}>
            {names.map((label, i) => (
              <button key={label} type="button" aria-pressed={current === i} onClick={() => setCurrent(i)}>{i + 1}. {label}</button>
            ))}
          </div>
          <button ref={closeRef} type="button" onClick={close} aria-label={t('ca.concept.gallery.closeLabel')}>
            {t('ca.concept.gallery.close')}
          </button>
        </div>
        {isOpen && <iframe title={`${names[current]}, ${t('ca.concept.gallery.study')}`} src={`/ca/ca06-concept/page-${current + 1}.html?embedded`} />}
      </dialog>
    </div>
  )
}
