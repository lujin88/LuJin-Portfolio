'use client'

import { Check, Scan, Sun, Triangle } from 'lucide-react'
import Image from 'next/image'
import { mediaUrl } from '../../../../lib/media-url'
import { ComparisonCardHeader } from '@eon/components/decisions/comparison-card-header'
import { PanelArrow } from '@eon/components/decisions/panel-arrow'
import { useTranslation } from '@i18n/use-translation'
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { prefersReducedMotion } from '@eon/lib/motion/hooks'
import { watchState } from '@eon/lib/motion/observe-once'

/**
 * The "After" ticks land one by one: the system fills in what the customer
 * used to type. Plays when the panel is first seen and again each time
 * tab 01 is re-selected. Ticks render visible on the server; they are only
 * hidden on the client, before the first play, so a failed script never
 * leaves them blank.
 */
function useTickRun(active: boolean) {
  const ref = useRef<HTMLUListElement>(null)
  const [seen, setSeen] = useState(false)
  const [run, setRun] = useState(0)
  const [pending, setPending] = useState(false)

  useLayoutEffect(() => {
    if (!prefersReducedMotion()) setPending(true)
  }, [])

  useEffect(() => {
    const node = ref.current
    if (!node || !pending) return
    return watchState(node, (visible) => visible && setSeen(true), 0.6)
  }, [pending])

  useEffect(() => {
    if (pending && seen && active) setRun((n) => n + 1)
  }, [pending, seen, active])

  return { ref, run, hidden: pending && run === 0 }
}

export function ComparisonPanel({ active = true }: { active?: boolean }) {
  const { t } = useTranslation()
  const ticks = useTickRun(active)
  const manualFields = [
    { label: t('eon.ui.roofSizeQ'), icon: Scan },
    { label: t('eon.ui.roofInclinationQ'), icon: Triangle },
    { label: t('eon.ui.sunlightQ'), icon: Sun },
  ]
  const resolvedFields = [
    { label: t('eon.ui.roofSize'), icon: Scan },
    { label: t('eon.ui.roofInclination'), icon: Triangle },
    { label: t('eon.ui.sunlight'), icon: Sun },
  ]

  // 1024-1279: the two cards sit side by side but are narrow, so each stacks its photo above the text.
  return (
    <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-center">
      <div className="flex flex-1 flex-col gap-6 rounded-2xl border border-navy-950/8 bg-card p-3 shadow-[0_20px_60px_rgba(5,20,30,0.08)] sm:flex-row sm:items-center lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
        <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-xl sm:h-48 sm:w-48 lg:h-56 lg:w-full xl:h-48 xl:w-48">
          <Image
            src={mediaUrl('/assets/images/eon/eon 07 map before.png')}
            alt={t('eon.ui.beforeMapAlt')}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1 px-3 py-2 sm:px-2">
          <ComparisonCardHeader tone="before" title={t('eon.ui.manualInput')}>
            <ul className="flex flex-col gap-3">
              {manualFields.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="size-5 shrink-0 text-muted-foreground" strokeWidth={1.75} aria-hidden="true" />
                  <span className="text-base text-muted-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </ComparisonCardHeader>
        </div>
      </div>

      <PanelArrow />

      <div className="flex flex-1 flex-col gap-6 rounded-2xl border border-navy-950/8 bg-card p-3 shadow-[0_20px_60px_rgba(5,20,30,0.08)] sm:flex-row sm:items-center lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
        <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-xl sm:h-48 sm:w-48 lg:h-56 lg:w-full xl:h-48 xl:w-48">
          <Image
            src={mediaUrl('/assets/images/eon/eon 07 map after.png')}
            alt={t('eon.ui.afterMapAlt')}
            fill
            className="object-cover"
          />
          <Image
            src="/assets/images/eon/eon 07 pin.png"
            alt=""
            width={512}
            height={512}
            className="pointer-events-none absolute top-1/2 left-1/2 z-10 size-9 -translate-x-1/2 -translate-y-[70%] object-contain drop-shadow-md"
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0 flex-1 px-3 py-2 sm:px-2">
          <ComparisonCardHeader tone="after" title={t('eon.ui.foundRoof')}>
            <ul ref={ticks.ref} className="flex flex-col gap-3">
              {resolvedFields.map(({ label, icon: Icon }, index) => (
                <li key={label} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <Icon className="size-5 shrink-0 text-foreground" strokeWidth={1.75} aria-hidden="true" />
                    <span className="text-base font-medium text-foreground">{label}</span>
                  </span>
                  <span
                    key={ticks.run}
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full bg-after ${
                      ticks.hidden ? 'opacity-0' : ticks.run > 0 ? 'sc-tick' : ''
                    }`}
                    style={{ '--sc-tick-delay': `${150 + index * 60}ms` } as CSSProperties}
                  >
                    <Check className="size-3.5 text-after-foreground" strokeWidth={3} aria-hidden="true" />
                  </span>
                </li>
              ))}
            </ul>
          </ComparisonCardHeader>
        </div>
      </div>
    </div>
  )
}
