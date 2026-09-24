'use client'

import { HeroImage } from '@eon/components/overview/hero-image'
import { MetricCards } from '@eon/components/overview/metric-cards'
import { SectionLabel } from '@eon/components/section-label'
import { ContentContainer } from '@eon/components/content-container'
import { useTranslation } from '@i18n/use-translation'

export function OverviewSection() {
  const { t } = useTranslation()
  return (
    <section className="relative overflow-hidden bg-eon-navy text-white">
      <ContentContainer className="relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div className="order-2 lg:order-1">
          <SectionLabel
            number="01"
            label={t('eon.overview.eyebrow')}
            surface="dark"
            emphasis="strong"
          />

          <h1 className="mt-8 text-5xl font-extrabold leading-[0.98] tracking-tight text-balance sm:text-6xl">
            {t('eon.overview.titleBefore')}{' '}
            <span className="text-eon-lilac">{t('eon.overview.titleAccent')}</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70 text-pretty">
            {t('eon.overview.body')}
          </p>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            {t('eon.overview.role')}
          </p>
          <p className="mt-4 text-lg font-semibold text-white">
            {t('eon.overview.roleLead')}
          </p>
          <p className="mt-2 max-w-md text-base leading-relaxed text-white/60">
            {t('eon.overview.roleBody')}
          </p>

          <div className="mt-8 max-w-lg">
            <MetricCards />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <HeroImage />
        </div>
      </ContentContainer>
    </section>
  )
}
