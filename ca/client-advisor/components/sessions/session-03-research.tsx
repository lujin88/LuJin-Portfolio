'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './session-03-research.module.css'
import { watchClass } from '@/lib/observe-once'
import { useTranslation } from '@i18n/use-translation'

const bodyText =
  'font-sans text-[15px] leading-[1.6] text-[var(--s3-body)] xl:text-base'

export function Session03Research() {
  const { t } = useTranslation()
  const advisorQuotes = [t('ca.research.quote1'), t('ca.research.quote2')]
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const revealEls = Array.from(
      section.querySelectorAll<HTMLElement>(`.${styles.reveal}`),
    )

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionMq.matches || typeof IntersectionObserver === 'undefined') {
      revealEls.forEach((el) => el.classList.add(styles.isVisible))
      return
    }

    const stops: Array<() => void> = []
    for (let i = 0; i < revealEls.length; i++) {
      stops.push(watchClass(revealEls[i], styles.isVisible, 0.15))
    }

    return () => {
      for (let i = 0; i < stops.length; i++) stops[i]()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="session-03-research"
      aria-labelledby="session-03-heading"
      className={`session-03 relative isolate flex w-full overflow-hidden bg-[var(--s3-bg)] text-[var(--s3-text)] ${styles.section}`}
    >
      <div className="absolute inset-0 -z-10">
        <div className={styles.photoFrame}>
          <Image
            src="/assets/images/client-advisory/session-03-advisor.png"
            alt={t('ca.research.photoAlt')}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${styles.photo}`}
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,19,38,0.45)_0%,rgba(9,19,38,0.7)_32%,rgba(9,19,38,0.94)_48%,rgba(9,19,38,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(9,19,38,0.3)_0%,rgba(9,19,38,0.55)_40%,rgba(9,19,38,0.94)_60%,rgba(9,19,38,0.98)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,var(--s3-bg))]" />
      </div>

      <div
        className={`${styles.grid} mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-y-14 px-6 pb-16 pt-24 sm:px-10 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:px-16 lg:pb-24 lg:pt-28 xl:px-20`}
      >
        <div className={`${styles.quotesCol} flex flex-col justify-center lg:py-8`}>
          <ul
            aria-label={t('ca.research.quotesLabel')}
            className={`${styles.reveal} flex w-full flex-col gap-y-10 pl-0 font-sans text-[1.15rem] font-normal leading-[1.4] tracking-[-0.005em] text-[var(--s3-text)] sm:text-[1.35rem] lg:gap-y-16 lg:text-[clamp(1.25rem,1.55vw,1.55rem)]`}
          >
            {advisorQuotes.map((quote, i) => (
              <li
                key={quote}
                className={
                  i === 0
                    ? `${styles.quoteA} max-w-[24ch] text-pretty [text-shadow:0_1px_18px_rgba(9,19,38,0.7)] lg:-mt-8`
                    : `${styles.quoteB} max-w-[24ch] text-pretty [text-shadow:0_1px_18px_rgba(9,19,38,0.7)] lg:mt-2`
                }
              >
                <blockquote className="m-0">{quote}</blockquote>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`${styles.copyCol} flex flex-col justify-center border-t border-[var(--s3-rule)] pt-12 lg:border-t-0 lg:py-8 lg:pt-8`}
        >
          <p className={`${styles.reveal} ca-eyebrow`} data-delay="1">
            <span className="ca-eyebrow-index">03</span>
            <span aria-hidden="true" className="ca-eyebrow-rule" />
            <span>{t('ca.research.eyebrow')}</span>
          </p>

          <h2
            id="session-03-heading"
            className={`${styles.reveal} ca-h2 mt-[var(--ca-heading-gap)] max-w-[16ch] font-sans`}
            data-delay="2"
          >
            {t('ca.research.title')}
          </h2>

          <p
            className={`${styles.reveal} mt-4 max-w-[20ch] text-balance font-sans text-[2rem] font-semibold leading-[1.15] tracking-[-0.015em] sm:text-[2.25rem] lg:text-[clamp(2.1rem,2.9vw,2.5rem)]`}
            data-delay="2"
          >
            {t('ca.research.subhead')}
          </p>

          <p
            className={`${styles.reveal} mt-6 max-w-[46ch] text-pretty ${bodyText}`}
            data-delay="3"
            dangerouslySetInnerHTML={{ __html: t('ca.research.body1Html') }}
          />

          <h3
            className={`${styles.reveal} mt-12 max-w-[22ch] text-balance font-sans text-[2rem] font-semibold leading-[1.15] tracking-[-0.015em] sm:text-[2.25rem] lg:mt-14 lg:text-[clamp(2.1rem,2.9vw,2.5rem)]`}
            data-delay="2"
          >
            {t('ca.research.heading2')}
          </h3>

          <p className={`${styles.reveal} mt-6 max-w-[46ch] text-pretty ${bodyText}`} data-delay="3">
            {t('ca.research.body2')}
          </p>
        </div>
      </div>
    </section>
  )
}
