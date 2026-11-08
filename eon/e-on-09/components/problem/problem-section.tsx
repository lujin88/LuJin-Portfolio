'use client'

import { SectionLabel } from '@eon/components/section-label'
import { ContentContainer } from '@eon/components/content-container'
import { OnceReveal } from '@eon/components/motion/once-reveal'
import { useTranslation } from '@i18n/use-translation'

export function ProblemSection() {
  const { t } = useTranslation()
  return (
    <section className="relative z-[2] overflow-visible text-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-16 z-[1] h-[320px] w-[320px] rounded-full bg-blue-soft md:-left-36 md:-top-20 md:h-[360px] md:w-[360px]"
      />

      <ContentContainer className="relative z-[1] pt-20 pb-12 md:pt-24 md:pb-14">
        <div className="grid gap-16 md:grid-cols-[46fr_54fr] md:items-start md:gap-8">
          <OnceReveal className="relative z-[2] md:pt-2">
            <SectionLabel
              number="05"
              label={t('eon.problem.eyebrow')}
              surface="light"
              emphasis="soft"
            />

            <h2 className="mt-7 max-w-[40rem] text-[44px] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[60px]">
              {t('eon.problem.title1')}
              <br />
              {t('eon.problem.title2')}
            </h2>

            <p className="mt-8 max-w-[38rem] text-pretty text-lg leading-relaxed text-ink-muted md:text-xl">
              {t('eon.problem.body1')}
            </p>

            <p className="mt-6 max-w-[38rem] text-pretty text-lg font-bold leading-relaxed text-ink md:text-xl">
              {t('eon.problem.body2')}
            </p>

            <p className="mt-6 max-w-[38rem] text-pretty text-lg leading-relaxed text-ink-muted md:text-xl">
              {t('eon.problem.body3')}
            </p>
          </OnceReveal>

          <div>
            {/* The note needs its own space above the collage at every viewport. */}
            <p className="mb-8 font-hand text-[22px] font-normal leading-[1.08] text-ink md:mb-16 md:text-[26px]">
              {t('eon.problem.hand1a')}
              <br />
              {t('eon.problem.hand1b')}
            </p>
            <div className="relative min-h-[470px] overflow-visible md:min-h-[510px]">
              <div className="absolute left-[50%] top-[10rem] z-[2] w-[44%] max-w-[290px] md:left-[61%] md:top-[10.75rem] md:max-w-[310px]">
                <img
                  src="/assets/images/eon/eon-04-05-floor-plan.webp"
                  alt={t('eon.problem.floorAlt')}
                  className="relative z-[2] h-auto w-full rotate-[8deg]"
                  style={{ filter: 'drop-shadow(0 18px 36px rgba(15,23,42,0.22))' }}
                />
              </div>

              <div className="absolute left-[1%] -top-3 z-[3] w-[86%] max-w-[500px] md:left-[3%] md:-top-9 md:max-w-[520px]">
                <img
                  src="/assets/images/eon/eon-04-05-house.png"
                  alt={t('eon.problem.houseAlt')}
                  className="h-auto w-full max-w-[520px] -rotate-[4deg]"
                  style={{
                    filter:
                      'drop-shadow(0 22px 28px rgba(20,24,38,0.26)) drop-shadow(0 6px 10px rgba(20,24,38,0.12))',
                  }}
                />
                <OnceReveal
                  delay={70}
                  fromOpacity={0}
                  className="relative z-10 ml-[10%] mt-8 w-[230px] md:mt-12"
                >
                  <p className="origin-left -rotate-[8deg] font-hand text-[22px] font-normal leading-[1.1] text-ink md:text-[26px]">
                    {t('eon.problem.hand2a')}
                    <br />
                    {t('eon.problem.hand2b')}
                  </p>
                </OnceReveal>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  )
}
