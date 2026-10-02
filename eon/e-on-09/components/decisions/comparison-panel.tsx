'use client'

import { Check, Scan, Sun, Triangle } from 'lucide-react'
import Image from 'next/image'
import { ComparisonCardHeader } from '@eon/components/decisions/comparison-card-header'
import { PanelArrow } from '@eon/components/decisions/panel-arrow'
import { useTranslation } from '@i18n/use-translation'

export function ComparisonPanel() {
  const { t } = useTranslation()
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

  return (
    <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-center">
      <div className="flex flex-1 flex-col gap-6 rounded-2xl border border-navy-950/8 bg-card p-3 shadow-[0_20px_60px_rgba(5,20,30,0.08)] sm:flex-row sm:items-center">
        <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-xl sm:h-48 sm:w-48">
          <Image
            src="/assets/images/eon/eon 07 map before.png"
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

      <div className="flex flex-1 flex-col gap-6 rounded-2xl border border-navy-950/8 bg-card p-3 shadow-[0_20px_60px_rgba(5,20,30,0.08)] sm:flex-row sm:items-center">
        <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-xl sm:h-48 sm:w-48">
          <Image
            src="/assets/images/eon/eon 07 map after.png"
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
            <ul className="flex flex-col gap-3">
              {resolvedFields.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <Icon className="size-5 shrink-0 text-foreground" strokeWidth={1.75} aria-hidden="true" />
                    <span className="text-base font-medium text-foreground">{label}</span>
                  </span>
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-mint">
                    <Check className="size-3.5 text-navy-950" strokeWidth={3} aria-hidden="true" />
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
