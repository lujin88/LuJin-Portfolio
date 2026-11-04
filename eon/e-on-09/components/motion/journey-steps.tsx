'use client'

import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowRight, Calculator, Check, FileText, Home, Leaf, Search, ShoppingCart } from 'lucide-react'
import { usePrefersReducedMotion } from '@eon/lib/motion/hooks'
import { useTranslation } from '@i18n/use-translation'
import styles from './journey-sequence.module.css'

/** Review prototype: ?journey=A or ?journey=B. Replaces the scroll playhead. */
export function JourneySteps() {
  const { ta } = useTranslation()
  const labels = ta('eon.journey.steps')
  const icons = [Search, Leaf, Calculator, Home, FileText, ShoppingCart]
  const ref = useRef<HTMLDivElement>(null)
  const [variant, setVariant] = useState<'A' | 'B'>('A')
  const [ready, setReady] = useState(false)
  const [started, setStarted] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    const section = element?.closest('section')
    if (!element || !section) return
    const mode = new URLSearchParams(window.location.search).get('journey') === 'B' ? 'B' : 'A'
    setVariant(mode)
    setReady(true)
    section.dataset.journeyVariant = mode
    section.dataset.journeyReady = 'true'
    const start = () => {
      setStarted(true)
      section.dataset.journeyStarted = 'true'
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      start()
      return
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.intersectionRatio >= 0.3)) {
        start()
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} data-journey-sequence data-variant={variant} data-ready={ready}
      data-started={started || reduced} data-reduced={reduced}
      className={`${styles.sequence} relative z-[1] mt-6 overflow-x-auto pt-1 pb-3 md:mt-8`}>
      <div className={`${styles.track} flex w-max items-start justify-start gap-1`}>
        {icons.map((Icon, i) => {
          const active = i === 2
          const arrival = variant === 'A' ? [0, 450, 900, 1800, 2133, 2466][i] : [0, 350, 700, 1100, 1100, 1100][i]
          const timing = { '--arrival': `${arrival}ms`, '--connector-delay': `${variant === 'A' ? (i < 2 ? i * 450 : 1800 + (i - 2) * 333) : i * 350}ms` } as CSSProperties
          return (
            <Fragment key={i}>
              <div data-journey-step={i} className={`${styles.step} ${active ? styles.calculate : ''} ${i > 2 ? styles.future : ''} flex w-[88px] shrink-0 flex-col items-center md:w-24`} style={timing}>
                <div className="flex h-24 items-center justify-center">
                  <div data-journey-node className={`${styles.node} relative flex origin-center items-center justify-center rounded-full bg-navy-800 ${active ? 'h-[88px] w-[88px]' : 'h-16 w-16 border border-navy-border'}`}>
                    {active ? <><span aria-hidden="true" className={styles.halo} /><span aria-hidden="true" className={styles.fill} /></> : <span aria-hidden="true" className={styles.ring} />}
                    <Icon className={`relative z-[1] ${active ? 'h-8 w-8' : 'h-6 w-6 text-white/80'}`} strokeWidth={1.6} />
                    {i < 2 && <span aria-hidden="true" className={styles.check}><Check size={12} strokeWidth={2} /></span>}
                    {active && <span aria-hidden="true" data-journey-spinner className={styles.spinner} />}
                  </div>
                </div>
                <span className={`${styles.label} mt-4 text-sm md:text-base ${active ? 'font-semibold text-white' : 'font-medium text-white/60'}`}>{labels[i] ?? ''}</span>
                <span aria-hidden="true" className={styles.underline} />
              </div>
              {i < 5 && <div aria-hidden="true" className={`${styles.connector} ${i >= 2 ? styles.futureConnector : ''} relative flex h-24 w-8 shrink-0 items-center justify-center md:w-10`} style={timing}>
                <ArrowRight className={`${styles.arrow} h-5 w-5 shrink-0 text-white/35`} strokeWidth={1.8} />
                <span className={styles.trail} /><span className={styles.dashed} />
              </div>}
            </Fragment>
          )
        })}
        <div aria-hidden="true" className={styles.particles}>
          <span data-journey-particle="lead" className={styles.lead} />
          {[48, 54, 60, 52, 46].map((distance, i) => <span key={i} data-journey-particle="drop" className={styles.drop} style={{ '--drop-x': `${(i - 2) * 12}px`, '--drop-y': `${distance}px` } as CSSProperties} />)}
          <span data-journey-particle="survivor" className={styles.survivor} />
        </div>
      </div>
    </div>
  )
}
