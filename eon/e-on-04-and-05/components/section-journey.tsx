import { Fragment } from 'react'
import {
  Search,
  Leaf,
  Calculator,
  Home,
  FileText,
  ShoppingCart,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Step = {
  label: string
  Icon: LucideIcon
  active?: boolean
}

const steps: Step[] = [
  { label: 'Visit', Icon: Search },
  { label: 'Explore', Icon: Leaf },
  { label: 'Calculate', Icon: Calculator, active: true },
  { label: 'Consider', Icon: Home },
  { label: 'Apply', Icon: FileText },
  { label: 'Purchase', Icon: ShoppingCart },
]

function CurvedArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 90"
      fill="none"
      className={className}
    >
      <path
        d="M6 6c14 34 40 54 74 58"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M64 66c8 0 14 0 18-2M80 64c-2-6-4-10-8-14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SectionJourney() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      {/* mint circle — aligned with the Purchase step row, right edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 bottom-24 h-[280px] w-[280px] rounded-full bg-mint/85 md:-right-32 md:bottom-28 md:h-[320px] md:w-[320px]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 py-24 md:px-16 md:py-32">
        {/* handwritten annotation — right */}
        <div className="pointer-events-none absolute right-6 top-24 z-10 hidden w-[440px] md:block">
          <div className="-rotate-2 rounded-md bg-white/[0.04] px-5 py-3">
            <p className="font-hand text-[28px] leading-snug text-white">
              The solar calculator was a critical step between interest and
              becoming a lead.
            </p>
          </div>
          <CurvedArrow className="mt-2 h-24 w-32 -scale-x-100 text-white/45" />
        </div>

        {/* top: eyebrow + headline + paragraph (wide left block) */}
        <div className="max-w-[980px]">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lavender text-sm font-bold text-navy-950">
              03
            </span>
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/50">
              The Journey
            </span>
          </div>

          <h2 className="mt-8 max-w-[900px] text-balance text-[46px] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[68px]">
            A narrow window, lost at Calculate.
          </h2>

          <p className="mt-6 max-w-[600px] text-pretty text-lg leading-relaxed text-white/60 md:text-xl">
            Homeowners typically made a decision within 24 hours of their first
            visit — but over 85% dropped off at Calculate before ever getting
            there. A slow, heavy calculator was costing us the entire decision
            window.
          </p>
        </div>

        {/* journey flow — compact, left-grouped */}
        <div className="relative z-[1] mt-20 overflow-x-auto pb-3 md:mt-28">
          <div className="flex min-w-[720px] items-start justify-start gap-1 md:min-w-0">
            {steps.map((step, i) => (
              <Fragment key={step.label}>
                <div className="flex w-[88px] flex-col items-center md:w-24">
                  <div className="flex h-20 items-center justify-center">
                    <div
                      className={cn(
                        'flex items-center justify-center rounded-full',
                        step.active
                          ? 'h-20 w-20 bg-lavender shadow-[0_0_0_10px_rgba(201,181,244,0.12)]'
                          : 'h-16 w-16 border border-navy-border bg-navy-800',
                      )}
                    >
                      <step.Icon
                        className={cn(
                          step.active
                            ? 'h-8 w-8 text-navy-950'
                            : 'h-6 w-6 text-white/80',
                        )}
                        strokeWidth={1.6}
                      />
                    </div>
                  </div>
                  <span
                    className={cn(
                      'mt-4 text-sm md:text-base',
                      step.active
                        ? 'font-semibold text-white'
                        : 'font-medium text-white/60',
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {i < steps.length - 1 && (
                  <div className="flex h-20 w-8 items-center justify-center md:w-10">
                    <ArrowRight
                      className="h-5 w-5 shrink-0 text-white/35"
                      strokeWidth={1.8}
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
