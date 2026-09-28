'use client'

import { useRef } from 'react'
import { User, Users } from 'lucide-react'
import { ComparisonCardHeader } from '@eon/components/decisions/comparison-card-header'
import { PanelArrow } from '@eon/components/decisions/panel-arrow'
import {
  formatKwhInput,
  type HouseholdId,
  type HouseholdState,
} from '@eon/components/decisions/household-states'
import { cn } from '@eon/lib/utils'
import { useTranslation } from '@i18n/use-translation'

const occupancyOptions = [
  { value: '1', icon: User },
  { value: '2', icon: User },
  { value: '3', icon: User },
  { value: '4', icon: User },
  { value: '5+', icon: Users },
] as const

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

export function EasyAnswerPanel({
  household,
  onSelect,
}: {
  household: HouseholdState
  onSelect: (id: HouseholdId) => void
}) {
  const { t } = useTranslation()
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

  const moveOccupancy = (from: number, delta: number) => {
    const next = (from + delta + occupancyOptions.length) % occupancyOptions.length
    onSelect(occupancyOptions[next].value)
    optionRefs.current[next]?.focus()
  }

  return (
    <div className="relative z-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-6">
      <div className={cardClassName}>
        <ComparisonCardHeader tone="before" title={t('eon.ui.hardInfo')}>
            <p className="text-sm font-semibold text-foreground">
              {t('eon.ui.hardQuestion')}
            </p>
            <div className="mt-4 flex w-[70%] items-center justify-between rounded-xl border border-navy-950/10 bg-card px-4 py-3">
              <span className="text-base text-foreground">{formatKwhInput(household.kwh)}</span>
              <span className="text-sm text-muted-foreground">{t('eon.ui.kwhYear')}</span>
            </div>
            <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
              <InfoMark />
              {t('eon.ui.findOnBill')}
            </p>
        </ComparisonCardHeader>
      </div>

      <PanelArrow />

      <div className={cardClassName}>
        <ComparisonCardHeader tone="after" title={t('eon.ui.easyAsk')}>
            <p className="text-sm font-semibold text-foreground">{t('eon.ui.occupancyQ')}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t('eon.ui.occupancyHint')}</p>

            <div className="mt-5 grid w-[78%] grid-cols-5 gap-3" role="radiogroup" aria-label={t('eon.ui.occupancyAria')}>
              {occupancyOptions.map(({ value, icon: Icon }, index) => {
                const selected = value === household.id
                return (
                  <button
                    key={value}
                    ref={(node) => {
                      optionRefs.current[index] = node
                    }}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => onSelect(value)}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                        event.preventDefault()
                        moveOccupancy(index, 1)
                      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                        event.preventDefault()
                        moveOccupancy(index, -1)
                      }
                    }}
                    className={cn(
                      'flex min-h-11 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl py-2.5',
                      'focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
                      selected ? 'bg-primary/20' : 'border border-navy-950/8 bg-card',
                    )}
                  >
                    <Icon
                      className={cn('size-5', selected ? 'text-foreground' : 'text-[#8a9bab]')}
                      strokeWidth={selected ? 2 : 1.75}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        'text-sm',
                        selected ? 'font-bold text-foreground' : 'font-normal text-[#8a9bab]',
                      )}
                    >
                      {value}
                    </span>
                  </button>
                )
              })}
            </div>

            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <User className="size-4 shrink-0 text-[#8a9bab]" strokeWidth={1.75} aria-hidden="true" />
              {t(`eon.ui.occupancy.${household.id}`)} (ca. {household.kwh} kWh)
            </p>
        </ComparisonCardHeader>
      </div>
    </div>
  )
}
