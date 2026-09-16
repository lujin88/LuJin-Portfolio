import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import { BarChart3, Clock, Users } from 'lucide-react'
import { TiltCard } from './tilt-card'

// Scoped palette for this session only — keeps the section self-contained.
const tokens = {
  '--ca-bg': '#050c1a',
  '--ca-card': '#071224',
  '--ca-line': 'rgba(77, 140, 230, 0.28)',
  '--ca-line-strong': 'rgba(99, 168, 255, 0.55)',
  '--ca-accent': '#3d8bff',
  '--ca-accent-soft': '#7cc0ff',
  '--ca-text': '#f2f6fc',
  '--ca-muted': '#a7b7d2',
  '--ca-dim': '#6f82a3',
} as CSSProperties

export function Session07Outcome() {
  return (
    <section
      id="session-07"
      aria-labelledby="session-07-title"
      style={tokens}
      className="relative isolate flex min-h-svh w-full flex-col justify-center overflow-hidden bg-[var(--ca-bg)] font-sans text-[var(--ca-text)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(61,139,255,0.10),transparent_60%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 sm:px-10 lg:px-16 lg:py-20 xl:flex-row xl:items-center xl:gap-20 xl:px-20">
        <Editorial />
        <Outcomes />
      </div>
    </section>
  )
}

function Editorial() {
  return (
    <div className="flex w-full max-w-[560px] shrink-0 flex-col gap-6 lg:gap-7 xl:w-[38%]">
      <p className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--ca-muted)]">
        <span className="font-medium text-[var(--ca-text)]">07</span>
        <span aria-hidden="true" className="h-3.5 w-px bg-[var(--ca-dim)]" />
        <span>The Outcome</span>
      </p>

      <h2
        id="session-07-title"
        className="text-balance text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[52px]"
      >
        The outcome.
      </h2>

      <p className="text-pretty text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]">
        A tested concept for more focused advisory.
      </p>

      <p className="max-w-[46ch] text-pretty text-[16px] leading-[1.6] text-[var(--ca-muted)]">
        I led concept testing with advisors — including the stakeholder who&apos;d pushed for the dashboard — to see how
        the model held up against real workflows.
      </p>

      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-[16px] font-medium text-[var(--ca-accent-soft)] sm:text-[18px]">
        <span>Concept</span>
        <Arrow />
        <span>Mockup</span>
        <Arrow />
        <span>Test</span>
      </p>
    </div>
  )
}

function Arrow() {
  return (
    <span aria-hidden="true" className="text-[var(--ca-accent)]">
      →
    </span>
  )
}

function Outcomes() {
  return (
    <div className="flex w-full flex-col gap-5 xl:w-[62%]">
      <div className="flex items-baseline justify-between gap-6 px-1 text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--ca-muted)]">
        <span>Average feedback from testing</span>
        <span className="hidden sm:block">Reach</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        <MetricCard
          icon={<Clock className="size-5" strokeWidth={2.2} />}
          value="5–10 min"
          label="Saved per client from information gathering."
          image="/images/sessions/07/card-01.png"
        />

        <MetricCard
          icon={<BarChart3 className="size-5" strokeWidth={2.2} />}
          value="Up to 30 min"
          label="Saved on more complex proposals."
          image="/images/sessions/07/card-02.png"
        />

        <MetricCard
          icon={<Users className="size-5" strokeWidth={2.2} />}
          value="500+"
          label="Advisors in trials / target user base."
          eyebrow="Reach"
          image="/images/sessions/07/card-03.png"
        />
      </div>

      <p className="max-w-[720px] text-pretty px-1 pt-1 text-[14px] leading-relaxed text-[var(--ca-dim)]">
        Feedback was consistent across EMEA and CH, where the concept was primarily scoped. APAC leaned toward speed
        over the signal-and-context flow — a nuance noted for future markets, outside this project&apos;s core focus.
      </p>
    </div>
  )
}

type MetricCardProps = {
  icon: ReactNode
  value: string
  label: string
  eyebrow?: string
  image: string
}

function MetricCard({ icon, value, label, eyebrow, image }: MetricCardProps) {
  return (
    <TiltCard className="relative flex aspect-[4/5] flex-col overflow-hidden rounded-xl border border-[var(--ca-line)] bg-[var(--ca-card)] shadow-[0_0_0_1px_rgba(61,139,255,0.04),0_30px_60px_-40px_rgba(61,139,255,0.35)]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-[6%] h-[62%] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.5)_30%,#000_58%)]"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 33vw, 100vw"
          className="object-cover object-bottom"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[64%] bg-gradient-to-b from-[var(--ca-card)] via-[var(--ca-card)]/90 via-[60%] to-transparent"
      />

      <div
        className="relative flex flex-1 flex-col gap-5 p-6 transition-transform duration-500 ease-out"
        style={{ transform: 'translate3d(var(--tilt-x), var(--tilt-y), 0)' }}
      >
        {eyebrow ? <span className="sr-only">{eyebrow}</span> : null}

        <span
          aria-hidden="true"
          className="flex size-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(61,139,255,0.55),rgba(61,139,255,0.18)_70%)] text-[var(--ca-accent-soft)] shadow-[0_0_24px_rgba(61,139,255,0.35),inset_0_0_0_1px_rgba(124,192,255,0.35)]"
        >
          {icon}
        </span>

        <div className="flex flex-col gap-3">
          <p className="whitespace-nowrap text-[clamp(24px,2.2vw,32px)] font-medium leading-[1.1] tracking-[-0.015em]">
            {value}
          </p>
          <p className="text-pretty text-[15px] leading-[1.55] text-[var(--ca-muted)] sm:text-[16px]">{label}</p>
        </div>
      </div>
    </TiltCard>
  )
}
