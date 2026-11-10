'use client'

import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowRight, Calculator, Check, FileText, Home, Leaf, Search, ShoppingCart } from 'lucide-react'
import { usePrefersReducedMotion } from '@eon/lib/motion/hooks'
import { useTranslation } from '@i18n/use-translation'
import styles from './journey-sequence.module.css'

/** One-shot journey narrative with an interruptible mobile follow. */
export function JourneySteps() {
  const { ta } = useTranslation()
  const labels = ta('eon.journey.steps')
  const icons = [Search, Leaf, Calculator, Home, FileText, ShoppingCart]
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [started, setStarted] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    const section = element?.closest('section')
    if (!element || !section) return
    setReady(true)
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

  useEffect(() => {
    const rail = ref.current
    if (!rail || !started || !window.matchMedia('(max-width: 767px)').matches) return
    let frame = 0
    let stopped = false
    const stop = () => {
      stopped = true
      cancelAnimationFrame(frame)
      rail.scrollTo({ left: rail.scrollLeft, behavior: 'instant' })
    }
    const target = (index: number) => {
      const node = rail.querySelector<HTMLElement>(`[data-journey-step="${index}"]`)
      return node ? Math.min(rail.scrollWidth - rail.clientWidth, Math.max(0, node.offsetLeft + node.offsetWidth / 2 - rail.clientWidth / 2)) : 0
    }
    if (reduced) {
      rail.scrollLeft = target(2)
      return
    }
    // Reuse the node curve for both following and the final return.
    const ease = (fraction: number) => {
      let low = 0, high = 1
      for (let i = 0; i < 12; i++) {
        const t = (low + high) / 2
        const x = 3 * (1 - t) ** 2 * t * .23 + 3 * (1 - t) * t ** 2 * .32 + t ** 3
        if (x < fraction) low = t
        else high = t
      }
      return 1 - (1 - (low + high) / 2) ** 3
    }
    const follow = () => {
      const lead = rail.querySelector('[data-journey-particle="lead"]')
      const time = Number(lead?.getAnimations()[0]?.currentTime ?? 0)
      const elapsed = Math.max(0, time - 1350)
      const hop = Math.min(2, Math.floor(elapsed / 333))
      const eased = ease(Math.min(1, (elapsed - hop * 333) / 333))
      const from = hop === 0 ? 0 : target(hop + 2)
      rail.scrollLeft = time < 1350 ? 0 : from + (target(hop + 3) - from) * eased
      if (time >= 2350) {
        const progress = Math.min(1, Math.max(0, (time - 2950) / 500))
        rail.scrollLeft = target(5) + (target(2) - target(5)) * ease(progress)
      }
      if (!stopped && time < 3450) frame = requestAnimationFrame(follow)
    }
    let origin: { x: number; y: number } | null = null
    const down = (event: PointerEvent) => { origin = { x: event.clientX, y: event.clientY } }
    const move = (event: PointerEvent) => {
      if (!origin) return
      const dx = Math.abs(event.clientX - origin.x), dy = Math.abs(event.clientY - origin.y)
      if (dx > 6 && dx > dy) stop()
    }
    const up = () => { origin = null }
    const wheel = (event: WheelEvent) => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) stop() }
    const key = (event: KeyboardEvent) => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) stop() }
    rail.addEventListener('pointerdown', down, { passive: true })
    rail.addEventListener('pointermove', move, { passive: true })
    rail.addEventListener('pointerup', up)
    rail.addEventListener('pointercancel', up)
    rail.addEventListener('wheel', wheel, { passive: true })
    rail.addEventListener('keydown', key)
    frame = requestAnimationFrame(follow)
    return () => {
      cancelAnimationFrame(frame)
      rail.removeEventListener('pointerdown', down)
      rail.removeEventListener('pointermove', move)
      rail.removeEventListener('pointerup', up)
      rail.removeEventListener('pointercancel', up)
      rail.removeEventListener('wheel', wheel)
      rail.removeEventListener('keydown', key)
    }
  }, [started, reduced])

  return (
    // overflow-x:auto also clips vertically: pt-4 (with mt trimmed by the same 12px) keeps the
    // scaled Calculate halo, which reaches ~10px above the row, from being cut flat.
    <div ref={ref} data-journey-sequence  data-ready={ready}
      data-started={started || reduced} data-reduced={reduced}
      className={`${styles.sequence} relative z-[1] mt-3 overflow-x-auto pt-4 pb-16 max-sm:pb-6 md:mt-5`}>
      <div className={`${styles.track} flex w-max items-start justify-start gap-1`}>
        {icons.map((Icon, i) => {
          const active = i === 2
          const arrival = [0, 450, 900, 1350, 1683, 2016][i]
          const timing = { '--arrival': `${arrival}ms`, '--connector-delay': `${i < 2 ? i * 450 : 1350 + (i - 2) * 333}ms` } as CSSProperties
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
          <span data-journey-particle="survivor" className={styles.survivor} />
        </div>
      </div>
    </div>
  )
}
