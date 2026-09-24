'use client'

import { Lightbulb } from "lucide-react"
import { ContentContainer } from "@eon/components/content-container"
import { OnceReveal } from "@eon/components/motion/once-reveal"
import { SectionLabel } from "@eon/components/section-label"
import { useTranslation } from '@i18n/use-translation'

export function DesignConstraintSection() {
  const { t } = useTranslation()
  return (
    <section className="relative z-[1] bg-navy-950">
      {/* Decorative mint circle, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 -right-16 z-0 h-[260px] w-[260px] rounded-full bg-mint md:top-10 md:h-[320px] md:w-[320px]"
      />

      <ContentContainer className="case-study-section relative z-[2]">
        {/* Section label */}
        <SectionLabel
          number="06"
          label={t('eon.constraint.eyebrow')}
          surface="dark"
          emphasis="soft"
          className="mb-10"
        />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          {/* Left: headline + copy */}
          <OnceReveal className="max-w-[720px]">
            <h2 className="text-balance text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[42px] md:text-[48px] lg:text-[46px]">
              <span className="font-bold">{t('eon.constraint.titleBold')}</span>
              <br />
              <span className="font-normal">{t('eon.constraint.titleRest')}</span>
            </h2>

            <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-blue-soft/80 md:text-xl">
              {t('eon.constraint.body')}{" "}
              <span className="font-semibold text-white">{t('eon.constraint.bodyStrong')}</span>
            </p>
          </OnceReveal>

          {/* Right: design question card */}
          <OnceReveal className="relative lg:mt-2">
            <div className="relative z-10 rounded-3xl border border-navy-border bg-navy-800/80 p-8 shadow-[0_20px_60px_rgba(5,20,30,0.18)] backdrop-blur-md md:p-10">
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-lavender-light">
                <Lightbulb className="h-5 w-5 text-navy-950" strokeWidth={1.75} />
              </span>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.04em] text-blue-soft/70">
                {t('eon.constraint.questionLabel')}
              </p>
              <p className="text-balance text-xl font-medium leading-snug text-white md:text-2xl">
                {t('eon.constraint.question')}
              </p>
            </div>
          </OnceReveal>
        </div>
      </ContentContainer>
    </section>
  )
}
