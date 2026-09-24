'use client'

import Image from 'next/image'
import { Leaf } from 'lucide-react'
import { ComparisonCardHeader } from '@eon/components/decisions/comparison-card-header'
import { PanelArrow } from '@eon/components/decisions/panel-arrow'
import { formatEurPerYear, type HouseholdState } from '@eon/components/decisions/household-states'
import { useTranslation } from '@i18n/use-translation'

function InfoMark() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-foreground text-[9px] font-bold leading-none text-card"
    >
      i
    </span>
  )
}

const cardClassName =
  'flex h-full min-w-0 flex-col rounded-2xl border border-navy-950/8 bg-card px-6 py-6 shadow-[0_20px_60px_rgba(5,20,30,0.08)]'

export function ShowValuePanel({ household }: { household: HouseholdState }) {
  const { t } = useTranslation()
  const yearly = formatEurPerYear(household.eurPerYear)
  return (
    <div className="relative z-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-6">
      <div className={cardClassName}>
        <ComparisonCardHeader tone="before" title={t('eon.ui.onlyCost')}>
          <div className="flex h-full flex-col gap-4">
            <p className="text-sm font-semibold text-foreground">
              {t('eon.ui.estimatedCost')}
            </p>
            <p className="text-[1.85rem] font-extrabold tracking-tight text-foreground">
              {yearly}{t('eon.ui.perYear')}
            </p>
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <InfoMark />
              {t('eon.ui.estimateNote')}
            </p>
          </div>
        </ComparisonCardHeader>
      </div>

      <PanelArrow />

      <div className={cardClassName}>
        <ComparisonCardHeader tone="after" title={t('eon.ui.personalized')} bodyFullWidth>
          <div className="grid h-full min-w-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <div className="relative min-h-0 min-w-0 overflow-hidden aspect-[1679/937]">
              <Image
                src="/assets/images/eon/eon 07 battery home.png"
                alt={t('eon.ui.homeAlt')}
                fill
                sizes="(max-width: 1024px) 50vw, 28vw"
                className="object-contain object-center"
              />
            </div>

            <div className="flex h-full min-w-0 flex-col justify-center gap-2 rounded-2xl bg-mint-light px-4 py-5">
              <span className="flex size-9 items-center justify-center rounded-full bg-card">
                <Leaf className="size-4 text-foreground" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <p className="text-xs font-medium text-muted-foreground">{t('eon.ui.potentialSavings')}</p>
              <p className="text-balance text-[clamp(1.35rem,6.5vw,1.65rem)] font-extrabold leading-tight tracking-tight text-[#1f7a4c]">
                {yearly} {t('eon.ui.year').trim()}
              </p>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                {t('eon.ui.basedOnHome')}
              </p>
            </div>
          </div>
        </ComparisonCardHeader>
      </div>
    </div>
  )
}
