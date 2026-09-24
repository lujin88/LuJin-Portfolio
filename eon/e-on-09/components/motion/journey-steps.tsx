'use client'

import { Fragment, useRef } from 'react'
import {
  ArrowRight,
  Calculator,
  FileText,
  Home,
  Leaf,
  Search,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@eon/lib/utils'
import { clamp01, useElementProgress, usePrefersReducedMotion } from '@eon/lib/motion/hooks'
import { useTranslation } from '@i18n/use-translation'

function playheadStage(progress: number) {
  return Math.min(2, (clamp01(progress) / 0.55) * 2)
}

function proximity(stage: number, index: number) {
  return Math.max(0, 1 - Math.abs(stage - index) * 1.25)
}

export function JourneySteps() {
  const { ta } = useTranslation()
  const labels = ta('eon.journey.steps')
  const stepIcons: { Icon: LucideIcon; active?: boolean }[] = [
    { Icon: Search },
    { Icon: Leaf },
    { Icon: Calculator, active: true },
    { Icon: Home },
    { Icon: FileText },
    { Icon: ShoppingCart },
  ]
  const steps = stepIcons.map((step, i) => ({
    ...step,
    label: labels[i] ?? '',
  }))
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const progress = useElementProgress(ref, {
    enterStart: 0.82,
    enterEnd: 0.18,
  })
  const stage = reduced ? 2 : playheadStage(progress)
  const atRest = reduced || stage >= 1.97

  return (
    <div ref={ref} className="relative z-[1] mt-6 overflow-x-auto pt-1 pb-3 md:mt-8">
      <div className="flex w-max items-start justify-start gap-1">
        {steps.map((step, i) => {
          const isPeak = Boolean(step.active)
          const walkIndex = i <= 2 ? i : null
          const amount = walkIndex === null || atRest ? (isPeak ? 1 : 0) : proximity(stage, walkIndex)

          const nodeStyle =
            atRest || walkIndex === null
              ? undefined
              : isPeak
                ? { opacity: 0.38 + amount * 0.62 }
                : {
                    opacity: 0.72 + amount * 0.28,
                    transform: `scale(${(1 + amount * 0.05).toFixed(3)})`,
                  }

          const labelStyle =
            atRest || walkIndex === null
              ? undefined
              : isPeak
                ? { opacity: 0.55 + amount * 0.45 }
                : { opacity: 0.6 + amount * 0.4 }

          return (
            <Fragment key={step.label}>
              <div className="flex w-[88px] shrink-0 flex-col items-center md:w-24">
                <div className="flex h-24 items-center justify-center">
                  {step.active ? (
                    <div
                      className="sc-journey-node flex h-[88px] w-[88px] origin-center items-center justify-center rounded-full bg-navy-800"
                      style={nodeStyle}
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-lavender">
                        <step.Icon
                          className="h-8 w-8 text-navy-950"
                          strokeWidth={1.6}
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="sc-journey-node flex h-16 w-16 origin-center items-center justify-center rounded-full border border-navy-border bg-navy-800"
                      style={nodeStyle}
                    >
                      <step.Icon
                        className="h-6 w-6 text-white/80"
                        strokeWidth={1.6}
                      />
                    </div>
                  )}
                </div>
                <span
                  className={cn(
                    'mt-4 text-sm md:text-base',
                    step.active
                      ? 'font-semibold text-white'
                      : 'font-medium text-white/60',
                  )}
                  style={labelStyle}
                >
                  {step.label}
                </span>
              </div>

              {i < steps.length - 1 && (
                <div className="flex h-24 w-8 shrink-0 items-center justify-center md:w-10">
                  <ArrowRight
                    className="h-5 w-5 shrink-0 text-white/35"
                    strokeWidth={1.8}
                  />
                </div>
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
