'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { PIN_HEIGHT_QUERY } from './concept-scroll-story'
import styles from './concept-gallery.module.css'
import { useTranslation } from '@i18n/use-translation'

// Three fictional advisory-workspace pages (visual v2, Lu #22751 B). Previews are static PNGs;
// fullscreen loads the self-contained HTML study in an iframe from /public.
const BASE = '/ca/ca06-concept'
const PAGES = ['prep', 'evidence', 'research'] as const

export function ConceptGallery() {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const names = PAGES.map((key) => t(`ca.concept.gallery.${key}`))
  const name = names[current]

  const open = () => {
    dialogRef.current?.showModal()
    document.body.style.overflow = 'hidden'
    setIsOpen(true)
    closeRef.current?.focus()
  }
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

  // Original behaviour (Lu #23066): one big + two small; scrolling the pinned section swaps the big one.
  // Same pin predicate as ConceptScrollStory; when not pinned, the small ones are click-to-swap.
  const galleryRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const section = galleryRef.current?.closest('section')
    if (!section) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const wide = matchMedia('(min-width: 1024px)')
    const tall = matchMedia(PIN_HEIGHT_QUERY)
    let frame = 0
    const update = () => {
      frame = 0
      if (reduced.matches || !wide.matches || !tall.matches) return
      const rect = section.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight)))
      setCurrent(Math.min(PAGES.length - 1, Math.floor(p * PAGES.length)))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    addEventListener('scroll', schedule, { passive: true })
    addEventListener('resize', schedule)
    schedule()
    return () => { removeEventListener('scroll', schedule); removeEventListener('resize', schedule); cancelAnimationFrame(frame) }
  }, [])
  const others = PAGES.map((_, i) => i).filter((i) => i !== current)

  const tabs = (extra?: string) =>
    names.map((label, i) => (
      <button key={PAGES[i]} type="button" aria-pressed={current === i} onClick={() => setCurrent(i)} data-tab={extra}>
        {i + 1}. {label}
      </button>
    ))

  return (
    <figure ref={galleryRef} className={styles.gallery} style={{ margin: 0 }}>
      <div className={styles.stage}>
      <button
        ref={openerRef}
        type="button"
        className={styles.open}
        aria-label={`${t('ca.concept.gallery.open')} ${name}`}
        onClick={open}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE}/page-${current + 1}-1440.png`} alt={`${name}, ${t('ca.concept.gallery.fictional')}`} width={1440} height={1059} />
        <span>{t('ca.concept.gallery.fullscreen')}</span>
      </button>
      <div className={styles.thumbs} role="group" aria-label={t('ca.concept.gallery.choose')}>
        {others.map((i) => (
          <button key={PAGES[i]} type="button" className={styles.thumb} onClick={() => setCurrent(i)} aria-label={names[i]}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${BASE}/page-${i + 1}-1440.png`} alt="" width={1440} height={1059} />
            <span>{i + 1}. {names[i]}</span>
          </button>
        ))}
      </div>
      </div>
      <p className={styles.caption}>{`${name} · ${current + 1} of ${names.length}`}</p>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={t('ca.concept.gallery.dialog')}
        onClose={() => {
          document.body.style.overflow = ''
          setIsOpen(false)
          openerRef.current?.focus()
        }}
      >
        <div className={styles.toolbar}>
          <div className={styles.dialogTabs} role="group" aria-label={t('ca.concept.gallery.choose')}>{tabs('dialog')}</div>
          <button ref={closeRef} type="button" onClick={close} aria-label={t('ca.concept.gallery.closeLabel')}>
            {t('ca.concept.gallery.close')}
          </button>
        </div>
        {isOpen && <iframe title={`${name}, ${t('ca.concept.gallery.study')}`} src={`${BASE}/page-${current + 1}.html?embedded`} />}
      </dialog>
    </figure>
  )
}
