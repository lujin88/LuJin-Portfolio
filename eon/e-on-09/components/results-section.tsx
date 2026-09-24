'use client'

import Image from 'next/image'
import { ContentContainer } from '@eon/components/content-container'
import { SectionLabel } from '@eon/components/section-label'
import { CountUp } from '@eon/components/motion/count-up'
import { OnceReveal } from '@eon/components/motion/once-reveal'
import { useTranslation } from '@i18n/use-translation'

/**
 * Section 09 — Result.
 * Editorial, asymmetric composition: large headline on the left,
 * two outcome cards stacked on the right (per the E.ON case-study
 * design system, section 19 — Results Section).
 */
export function ResultsSection() {
  const { t } = useTranslation()
  return (
    <section className="case-study-section bg-off-white">
      <ContentContainer>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.58fr_1.42fr] lg:gap-16">
          {/* Left: label + headline — kept as one group, shifted up to match the reference */}
          <OnceReveal className="flex flex-col gap-6 lg:-mt-12">
            <SectionLabel
              number="09"
              label={t('eon.results.eyebrow')}
              surface="light"
              emphasis="strong"
            />
            <h2 className="text-balance text-6xl font-extrabold leading-[0.98] tracking-[-0.04em] text-ink sm:text-7xl">
              {t('eon.results.title')}
            </h2>
          </OnceReveal>

          {/* Right: outcome cards */}
          <OnceReveal className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Primary result — lead conversion */}
            <div className="flex min-w-0 flex-col gap-6 rounded-3xl bg-mint-light p-8 sm:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-off-white">
                <Image
                  src="/assets/images/eon/eon 09 - icon - chart.png"
                  alt=""
                  width={512}
                  height={512}
                  className="h-7 w-7 object-contain"
                />
              </span>
              <div className="flex flex-col gap-2">
                <CountUp className="text-6xl font-extrabold tracking-[-0.03em] text-ink sm:text-7xl" />
                <p className="text-base font-medium text-ink-muted sm:text-lg">
                  {t('eon.results.uplift')}
                </p>
              </div>
            </div>

            {/* Secondary result — UK rollout */}
            <div className="relative flex min-w-0 flex-col gap-6 overflow-hidden rounded-3xl bg-lavender-light p-8 sm:p-10">
              <Image
                src="/assets/images/eon/uk-map-silhouette.png"
                alt=""
                width={220}
                height={260}
                className="pointer-events-none absolute bottom-2 right-0 z-0 h-[82%] w-auto object-contain opacity-30 brightness-125 saturate-50 mix-blend-multiply"
              />
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-off-white">
                <Image
                  src="/assets/images/eon/eon 09 - con - World.png"
                  alt=""
                  width={512}
                  height={512}
                  className="h-7 w-7 object-contain"
                />
              </span>
              <div className="relative z-10 flex flex-col gap-2">
                <h3 className="text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl">
                  {t('eon.results.ukTitle')}
                </h3>
                <p className="max-w-[14rem] text-base font-medium leading-relaxed text-ink-muted sm:text-lg">
                  {t('eon.results.ukBody')}
                </p>
              </div>
            </div>
          </OnceReveal>
        </div>
      </ContentContainer>
    </section>
  )
}
