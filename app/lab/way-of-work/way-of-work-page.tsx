'use client'

import { useCallback, useRef } from 'react'
import { useTranslation } from '@i18n'
import { cn } from '@header/lib/utils'
import { SiteClosing } from '../../components/site-closing'
import { CHAPTERS, SCRUB_VIDEO } from './chapters'
import { useScrollScrub } from './use-scroll-scrub'
import styles from './way-of-work.module.css'

const CARD_START = 0.125

export function WayOfWorkPage() {
  const { t } = useTranslation()
  const wrapperRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const cards = CHAPTERS.slice(1)

  const paint = useCallback((progress: number) => {
    const hero = heroRef.current
    if (hero) {
      hero.style.opacity = String(Math.max(0, 1 - progress * 8))
      hero.style.transform = 'none'
    }

    const count = cards.length
    const inCards = progress > CARD_START
    const local = inCards
      ? Math.min(1, Math.max(0, (progress - CARD_START) / (1 - CARD_START)))
      : 0
    cards.forEach((_, index) => {
      const card = cardRefs.current[index]
      if (!card) return
      const start = index / count
      const end = (index + 1) / count
      const visible = inCards
        ? index === count - 1
          ? local >= start
          : local >= start && local < end
        : false
      card.style.opacity = visible ? '1' : '0'
      card.style.transform = 'none'
    })
  }, [cards.length])

  useScrollScrub(videoRef, wrapperRef, paint)

  return (
    <main className={styles.page}>
      <section
        ref={wrapperRef}
        className={cn('relative h-[400vh]', styles.track)}
        aria-label={t('wow.heroTitle')}
      >
        <div className={cn('sticky top-0 h-screen w-full overflow-hidden', styles.stage)}>
          <div className={styles.layerMedia} aria-hidden="true">
            <img className={styles.still} src={CHAPTERS[0].still} alt="" />
            <video
              ref={videoRef}
              className={cn(styles.video, 'absolute inset-0 h-full w-full object-cover')}
              src={SCRUB_VIDEO}
              poster={CHAPTERS[0].still}
              muted
              playsInline
              preload="auto"
              autoPlay={false}
              disablePictureInPicture
            />
          </div>

          <div className={styles.layerScrim} aria-hidden="true" />

          <div className={styles.layerCopy}>
            <div className={styles.frame}>
              <article ref={heroRef} className={cn(styles.copy, styles.heroCopy)}>
                <p className={styles.kicker} aria-hidden="true">
                  &nbsp;
                </p>
                <h1 className={cn(styles.title, 'text-left text-white/95')}>{t('wow.heroTitle')}</h1>
                <p className={cn(styles.body, 'text-left text-white/70')}>{t('wow.heroLede')}</p>
              </article>

              {cards.map((chapter, index) => (
                <article
                  key={chapter.id}
                  id={chapter.id}
                  ref={(node) => {
                    cardRefs.current[index] = node
                  }}
                  className={cn(styles.copy, styles.card)}
                >
                  {chapter.number ? (
                    <p
                      className={cn(styles.number, chapter.number.includes('.') && styles.numberWide)}
                      aria-hidden="true"
                    >
                      {chapter.number}
                    </p>
                  ) : null}
                  {chapter.labelKey ? <p className={styles.kicker}>{t(chapter.labelKey)}</p> : null}
                  <h2 className={cn(styles.title, 'text-white/95')}>{t(chapter.titleKey)}</h2>
                  {chapter.bodyKey ? <p className={cn(styles.body, 'text-white/70')}>{t(chapter.bodyKey)}</p> : null}
                  {chapter.toolKey ? <span className={styles.tool}>{t(chapter.toolKey)}</span> : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteClosing className={styles.closing} />
    </main>
  )
}
