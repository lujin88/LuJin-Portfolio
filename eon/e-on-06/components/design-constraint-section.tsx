import { Lightbulb } from "lucide-react"

export function DesignConstraintSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-navy-950">
      {/* Decorative mint circle, top-right — fully contained within the section, never touching the boundary */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 right-12 h-[220px] w-[220px] rounded-full bg-mint/80 blur-[1px] md:top-16 md:right-16 md:h-[280px] md:w-[280px]"
      />
      {/* Atmospheric glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(201,181,244,0.08),transparent)]"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 py-20 md:px-16 lg:px-24">
        {/* Section label */}
        <div className="mb-10 flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lavender text-sm font-bold text-navy-950">
            05
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-soft/70">
            The Design Constraint
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          {/* Left: headline + copy */}
          <div className="max-w-[720px]">
            <h2 className="text-balance text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[42px] md:text-[48px] lg:whitespace-nowrap lg:text-[46px]">
              <span className="font-bold">The calculator needed data.</span>
              <br />
              <span className="font-normal">The customer didn&apos;t want to find it.</span>
            </h2>

            <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-blue-soft/80 md:text-xl">
              The estimate depended on detailed information about the home.{" "}
              <span className="font-semibold text-white">But every question added friction.</span>
            </p>
          </div>

          {/* Right: design question card */}
          <div className="relative lg:mt-2">
            <div className="relative z-10 rounded-3xl border border-navy-border bg-navy-800/80 p-8 shadow-[0_20px_60px_rgba(5,20,30,0.35)] backdrop-blur-md md:p-10">
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-lavender-light">
                <Lightbulb className="h-5 w-5 text-navy-950" strokeWidth={1.75} />
              </span>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.04em] text-blue-soft/70">
                Design question
              </p>
              <p className="text-balance text-xl font-medium leading-snug text-white md:text-2xl">
                How can we get the data we need without making the customer do all the work?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom transition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-lavender-light/10"
      />
    </section>
  )
}
