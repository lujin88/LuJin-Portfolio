'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { FlaskConical, Lightbulb, Monitor, type LucideIcon } from 'lucide-react'
import styles from './process-journey.module.css'
import { watchState } from '@/lib/observe-once'
import { useTranslation } from '@i18n/use-translation'

export function ProcessJourney() {
  const { t } = useTranslation()
  const steps = [
    { label: t('ca.outcome.concept'), Icon: Lightbulb },
    { label: t('ca.outcome.mockup'), Icon: Monitor },
    { label: t('ca.outcome.test'), Icon: FlaskConical },
  ] as const
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionMq.matches) {
      setRevealed(true)
      return
    }

    return watchState(el, setRevealed, 0.4)
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.journey} ${revealed ? styles.revealed : ''}`}
    >
      <div className={styles.track} role="list" aria-label={t('ca.outcome.journeyAria')}>
        {steps.map((step, i) => (
          <Step
            key={step.label}
            step={step}
            index={i}
            showConnector={i < steps.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

function Step({
  step,
  index,
  showConnector,
}: {
  step: { label: string; Icon: LucideIcon }
  index: number
  showConnector: boolean
}) {
  const nodeDelay = `${index * 320}ms`
  const lineDelay = `${index * 320 + 160}ms`
  const labelDelay = `${index * 320 + 90}ms`

  return (
    <>
      <div className={styles.step} role="listitem">
        <span
          className={styles.node}
          style={{ '--delay': nodeDelay } as CSSProperties}
          aria-hidden="true"
        >
          <span className={styles.glow} />
          <step.Icon className={styles.icon} />
        </span>
        <span
          className={styles.label}
          style={{ '--label-delay': labelDelay } as CSSProperties}
        >
          {step.label}
        </span>
      </div>
      {showConnector ? (
        <div
          className={styles.connector}
          style={{ '--delay': lineDelay } as CSSProperties}
          aria-hidden="true"
        >
          <span className={styles.dot} />
        </div>
      ) : null}
    </>
  )
}
