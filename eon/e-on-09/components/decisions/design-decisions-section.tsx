'use client'

import { useCallback, useId, useState, type KeyboardEvent } from 'react'
import { ComparisonPanel } from '@eon/components/decisions/comparison-panel'
import { EasyAnswerPanel } from '@eon/components/decisions/easy-answer-panel'
import { PrincipleCard } from '@eon/components/decisions/principle-card'
import { ShowValuePanel } from '@eon/components/decisions/show-value-panel'
import {
  defaultHouseholdId,
  getHouseholdState,
  type HouseholdId,
} from '@eon/components/decisions/household-states'
import { OnceReveal } from '@eon/components/motion/once-reveal'
import { ContentContainer } from '@eon/components/content-container'
import { SectionLabel } from '@eon/components/section-label'
import { DecisionsPurpleShape } from '@eon/components/decisions/background-shapes'
import { cn } from '@eon/lib/utils'
import { useTranslation } from '@i18n/use-translation'

type PrincipleNumber = '01' | '02' | '03'

const tabHeadingClassName =
  'w-full text-3xl font-extrabold leading-tight tracking-normal text-foreground md:text-4xl'

export function DesignDecisionsSection() {
  const { t } = useTranslation()
  const principles = [
    {
      number: '01' as const,
      title: t('eon.decisions.p1Title'),
      heading: t('eon.decisions.p1Heading'),
      body: t('eon.decisions.p1Body'),
      emphasis: t('eon.decisions.p1Emphasis'),
    },
    {
      number: '02' as const,
      title: t('eon.decisions.p2Title'),
      heading: t('eon.decisions.p2Heading'),
      body: t('eon.decisions.p2Body'),
      emphasis: t('eon.decisions.p2Emphasis'),
    },
    {
      number: '03' as const,
      title: t('eon.decisions.p3Title'),
      heading: t('eon.decisions.p3Heading'),
      body: t('eon.decisions.p3Body'),
      emphasis: t('eon.decisions.p3Emphasis'),
    },
  ]
  const [active, setActive] = useState<PrincipleNumber>('01')
  const [householdId, setHouseholdId] = useState<HouseholdId>(defaultHouseholdId)
  const household = getHouseholdState(householdId)
  const tablistId = useId()

  const activate = useCallback((number: PrincipleNumber) => {
    setActive(number)
  }, [])

  const onTabListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = principles.findIndex((principle) => principle.number === active)
    const lastIndex = principles.length - 1
    let nextIndex = currentIndex

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = lastIndex
    } else {
      return
    }

    event.preventDefault()
    const next = principles[nextIndex]
    setActive(next.number)
    document.getElementById(`${tablistId}-${next.number}`)?.focus()
  }

  return (
    <section className="relative overflow-x-clip">
      <DecisionsPurpleShape />
      <ContentContainer className="case-study-section relative z-[1] flex flex-col gap-8">
        <OnceReveal as="header" className="relative flex flex-col gap-4">
          <SectionLabel
            number="07"
            label={t('eon.decisions.eyebrow')}
            surface="light"
            emphasis="strong"
          />

          <h2 className="text-5xl font-extrabold leading-[1.02] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {t('eon.decisions.title')}
          </h2>

          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t('eon.decisions.intro')}{' '}
            <span className="font-bold text-foreground">
              {t('eon.decisions.introStrong')}
            </span>
          </p>
        </OnceReveal>

        <OnceReveal>
        <div
          role="tablist"
          aria-label={t('eon.decisions.tablist')}
          onKeyDown={onTabListKeyDown}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {principles.map((principle) => (
            <PrincipleCard
              key={principle.number}
              number={principle.number}
              title={principle.title}
              selected={active === principle.number}
              onSelect={() => activate(principle.number)}
              id={`${tablistId}-${principle.number}`}
              controlsId={`${tablistId}-panel-${principle.number}`}
            />
          ))}
        </div>
        </OnceReveal>

        <div className="grid grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-y-2">
          {principles.map((principle) => {
            const isActive = active === principle.number
            return (
              <div
                key={principle.number}
                id={`${tablistId}-panel-${principle.number}`}
                role="tabpanel"
                aria-labelledby={`${tablistId}-${principle.number}`}
                aria-hidden={!isActive}
                inert={!isActive ? true : undefined}
                className={cn(
                  'col-start-1 row-span-4 row-start-1 grid w-full grid-rows-subgrid transition-opacity duration-200 ease-out',
                  isActive ? 'z-10 opacity-100' : 'pointer-events-none invisible z-0 opacity-0',
                )}
              >
                <h2 className={tabHeadingClassName}>{principle.heading}</h2>
                <p className="w-full text-lg leading-relaxed text-muted-foreground">
                  {principle.body}
                </p>
                <p className="w-full text-lg font-bold text-foreground">
                  {principle.emphasis}
                </p>
                <div className="pt-2">
                  {principle.number === '01' ? <ComparisonPanel /> : null}
                  {principle.number === '02' ? (
                    <EasyAnswerPanel household={household} onSelect={setHouseholdId} />
                  ) : null}
                  {principle.number === '03' ? <ShowValuePanel household={household} /> : null}
                </div>
              </div>
            )
          })}
        </div>
      </ContentContainer>
    </section>
  )
}
