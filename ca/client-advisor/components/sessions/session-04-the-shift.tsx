'use client'

import { useEffect, useRef } from 'react'
import styles from './session-04-the-shift.module.css'
import { watchClass } from '@/lib/observe-once'
import { useTranslation } from '@i18n/use-translation'
import { ShiftDiagram } from './shift-diagram'

export function Session04TheShift() {
  const { t } = useTranslation()
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
      id="session-04"
      aria-labelledby="session-04-heading"
      className={`${styles.section} font-[family-name:var(--font-poppins)]`}
    >
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.atmos} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.lead}>
            <p className={`${styles.reveal} ca-eyebrow`} data-delay="1">
              <span className="ca-eyebrow-index">04</span>
              <span className="ca-eyebrow-rule" aria-hidden="true" />
              <span>{t('ca.shift.eyebrow')}</span>
            </p>

            <div className={styles.copy}>
              <h2
                id="session-04-heading"
                className={`${styles.reveal} ${styles.headline}`}
                data-delay="1"
              >
                {t('ca.shift.headline1')} <br />
                {t('ca.shift.headline2')}
              </h2>
              <p className={`${styles.reveal} ${styles.body}`} data-delay="2">
                {t('ca.shift.bodyLead')}
                <br />
                {t('ca.shift.bodyInstead')}
                <br />
                {t('ca.shift.bodyOld')}
                <br />
                {t('ca.shift.bodyWeAsked')}
                <br />
                <strong className={styles.bodyStrong}>
                  {t('ca.shift.bodyAsk1')}
                  <br />
                  {t('ca.shift.bodyAsk2')}
                  <br />
                  {t('ca.shift.bodyAsk3')}
                </strong>
              </p>
              <p className={`${styles.reveal} ${styles.closing}`} data-delay="3">
                {t('ca.shift.closing1')}
                <br />
                {t('ca.shift.closing2')}
              </p>
            </div>
          </div>

          <div className={`${styles.reveal} ${styles.stageWrap}`} data-delay="2">
            <ShiftDiagram
              signal={t('ca.shift.signal')}
              signalQ={t('ca.shift.signalQ')}
              context={t('ca.shift.context')}
              contextQ={t('ca.shift.contextQ')}
              act={t('ca.shift.act')}
              actQ={t('ca.shift.actQ')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
