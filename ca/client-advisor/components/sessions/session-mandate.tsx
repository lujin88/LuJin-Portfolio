'use client'

import { ScrollReveal } from '@/components/motion/scroll-reveal'
import { useTranslation } from '@i18n/use-translation'

export function SessionMandate() {
  const { t } = useTranslation()
  return (
    <section
      aria-labelledby="mandate-heading"
      className="ca-s02 relative z-0 w-full bg-[var(--ca-bg)] font-sans text-[var(--ca-text)] lg:overflow-visible lg:bg-transparent"
    >
      <img
        src="/assets/images/client-advisory/ca-02-bg.png"
        alt=""
        aria-hidden
        className="ca-s02-curve pointer-events-none absolute select-none"
      />

      <div className="ca-s02-layout relative z-20 mx-auto w-full px-6 pb-20 pt-16 sm:px-10 lg:px-16 lg:pb-24 lg:pt-18">
        <ScrollReveal className="ca-s02-intro max-w-[540px] lg:max-w-none">
          <div className="ca-eyebrow">
            <span className="ca-eyebrow-index">02</span>
            <span className="ca-eyebrow-rule" aria-hidden="true" />
            <span>{t('ca.mandate.eyebrow')}</span>
          </div>

          <h2
            id="mandate-heading"
            className="ca-h2 mt-[var(--ca-heading-gap)] max-w-[470px] text-pretty"
          >
            {t('ca.mandate.title')}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="ca-s02-body max-w-[540px] lg:max-w-none" delay={80}>
          <p className="max-w-md text-pretty text-[15px] font-normal leading-[1.6] text-[var(--ca-text-2)] xl:text-base">
            {t('ca.mandate.body1')}
          </p>

          <div className="ca-eyebrow ca-eyebrow-accent mt-16">
            <span>{t('ca.mandate.questionEyebrow')}</span>
          </div>

          <h3 className="mt-6 max-w-[540px] text-[2rem] font-semibold leading-[1.15] tracking-[-0.015em] sm:text-4xl lg:max-w-[36rem] lg:text-[2.6rem] xl:text-[2.75rem]">
            {t('ca.mandate.questionBefore')}{" "}
            <span className="font-medium text-[var(--ca-accent)]">{t('ca.mandate.questionAi')}</span> {t('ca.mandate.questionMid')}{" "}
            <span className="font-medium text-[var(--ca-accent)]">
              {t('ca.mandate.questionImpact')}
            </span>
          </h3>

          <p className="mt-8 max-w-[560px] text-pretty text-[15px] font-normal leading-[1.6] text-[var(--ca-text-2)] xl:text-base">
            {t('ca.mandate.body2')}
          </p>
        </ScrollReveal>

        <div className="ca-s02-ui-slot pointer-events-none relative z-10 mt-14 lg:mt-0">
          <img
            src="/assets/images/client-advisory/ca-02-ui.png"
            alt=""
            aria-hidden
            className="ca-s02-ui select-none"
          />
          <div className="ca-s02-ui-indicator" aria-hidden="true">
            <span className="ca-s02-ui-line" />
            <span className="ca-s02-ui-node" />
          </div>
        </div>

        <ScrollReveal className="ca-s02-note relative z-20 mt-10 max-w-[11rem] lg:mt-1">
          <p className="text-pretty text-[15px] font-normal leading-[1.6] text-[var(--ca-text)]/90">
            {t('ca.mandate.note1')}
            <br />
            {t('ca.mandate.note2')}
            <br />
            {t('ca.mandate.note3')}
          </p>
          <span aria-hidden="true" className="ca-s02-note-rule" />
          <p className="text-pretty text-[15px] font-normal leading-[1.6] text-[var(--ca-text)]/90">
            {t('ca.mandate.note4')}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
