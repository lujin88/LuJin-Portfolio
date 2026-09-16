import Image from 'next/image'

const scope = [
  'Opportunity Framing',
  'Research',
  'Service Design',
  'Advisory Model',
  'Design Principles',
  'Workshops',
]

const glance = [
  {
    value: '5–10 min',
    label: 'projected savings per client',
  },
  {
    value: '500+',
    label: 'Client Advisors impacted, if rolled out',
  },
  {
    value: '30 min',
    label: 'projected savings on complex proposals',
  },
]

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[var(--ca-bg)] font-display text-[var(--ca-text)]"
    >
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <Image
          src="/images/hero-background.png"
          alt="A client advisor wearing a headset works at a laptop in front of a window overlooking a city skyline at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(3,7,18,0.92)_0%,rgba(4,9,20,0.86)_18%,rgba(5,11,24,0.7)_32%,rgba(6,13,28,0.42)_44%,rgba(8,19,42,0.16)_54%,transparent_64%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(115%_95%_at_6%_88%,rgba(2,6,16,0.82)_0%,rgba(3,8,20,0.5)_34%,rgba(6,13,28,0.18)_55%,transparent_72%)]"
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1520px] grid-cols-1 gap-12 px-6 pt-20 md:px-10 md:pt-24 lg:min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(0,220px)] lg:gap-8 lg:px-12 lg:pt-24">
        <div className="flex flex-col pb-16 lg:max-w-[46rem] lg:pb-20">
          <div className="lg:pt-6">
            <p className="ca-eyebrow">
              <span className="ca-eyebrow-index">01</span>
              <span aria-hidden="true" className="ca-eyebrow-rule" />
              <span>The Overview</span>
            </p>

            <h1
              id="hero-heading"
              className="ca-h1 mt-[var(--ca-heading-gap)]"
            >
              Less searching.
              <br />
              More advising.
            </h1>

            <p className="mt-8 max-w-[38rem] text-[1.125rem] font-normal leading-[1.5] text-[var(--ca-text-2)] lg:text-[1.25rem]">
              AI-powered advisory. Surfacing what matters to each client, exactly
              when it matters.
            </p>
          </div>

          <dl className="mt-24 flex flex-col gap-4 lg:mt-auto lg:pt-24">
            <div>
              <dt className="text-[0.9375rem] font-normal leading-[1.5] text-[var(--ca-text-2)]">
                My role
              </dt>
              <dd className="mt-1 text-[1.0625rem] font-medium leading-[1.5] text-[var(--ca-text)]">
                Lead Service Designer
              </dd>
            </div>
            <div>
              <dt className="text-[0.9375rem] font-normal leading-[1.5] text-[var(--ca-text-2)]">
                Scope
              </dt>
              <dd>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {scope.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[var(--ca-accent)]/35 bg-navy-900/60 px-5 py-2 text-sm font-normal leading-[1.5] text-[var(--ca-text)] backdrop-blur-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative -mx-6 aspect-[4/3] overflow-hidden md:-mx-10 lg:hidden">
          <Image
            src="/images/hero-background.png"
            alt="A client advisor wearing a headset works at a laptop in front of a window overlooking a city skyline at dusk"
            fill
            sizes="100vw"
            className="object-cover object-[50%_25%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,var(--ca-bg)_0%,transparent_30%,transparent_70%,var(--ca-bg)_100%)]"
          />
        </div>

        <aside
          aria-label="At a glance"
          className="relative flex items-end pb-16 lg:justify-self-end lg:pb-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-10 bg-[radial-gradient(ellipse_at_center,rgba(3,8,20,0.68)_0%,rgba(3,8,20,0.38)_48%,transparent_78%)]"
          />
          <div className="relative w-full lg:w-[220px]">
            <p className="ca-eyebrow mb-6">At a glance</p>
            <ul className="flex flex-col gap-8">
              {glance.map((item) => (
                <li key={item.value}>
                  <span
                    aria-hidden="true"
                    className="block h-px w-[50%] bg-[var(--ca-line)]"
                  />
                    <p className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.01em] text-[var(--ca-text)]">
                    {item.value === '5–10 min' ? (
                      <>
                        5–10 <span className="text-[1rem] font-medium tracking-normal">min</span>
                      </>
                    ) : item.value === '30 min' ? (
                      <>
                        30 <span className="text-[1rem] font-medium tracking-normal">min</span>
                      </>
                    ) : (
                      item.value
                    )}
                  </p>
                  <p className="mt-2 max-w-[93%] text-base font-normal leading-[1.5] text-[var(--ca-text-2)]">
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
