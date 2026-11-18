'use client'
import { useEffect, useRef } from 'react'
import { LayerScrollGroup } from '@eon/components/motion/layer-scroll-group'
import { watchClass } from '@/lib/observe-once'

import styles from './session-03-research.module.css'
import { useTranslation } from '@i18n/use-translation'
import { Session03AdvisorMedia } from './session-03-advisor-media'

const bodyText =
  'font-sans text-[15px] leading-[1.6] text-[var(--s3-body)] xl:text-base'

export function Session03Research() {
  const { t } = useTranslation()
  const advisorQuotes = [t('ca.research.quote1'), t('ca.research.quote2')]
  const copyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const column = copyRef.current
    if (!column || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const blocks = Array.from(column.querySelectorAll<HTMLElement>('[data-copy-reveal]'))
    const stopWatching = blocks.map((block) => watchClass(block, styles.copyVisible))
    // Content stays visible until its scroll listeners are installed, including no-JS visits.
    column.classList.add(styles.copyReady)
    return () => {
      stopWatching.forEach((stop) => stop())
      column.classList.remove(styles.copyReady)
      blocks.forEach((block) => block.classList.remove(styles.copyVisible))
    }
  }, [])

  return (
    <section
      id="session-03-research"
      aria-labelledby="session-03-heading"
      className={`session-03 relative z-0 flex w-full overflow-visible text-[var(--s3-text)] ${styles.section}`}
    >
      <div className={styles.joinCeiling} aria-hidden="true" />
      <div className={styles.photoStack}>
        <Session03AdvisorMedia />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,19,38,0.45)_0%,rgba(9,19,38,0.7)_32%,rgba(9,19,38,0.94)_48%,rgba(9,19,38,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(9,19,38,0.18)_0%,rgba(9,19,38,0.28)_42%,rgba(9,19,38,0.72)_78%,var(--s3-bg,rgb(9,19,38))_100%)]" />
      </div>

      <LayerScrollGroup
        className={`${styles.grid} relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-y-14 px-[var(--content-inset,24px)] pb-10 pt-24 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:pb-12 lg:pt-16`}
      >
        <div data-move="96" className={`${styles.quotesCol} hidden flex-col justify-center lg:flex lg:self-start lg:py-8`}>
          <ul
            aria-label={t('ca.research.quotesLabel')}
            className={`flex w-full flex-col gap-y-10 pl-0 font-sans text-[1.15rem] font-normal leading-[1.4] tracking-[-0.005em] text-[var(--s3-text)] sm:text-[1.35rem] lg:gap-y-16 lg:text-[clamp(1.25rem,1.55vw,1.55rem)]`}
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
          ref={copyRef}
          data-move="96"
          className={`${styles.copyCol} flex flex-col justify-center border-t border-[var(--s3-rule)] pt-12 lg:border-t-0 lg:pt-8 lg:pb-0`}
        >
          <p className={`ca-eyebrow`}>
            <span className="ca-eyebrow-index">03</span>
            <span aria-hidden="true" className="ca-eyebrow-rule" />
            <span>{t('ca.research.eyebrow')}</span>
          </p>

          <h2 data-type="h2"
            data-copy-reveal="0"
            id="session-03-heading"
            className={`ca-h2 mt-[var(--ca-heading-gap)] max-w-[16ch] font-sans`}
          >
            {t('ca.research.title')}
          </h2>

          <p
            data-copy-reveal="1"
            className="ca-h3 mt-4 max-w-[20ch] font-sans"
          >
            {t('ca.research.subhead')}
          </p>

          <p data-type="body"
            data-copy-reveal="2"
            className={`mt-6 max-w-[46ch] text-pretty ${bodyText}`}
            dangerouslySetInnerHTML={{ __html: t('ca.research.body1Html') }}
          />

          <h3 data-type="h3"
            data-copy-reveal="3"
            className="ca-h3 mt-12 max-w-[22ch] font-sans lg:mt-14"
          >
            {t('ca.research.heading2')}
          </h3>

          <p data-type="body" data-copy-reveal="4" className={`mt-6 max-w-[46ch] text-pretty ${bodyText}`}>
            {t('ca.research.body2')}
          </p>
        </div>
      </LayerScrollGroup>
    </section>
  )
}
