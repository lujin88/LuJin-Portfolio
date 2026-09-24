'use client'

import { useEffect, useId, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { conceptMockups, type ConceptMockup } from './concept-mockups'
import styles from './concept-mockup-stack.module.css'
import { useTranslation } from '@i18n/use-translation'

export function ConceptMockupStack() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState<string | null>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const titleId = useId()
  const active = conceptMockups.find((item) => item.id === activeId) ?? null

  useEffect(() => {
    if (!activeId) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveId(null)
        openerRef.current?.focus()
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
  }, [activeId])

  return (
    <div className={styles.scene}>
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.stage}>
        {conceptMockups.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={styles.card}
            style={{ '--i': index } as CSSProperties}
            aria-label={t(`ca.concept.mockups.${item.id}`)}
            onClick={(event) => {
              openerRef.current = event.currentTarget
              setActiveId(item.id)
            }}
          >
            <span className={styles.face}>
              <img src={item.src.src} alt="" draggable={false} />
            </span>
          </button>
        ))}
      </div>
      {active
        ? createPortal(
            <Lightbox
              item={active}
              titleId={titleId}
              closeRef={closeRef}
              closeLabel={t('common.closePreview')}
              alt={t(`ca.concept.mockups.${active.id}`)}
              onClose={() => {
                setActiveId(null)
                openerRef.current?.focus()
              }}
            />,
            document.body,
          )
        : null}
    </div>
  )
}

function Lightbox({
  item,
  titleId,
  closeRef,
  closeLabel,
  alt,
  onClose,
}: {
  item: ConceptMockup
  titleId: string
  closeRef: RefObject<HTMLButtonElement | null>
  closeLabel: string
  alt: string
  onClose: () => void
}) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <p id={titleId} className={styles.srOnly}>
          {alt}
        </p>
        <img className={styles.preview} src={item.src.src} alt={alt} />
        <button ref={closeRef} type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  )
}
