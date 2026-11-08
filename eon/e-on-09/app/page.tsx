import { OverviewSection } from '@eon/components/overview/overview-section'
import { ChallengeSection } from '@eon/components/challenge/challenge-section'
import { AudienceSection } from '../../e-on-03/components/audience-section'
import { JourneySection } from '@eon/components/journey/journey-section'
import { ProblemSection } from '@eon/components/problem/problem-section'
import { DesignConstraintSection } from '@eon/components/constraint/design-constraint-section'
import { DesignDecisionsSection } from '@eon/components/decisions/design-decisions-section'
import { PurpleContinuitySvg } from '@eon/components/purple-continuity-svg'
import { TestingBackgroundShapes } from '@eon/components/decisions/background-shapes'
import { TestingSection } from '@eon/components/testing/testing-section'
import { ResultsSection } from '@eon/components/results-section'

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <OverviewSection />
      <ChallengeSection />
      <AudienceSection />
      <JourneySection />
      <div className="relative z-[1] bg-off-white">
        <PurpleContinuitySvg />
        <ProblemSection />
        <DesignConstraintSection />
        <div className="theme-decisions relative">
          <DesignDecisionsSection />
        </div>
        {/* Testing's shapes bleed up into Decisions. Rendered here, anchored to
            the Testing top edge, so this opaque layer doesn't cut them off. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full">
          <TestingBackgroundShapes />
        </div>
      </div>
      <TestingSection />
      <ResultsSection />
    </main>
  )
}
