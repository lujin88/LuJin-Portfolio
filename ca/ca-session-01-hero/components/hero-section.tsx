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
      className="relative isolate overflow-hidden bg-navy-950 font-display text-ice"
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

      <div className="relative mx-auto grid w-full max-w-[1520px] grid-cols-1 gap-12 px-6 pt-16 md:px-10 lg:min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(0,220px)] lg:gap-8 lg:px-12 lg:pt-24">
        <div className="flex flex-col pb-16 lg:max-w-[46rem] lg:pb-20">
          <p className="case-label flex items-center gap-4 text-ice-muted">
            <span className="text-ice">01</span>
            <span aria-hidden="true" className="h-4 w-px bg-ice-muted/60" />
            <span>The Overview</span>
          </p>

          <h1
            id="hero-heading"
            className="mt-5 text-[2.75rem] font-bold leading-[1.08] tracking-[-0.02em] text-white lg:text-[4.5rem] lg:leading-[1.05] lg:tracking-[-0.025em]"
          >
            Less searching.
            <br />
            More advising.
          </h1>

          <p className="mt-9 max-w-[38rem] text-[1.125rem] font-normal leading-[1.5] text-ice-muted lg:text-[1.25rem]">
            AI-powered advisory. Surfacing what matters to each client, exactly
            when it matters.
          </p>

          <dl className="mt-24 flex flex-col gap-4 lg:mt-auto lg:pt-24">
            <div>
              <dt className="text-[0.9375rem] font-normal leading-[1.5] text-ice-muted">
                My role
              </dt>
              <dd className="mt-1 text-[1.0625rem] font-medium leading-[1.5] text-white">
                Lead Service Designer
              </dd>
            </div>
            <div>
              <dt className="text-[0.9375rem] font-normal leading-[1.5] text-ice-muted">
                Scope
              </dt>
              <dd>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {scope.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-signal/60 bg-navy-900/60 px-5 py-2 text-sm font-normal leading-[1.5] text-ice backdrop-blur-sm"
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
            className="absolute inset-0 bg-[linear-gradient(180deg,#050b18_0%,transparent_30%,transparent_70%,#050b18_100%)]"
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
            <p className="case-label mb-6 text-ice-muted">At a glance</p>
            <ul className="flex flex-col gap-8">
              {glance.map((item) => (
                <li key={item.value}>
                  <span
                    aria-hidden="true"
                    className="block h-px w-[50%] bg-ice-muted/40"
                  />
                  <p className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.01em] text-white">
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
                  <p className="mt-2 max-w-[93%] text-base font-normal leading-[1.5] text-ice-muted">
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
