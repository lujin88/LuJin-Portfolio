import { AdvisoryInterface } from './advisory-interface'
import { ConceptScrollStory } from './concept-scroll-story'

// `drift` is the vertical travel (px) across the full Session 06 scroll, read from the --p
// scroll variable set by ConceptScrollStory. When the pin is disabled --p resolves to 0
// and every layer sits in its base position.
function GhostPanel({ className, drift, rotate = 0 }: { className: string; drift: number; rotate?: number }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute rounded-[10px] border border-[#1c3660]/60 bg-[#08183a]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] lg:will-change-transform ${className}`}
      style={{ transform: `translate3d(0, calc(var(--p, 0) * ${drift}px), 0) rotate(${rotate}deg)` }}
    >
      <div className="flex flex-col gap-3 p-4 opacity-60">
        <span className="h-1.5 w-1/3 rounded-full bg-[#1f3d6c]" />
        <span className="h-1.5 w-1/2 rounded-full bg-[#183258]" />
        <span className="h-1.5 w-2/5 rounded-full bg-[#183258]" />
        <span className="mt-2 h-1.5 w-1/4 rounded-full bg-[#1f3d6c]" />
        <span className="h-1.5 w-3/5 rounded-full bg-[#183258]" />
      </div>
    </div>
  )
}

// Copy source of truth: CA · Session 06 · The Concept. Do not shorten or rewrite.
const items = [
  {
    title: 'Three paths',
    body: 'Improve every existing tool individually, build a new unified dashboard, or design a surface layer above the existing landscape.',
  },
  {
    title: 'The case for less',
    body: "A new dashboard was the easier case to make internally — it was easier to scope, own, and fund as a standalone initiative. I argued for the surface layer instead: the goal wasn't a new product to own, it was fewer tools for advisors to juggle. Advisors were already working across 10+ systems — adding one more, or asking them to relearn a new one, would cost more than it saved.",
  },
  {
    title: 'Buy-in',
    body: 'That case won the stakeholder over.',
  },
  {
    title: 'In practice',
    body: 'A prioritised overview layered on the existing dashboard, expanding into full context on click, with next steps surfaced as recommendations — the way retail apps surface related picks.',
  },
  {
    title: 'The result',
    body: 'One experience, unifying client context, portfolio, and research — without adding to the pile. 500+ client signals, one view.',
  },
]

export function SessionConcept() {
  const visual = (
    <div className="relative w-full lg:-ml-6 xl:-ml-10">
      <GhostPanel drift={-70} rotate={-1} className="-left-[14%] top-[6%] hidden w-[28%] md:block" />
      <GhostPanel drift={46} className="-left-[12%] bottom-[2%] hidden w-[26%] md:block" />
      <GhostPanel drift={-52} className="-right-[10%] top-[20%] hidden w-[24%] md:block" />
      <GhostPanel drift={64} className="-right-[6%] bottom-[8%] hidden w-[20%] md:block" />

      {/* Foreground glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[8%] -bottom-[10%] top-[30%] -z-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.28),transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 rounded-[14px] border border-[#1f3d6c]/60 bg-[#081733]/80 p-2.5 text-[9px] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] sm:text-[11px] md:p-3 md:text-[13px] lg:text-[11px] xl:text-[13px] 2xl:text-[14px]">
        <AdvisoryInterface />
      </div>
    </div>
  )

  const header = (
    <>
      <p className="flex items-center gap-4 font-sans text-[13px] font-medium tracking-[0.18em] text-[#aebfd9]">
        <span className="text-[#f2f6fc]">06</span>
        <span aria-hidden="true" className="h-4 w-px bg-[#5e7aa3]" />
        <span className="uppercase">The Concept</span>
      </p>

      <h2
        id="session-06-heading"
        className="mt-7 text-balance font-sans text-[2.1rem] font-medium leading-[1.08] tracking-[-0.02em] text-[#f2f6fc] sm:text-[2.6rem] xl:text-[3rem]"
      >
        Designing for the moment of decision.
      </h2>
    </>
  )

  return <ConceptScrollStory visual={visual} header={header} items={items} />
}
