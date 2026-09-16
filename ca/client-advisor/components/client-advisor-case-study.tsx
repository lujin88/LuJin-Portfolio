import { HeroSection } from '@/components/sessions/hero-section'
import { SessionMandate } from '@/components/sessions/session-mandate'
import { Session03Research } from '@/components/sessions/session-03-research'
import { Session04TheShift } from '@/components/sessions/session-04-the-shift'
import { Session05DesignPrinciples } from '@/components/sessions/session-05-design-principles'
import { SessionConcept } from '@/components/session-06/session-concept'
import { Session07Outcome } from '@/components/sessions/session-07-outcome'
import { ClosingSection } from '@/components/closing-section'

export function ClientAdvisorCaseStudy() {
  return (
    <main>
      <HeroSection />
      <SessionMandate />
      <Session03Research />
      <Session04TheShift />
      <Session05DesignPrinciples />
      <SessionConcept />
      <Session07Outcome />
      <ClosingSection />
    </main>
  )
}
