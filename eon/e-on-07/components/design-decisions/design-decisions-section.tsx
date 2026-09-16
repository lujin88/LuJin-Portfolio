import { BackgroundShapes } from '@/components/design-decisions/background-shapes'
import { ComparisonPanel } from '@/components/design-decisions/comparison-panel'
import { PrincipleCard } from '@/components/design-decisions/principle-card'

const principles = [
  { number: '01', title: 'Get what we can automatically', highlighted: true },
  { number: '02', title: 'Ask what people can answer easily', highlighted: false },
  { number: '03', title: 'Show the value, not just the calculation', highlighted: false },
]

export function DesignDecisionsSection() {
  return (
    <section className="relative overflow-hidden">
      <BackgroundShapes />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <header className="relative flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/25 text-sm font-bold text-primary">
              06
            </span>
            <span className="text-sm font-bold tracking-[0.2em] text-primary">DESIGN DECISIONS</span>
          </div>

          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight text-balance text-foreground md:text-6xl lg:text-7xl">
            A simpler path to a smarter estimate.
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            We redesigned the experience around three principles:{' '}
            <span className="font-bold text-foreground">
              automate what we can, ask only what&apos;s easy to answer, and make the value clear.
            </span>
          </p>

          {/* handwritten annotation */}
          <div className="pointer-events-none absolute -top-2 right-0 hidden w-56 rotate-[-4deg] lg:block">
            <p className="text-right font-[family-name:var(--font-caveat)] text-2xl leading-tight text-primary">
              Fewer inputs. Fewer unnecessary questions.
            </p>
            <svg
              className="ml-auto mt-1 h-16 w-24 text-foreground/70"
              viewBox="0 0 96 64"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M88 4C70 20 40 18 22 34c-8 7-12 15-10 24"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M12 58c-2-6-3-11-2-16M12 58c5-2 9-4 13-8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {principles.map((principle) => (
            <PrincipleCard key={principle.number} {...principle} />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-extrabold leading-tight text-balance text-foreground md:text-4xl">
              Let the system find the data.
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              We use the customer&apos;s location to retrieve key details about their home upfront — reducing
              manual input and unnecessary questions.
            </p>
            <p className="text-lg font-bold text-foreground">Fewer inputs. Fewer unnecessary questions.</p>
          </div>

          <ComparisonPanel />
        </div>
      </div>
    </section>
  )
}
