import type { ComponentType } from 'react'
import { ClosingSection } from '@/components/closing-section'
import { SessionConcept } from '@/components/session-06/session-concept'
import { HeroSection } from '@/components/sessions/hero-section'
import { Session03Research } from '@/components/sessions/session-03-research'
import { Session04TheShift } from '@/components/sessions/session-04-the-shift'
import { Session05DesignPrinciples } from '@/components/sessions/session-05-design-principles'
import { Session07Outcome } from '@/components/sessions/session-07-outcome'
import { SessionMandate } from '@/components/sessions/session-mandate'

export type CaSession = {
  slug: string
  index: string
  title: string
  caseHash: string
  Component: ComponentType
}

/** Chapters already composed by the root Client Advisory page. */
export const CA_SESSIONS: readonly CaSession[] = [
  {
    slug: 'the-overview',
    index: '01',
    title: 'The Overview',
    caseHash: 'hero-heading',
    Component: HeroSection,
  },
  {
    slug: 'the-mandate',
    index: '02',
    title: 'The Mandate',
    caseHash: 'mandate-heading',
    Component: SessionMandate,
  },
  {
    slug: 'the-research',
    index: '03',
    title: 'The Research',
    caseHash: 'session-03-research',
    Component: Session03Research,
  },
  {
    slug: 'the-shift',
    index: '04',
    title: 'The Shift',
    caseHash: 'session-04',
    Component: Session04TheShift,
  },
  {
    slug: 'design-principles',
    index: '05',
    title: 'Design Principles',
    caseHash: 'design-principles',
    Component: Session05DesignPrinciples,
  },
  {
    slug: 'the-concept',
    index: '06',
    title: 'The Concept',
    caseHash: 'session-06',
    Component: SessionConcept,
  },
  {
    slug: 'the-outcome',
    index: '07',
    title: 'The Outcome',
    caseHash: 'session-07',
    Component: Session07Outcome,
  },
  {
    slug: 'closing',
    index: '08',
    title: 'Closing',
    caseHash: 'closing-statement',
    Component: ClosingSection,
  },
]

export function findCaSession(slug: string) {
  return CA_SESSIONS.find((session) => session.slug === slug)
}
