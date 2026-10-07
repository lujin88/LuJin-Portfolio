'use client'

import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import { BarChart3, Clock, Users } from 'lucide-react'
import { ProcessJourney } from './process-journey'
import { TiltCard } from './tilt-card'
import { ScrollReveal } from '@/components/motion/scroll-reveal'
import { useTranslation } from '@i18n/use-translation'

// Scoped palette for this session only — keeps the section self-contained.
const tokens = {
  '--ca-card': '#071224',
  '--ca-line': 'rgb(169 184 204 / 0.22)',
  '--ca-line-strong': 'rgb(47 124 255 / 0.45)',
  '--ca-accent': '#2f7cff',
  '--ca-accent-soft': '#7cc0ff',
  '--ca-muted': '#a9b8cc',
  '--ca-dim': '#71839a',
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,transparent_0%,var(--ca-bg)_100%)]"
      />

      <div className="relative mx-auto flex h-auto w-full max-w-[1440px] flex-col gap-12 overflow-visible px-6 py-24 sm:px-10 lg:mx-0 lg:max-w-none lg:py-28 lg:pl-[var(--ca-rail)] lg:pr-16 xl:flex-row xl:items-center xl:gap-20 xl:pr-20">
        <Editorial />
        <Outcomes />
      </div>
    </section>
  )
}

function Editorial() {
  const { t } = useTranslation()
  return (
    <div className="flex w-full max-w-[560px] shrink-0 flex-col overflow-visible xl:w-[38%]">
      <ScrollReveal>
        <p className="ca-eyebrow">
          <span className="ca-eyebrow-index">07</span>
          <span aria-hidden="true" className="ca-eyebrow-rule" />
          <span>{t('ca.outcome.eyebrow')}</span>
        </p>

        <div className="flex min-w-0 w-full max-w-[46ch] flex-col">
          <h2 id="session-07-title" className="ca-h2 mt-[var(--ca-heading-gap)] text-balance">
            {t('ca.outcome.title')}
          </h2>

          <p className="mt-[var(--ca-body-gap)] text-pretty text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]">
            {t('ca.outcome.subhead')}
          </p>

          <p className="mt-6 text-pretty text-[15px] leading-[1.6] text-[var(--ca-muted)] xl:text-base">
            {t('ca.outcome.body')}
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-8 w-full min-w-0 overflow-visible">
        <ProcessJourney />
      </div>
    </div>
  )
}

function Outcomes() {
  const { t } = useTranslation()
  return (
    <ScrollReveal className="flex h-auto w-full flex-col gap-5 overflow-visible xl:w-[62%]">
      <div className="flex items-baseline justify-between gap-6 px-1 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--ca-muted)]">
        <span>{t('ca.outcome.avgFeedback')}</span>
        <span className="hidden xl:block">{t('ca.outcome.reach')}</span>
      </div>

      <div className="grid h-auto grid-cols-1 gap-4 overflow-visible md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        <MetricCard
          icon={<Clock className="size-5" strokeWidth={2.2} />}
          value={t('ca.outcome.m1Value')}
          label={t('ca.outcome.m1Label')}
          image="/assets/images/client-advisory/sessions/07/card-01.webp"
        />

        <MetricCard
          icon={<BarChart3 className="size-5" strokeWidth={2.2} />}
          value={t('ca.outcome.m2Value')}
          label={t('ca.outcome.m2Label')}
          image="/assets/images/client-advisory/sessions/07/card-02.webp"
        />

        <MetricCard
          icon={<Users className="size-5" strokeWidth={2.2} />}
          value={t('ca.outcome.m3Value')}
          label={t('ca.outcome.m3Label')}
          eyebrow={t('ca.outcome.reach')}
          image="/assets/images/client-advisory/sessions/07/card-03.webp"
        />
      </div>

      <p className="max-w-[720px] text-pretty px-1 pt-1 text-[14px] leading-relaxed text-[var(--ca-dim)]">
        {t('ca.outcome.footnote')}
      </p>
    </ScrollReveal>
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
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
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
