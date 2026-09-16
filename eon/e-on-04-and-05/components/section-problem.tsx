function AnnotationArrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 90 90" fill="none" className={className}>
      <path
        d="M10 8c22 10 42 30 52 62"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M62 70c2-8 2-14 0-20M62 70c-8 0-13 0-18-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SectionProblem() {
  return (
    <section className="relative overflow-x-clip bg-off-white text-ink">
      {/* blue circle — crosses the dark/white boundary on the left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-16 z-0 h-[320px] w-[320px] rounded-full bg-blue-soft md:-left-36 md:-top-20 md:h-[360px] md:w-[360px]"
      />

      <div className="relative z-[1] mx-auto w-full max-w-[1440px] px-6 py-24 md:px-16 md:py-32">
        <div className="grid gap-16 md:grid-cols-[44fr_56fr] md:items-start md:gap-10">
          {/* LEFT — editorial content */}
          <div className="md:pt-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lavender text-sm font-bold text-navy-950">
                04
              </span>
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                The Problem
              </span>
            </div>

            <h2 className="mt-7 max-w-[640px] text-balance text-[44px] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[60px]">
              The calculator asked for too much.
            </h2>

            <p className="mt-8 max-w-[440px] text-pretty text-lg leading-relaxed text-ink-soft md:text-xl">
              A useful estimate required detailed information about the home.
            </p>

            <p className="mt-6 max-w-[440px] text-pretty text-lg font-bold leading-relaxed text-ink md:text-xl">
              The original five or so questions were built for the algorithm, not
              for the customer.
            </p>

            <p className="mt-6 max-w-[440px] text-pretty text-lg leading-relaxed text-ink-soft md:text-xl">
              Some dropped off. Others never started.
            </p>
          </div>

          {/* RIGHT — visual story */}
          <div className="relative min-h-[540px] md:min-h-[620px]">
            {/* large organic purple shape — overlaps upward into the dark section */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-40 z-0 h-[620px] w-[640px] bg-lavender-light md:-right-56 md:-top-56 md:h-[760px] md:w-[800px]"
              style={{
                borderRadius: '62% 38% 44% 56% / 58% 63% 37% 42%',
                transform: 'rotate(-8deg)',
              }}
            />

            {/* tonal shade behind the floor plan */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-24 z-[1] h-[300px] w-[320px] rounded-full bg-navy-950/10 blur-2xl md:right-2 md:top-28 md:h-[360px] md:w-[380px]"
            />

            {/* floor plan — behind */}
            <img
              src="/eon-floor-plan.png"
              alt="Architectural floor-plan sheet of a home, showing detailed wall dimensions"
              className="absolute right-0 top-24 z-[2] w-[58%] max-w-[360px] rotate-[8deg] md:right-2 md:top-28"
              style={{ filter: 'drop-shadow(0 22px 50px rgba(5,20,30,0.20))' }}
            />

            {/* roof-pitch card — foreground */}
            <img
              src="/eon-roof-pitch.png"
              alt="Solar calculator UI asking the customer to select their roof pitch"
              className="absolute left-0 top-4 z-[3] w-[80%] max-w-[440px] -rotate-[4deg] md:top-10"
              style={{ filter: 'drop-shadow(0 26px 55px rgba(5,20,30,0.16))' }}
            />

            {/* annotation — finding these details */}
            <div className="absolute right-2 top-0 z-[4] w-[150px] text-right md:right-6">
              <p className="font-hand text-[22px] leading-tight text-ink md:text-[26px]">
                Finding these details takes time.
              </p>
              <AnnotationArrow className="ml-auto mt-1 h-14 w-14 text-ink/50" />
            </div>

            {/* annotation — too many questions (moved up, near the visual) */}
            <p className="absolute bottom-24 left-2 z-[4] w-[210px] font-hand text-[22px] leading-tight text-ink md:bottom-28 md:left-6 md:text-[26px]">
              Too many questions. Many drop-offs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
