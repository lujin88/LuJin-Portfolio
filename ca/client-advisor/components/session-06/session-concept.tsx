'use client'

import { ScrollReveal } from '@/components/motion/scroll-reveal'
import { ConceptMockupStack } from './concept-mockup-stack'
import { ConceptScrollStory } from './concept-scroll-story'
import { useTranslation } from '@i18n/use-translation'

const bodyClass =
  'mt-[0.35rem] max-w-[34rem] text-pretty text-[15px] font-normal leading-[1.55] text-[var(--ca-text-2)] xl:text-base'

const subheadClass = 'font-sans text-[18px] font-semibold leading-[1.2] text-[var(--ca-text)]'

export function SessionConcept() {
  const { t } = useTranslation()
  const items = [
    {
      title: t('ca.concept.path1Title'),
      body: t('ca.concept.path1Body'),
    },
    {
      title: t('ca.concept.path2Title'),
      body: (
        <div className="mt-[0.85rem] flex flex-col">
          <h4 className={subheadClass}>{t('ca.concept.whyLess')}</h4>
          <p className={bodyClass}>{t('ca.concept.whyLessBody')}</p>
          <h4 className={`${subheadClass} mt-4`}>{t('ca.concept.buying')}</h4>
          <p className={bodyClass}>{t('ca.concept.buyingWon')}</p>
          <p className={bodyClass}>{t('ca.concept.buyingPractice')}</p>
        </div>
      ),
    },
    {
      title: t('ca.concept.path3Title'),
      body: t('ca.concept.path3Body'),
    },
  ]

  const visual = (
    <ScrollReveal fadeOnly className="relative w-full">
      <ConceptMockupStack />
    </ScrollReveal>
  )

  const header = (
    <ScrollReveal>
      <p className="ca-eyebrow">
        <span className="ca-eyebrow-index">06</span>
        <span aria-hidden="true" className="ca-eyebrow-rule" />
        <span>{t('ca.concept.eyebrow')}</span>
      </p>

      <h2
        id="session-06-heading"
        className="ca-h2 mt-[var(--ca-heading-gap)] max-w-[18ch] font-sans"
      >
        {t('ca.concept.title')}
      </h2>
    </ScrollReveal>
  )

  return <ConceptScrollStory visual={visual} header={header} items={items} />
}
