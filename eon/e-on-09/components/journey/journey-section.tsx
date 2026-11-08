'use client'

import { SectionLabel } from '@eon/components/section-label'
import { ContentContainer } from '@eon/components/content-container'
import { JourneySteps } from '@eon/components/motion/journey-steps'
import { OnceReveal } from '@eon/components/motion/once-reveal'
import { useTranslation } from '@i18n/use-translation'

function AnnotationArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 168 90"
      width="168"
      height="82"
      fill="none"
      className={className}
    >
      <path
        d="M20 16c42 11 94 42 134 61"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M154 77 141 72"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M154 77 151 64"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function JourneySection() {
  const { t } = useTranslation()
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden="true"
        // Tucked into the top-right corner above the title: 28% down, it sat under the title and body text at most widths.
        className="pointer-events-none absolute -right-40 -top-36 h-[280px] w-[280px] rounded-full bg-mint md:-right-28 md:h-[300px] md:w-[300px]"
      />

      <ContentContainer className="relative py-24 md:py-32">
        <OnceReveal>
        <SectionLabel
          number="04"
          label={t('eon.journey.eyebrow')}
          surface="dark"
          emphasis="soft"
        />

        <div className="inline-block max-w-full">
          <h2 className="mt-4 max-w-full text-[46px] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[68px]">
            {t('eon.journey.title')}
          </h2>

          {/* Side by side from lg: at 768-1023 the absolute arrow ran across the paragraph. */}
          <div className="mt-8 flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="relative max-w-[380px] pb-8 lg:pb-2">
              <p className="-rotate-[6deg] font-hand text-[26px] leading-snug text-white md:text-[28px]">
                {t('eon.journey.hand')}
              </p>
              <AnnotationArrow className="pointer-events-none mt-1 ml-16 h-[68px] w-[124px] text-white/40 lg:absolute lg:top-[4.4rem] lg:left-[6.75rem] lg:mt-0 lg:h-[82px] lg:w-[168px]" />
            </div>

            <p className="max-w-[560px] text-pretty text-lg leading-relaxed text-white/60 md:pt-1 md:text-xl">
              {t('eon.journey.body')}
            </p>
          </div>
        </div>
        </OnceReveal>

        <JourneySteps />
      </ContentContainer>
    </section>
  )
}
