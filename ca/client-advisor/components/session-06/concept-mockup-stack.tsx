'use client'

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { conceptMockups, type ConceptMockup } from './concept-mockups'
import styles from './concept-mockup-stack.module.css'
import { useTranslation } from '@i18n/use-translation'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'

function isFinePointer() {
  return window.matchMedia(FINE_POINTER).matches
}

type Pt = { x: number; y: number }

function sign(p1: Pt, p2: Pt, p3: Pt) {
  return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y)
}

function pointInTriangle(p: Pt, a: Pt, b: Pt, c: Pt) {
  const d1 = sign(p, a, b)
  const d2 = sign(p, b, c)
  const d3 = sign(p, c, a)
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0
  return !(hasNeg && hasPos)
}

function pointInQuad(p: Pt, quad: Pt[]) {
  if (quad.length < 4) return false
  return pointInTriangle(p, quad[0], quad[1], quad[2]) || pointInTriangle(p, quad[0], quad[2], quad[3])
}

function faceQuad(card: HTMLElement): Pt[] {
  const probes = [...card.querySelectorAll<HTMLElement>('[data-probe]')]
  const by = Object.fromEntries(probes.map((probe) => [probe.dataset.probe, probe.getBoundingClientRect()]))
  if (!by.tl || !by.tr || !by.br || !by.bl) return []
  return [
    { x: by.tl.left, y: by.tl.top },
    { x: by.tr.right, y: by.tr.top },
    { x: by.br.right, y: by.br.bottom },
    { x: by.bl.left, y: by.bl.bottom },
  ]
}

function pickCardIndex(root: HTMLElement, clientX: number, clientY: number) {
  const cards = [...root.querySelectorAll<HTMLElement>('[data-stack-hit]')]
  const point = { x: clientX, y: clientY }
  for (let i = cards.length - 1; i >= 0; i -= 1) {
    if (pointInQuad(point, faceQuad(cards[i]))) return i
  }
  return null
}

export function ConceptMockupStack() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [liftedIndex, setLiftedIndex] = useState<number | null>(null)
  const [hot, setHot] = useState(false)
  const [mounted, setMounted] = useState(false)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const leaveTimer = useRef(0)
  const titleId = useId()
  const count = conceptMockups.length
  const lastIndex = count - 1
  const active = activeIndex == null ? null : conceptMockups[activeIndex]
  const pageDimmed = hot && activeIndex == null

  useEffect(() => {
    setMounted(true)
    return () => window.clearTimeout(leaveTimer.current)
  }, [])

  useEffect(() => {
    const section = document.getElementById('session-06')
    if (!section) return
    if (pageDimmed) section.dataset.stackHot = 'true'
    else delete section.dataset.stackHot
    return () => {
      delete section.dataset.stackHot
    }
  }, [pageDimmed])

  const enterCard = () => {
    window.clearTimeout(leaveTimer.current)
    if (isFinePointer()) setHot(true)
  }

  const leaveCard = () => {
    window.clearTimeout(leaveTimer.current)
    leaveTimer.current = window.setTimeout(() => {
      setLiftedIndex(null)
      setHot(false)
    }, 60)
  }

  const openAt = (index: number, button: HTMLButtonElement) => {
    openerRef.current = button
    setHot(false)
    setLiftedIndex(null)
    setActiveIndex(index)
  }

  const onSceneClick = (event: MouseEvent<HTMLDivElement>) => {
    const index = pickCardIndex(event.currentTarget, event.clientX, event.clientY)
    if (index == null) return
    const button = event.currentTarget.querySelectorAll<HTMLButtonElement>('button[data-stack-card]')[index]
    if (button) openAt(index, button)
  }

  const onSceneMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer() || activeIndex != null) return
    const index = pickCardIndex(event.currentTarget, event.clientX, event.clientY)
    window.clearTimeout(leaveTimer.current)
    setLiftedIndex((current) => (current === index ? current : index))
    setHot(index != null)
  }

  const onSceneLeave = () => {
    window.clearTimeout(leaveTimer.current)
    leaveTimer.current = window.setTimeout(() => {
      setLiftedIndex(null)
      setHot(false)
    }, 60)
  }

  const close = useCallback(() => {
    setActiveIndex(null)
    openerRef.current?.focus()
  }, [])

  const step = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((current) => {
        if (current == null) return current
        return (current + direction + count) % count
      })
    },
    [count],
  )

  return (
    <div
      className={styles.scene}
      onClick={onSceneClick}
      onMouseMove={onSceneMove}
      onMouseLeave={onSceneLeave}
    >
      <div className={styles.sensor} aria-hidden="true" />
      <div className={styles.hitStage} aria-hidden="true">
        {conceptMockups.map((item, index) => (
          <span
            key={item.id}
            className={styles.hitCard}
            style={{ '--i': index, '--count': count } as CSSProperties}
            data-stack-hit=""
          >
            <span className={`${styles.probe} ${styles.probeTl}`} data-probe="tl" />
            <span className={`${styles.probe} ${styles.probeTr}`} data-probe="tr" />
            <span className={`${styles.probe} ${styles.probeBr}`} data-probe="br" />
            <span className={`${styles.probe} ${styles.probeBl}`} data-probe="bl" />
          </span>
        ))}
      </div>
      <div className={styles.stage}>
        {conceptMockups.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={styles.card}
            style={{ '--i': index, '--count': count } as CSSProperties}
            data-stack-card=""
            data-front={index === lastIndex ? 'true' : undefined}
            data-lift={liftedIndex === index ? 'true' : undefined}
            aria-label={t(`ca.concept.mockups.${item.id}`)}
            onFocus={() => {
              setLiftedIndex(index)
              enterCard()
            }}
            onBlur={leaveCard}
            onClick={(event) => {
              event.stopPropagation()
              openAt(index, event.currentTarget)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                event.stopPropagation()
                openAt(index, event.currentTarget)
              }
            }}
          >
            <span className={styles.face}>
              <img src={item.src.src} alt="" draggable={false} loading="lazy" decoding="async" />
            </span>
            <span className={styles.rim} aria-hidden="true" />
            <span className={styles.reflect} aria-hidden="true">
              <img src={item.src.src} alt="" draggable={false} loading="lazy" decoding="async" />
            </span>
          </button>
        ))}
      </div>
      {mounted
        ? createPortal(
            <div
              className={`${styles.pageDim} ${pageDimmed ? styles.pageDimOn : ''}`}
              aria-hidden="true"
            />,
            document.body,
          )
        : null}
      {mounted && active && activeIndex != null
        ? createPortal(
            <Lightbox
              item={active}
              index={activeIndex}
              count={count}
              titleId={titleId}
              closeRef={closeRef}
              closeLabel={t('common.closePreview')}
              prevLabel={t('common.previousScreen')}
              nextLabel={t('common.nextScreen')}
              alt={t(`ca.concept.mockups.${active.id}`)}
              onClose={close}
              onStep={step}
            />,
            document.body,
          )
        : null}
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
        onClick={(event) => {
          event.stopPropagation()
          onClose()
        }}
      >
        <X size={18} strokeWidth={1.75} aria-hidden="true" />
      </button>
      {showNav ? (
        <>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navPrev}`}
            aria-label={prevLabel}
            onClick={(event) => {
              event.stopPropagation()
              onStep(-1)
            }}
          >
            <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navNext}`}
            aria-label={nextLabel}
            onClick={(event) => {
              event.stopPropagation()
              onStep(1)
            }}
          >
            <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </>
      ) : null}
    </div>
  )
}
