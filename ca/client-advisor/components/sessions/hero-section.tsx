'use client'

import { useTranslation } from '@i18n/use-translation'

export function HeroSection() {
  const { t, ta } = useTranslation()
  const scope = ta('ca.hero.scopeItems')
  const glance = [
    { value: t('ca.hero.glance1Value'), label: t('ca.hero.glance1Label'), kind: '5-10' as const },
    { value: t('ca.hero.glance2Value'), label: t('ca.hero.glance2Label'), kind: 'plain' as const },
    { value: t('ca.hero.glance3Value'), label: t('ca.hero.glance3Label'), kind: '30' as const },
  ]

  return (
    <section
      aria-labelledby="hero-heading"
      className="ca-s01 relative overflow-x-clip bg-[var(--ca-bg)] font-display text-[var(--ca-text)] lg:bg-transparent"
    >
      <div className="ca-s01-photo pointer-events-none absolute inset-0 hidden lg:block">
        <div className="ca-s01-photo-shift">
          <video
            className="ca-s01-video h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
          >
            <source src="/assets/videos/client-advisory/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div aria-hidden="true" className="ca-s01-photo-fade pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden lg:block" />

      <div className="ca-s01-grid relative z-10 mx-auto grid w-full max-w-[1520px] grid-cols-1 items-start gap-12 px-6 pt-20 md:px-10 md:pt-24 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-stretch lg:gap-8 lg:pb-12 lg:pt-[6.75rem]">
        <div className="flex flex-col pb-16 lg:max-w-[42rem] lg:pb-0">
          <div>
            <p className="ca-eyebrow">
              <span className="ca-eyebrow-index">01</span>
              <span aria-hidden="true" className="ca-eyebrow-rule" />
              <span>{t('ca.hero.eyebrow')}</span>
            </p>

            <h1
              id="hero-heading"
              className="ca-h1 mt-[var(--ca-heading-gap)]"
            >
              {t('ca.hero.title1')}
              <br />
              {t('ca.hero.title2')}
            </h1>

            <p className="mt-8 max-w-[38rem] text-[1.125rem] font-normal leading-[1.5] text-[var(--ca-text-2)] lg:text-[1.25rem]">
              {t('ca.hero.body')}
            </p>
          </div>

          <dl className="mt-10 flex flex-col gap-4 lg:mt-auto lg:pt-16">
            <div>
              <dt className="text-[0.9375rem] font-normal leading-[1.5] text-[var(--ca-text-2)]">
                {t('ca.hero.role')}
              </dt>
              <dd className="mt-1 text-[1.0625rem] font-medium leading-[1.5] text-[var(--ca-text)]">
                {t('ca.hero.roleValue')}
              </dd>
            </div>
            <div>
              <dt className="text-[0.9375rem] font-normal leading-[1.5] text-[var(--ca-text-2)]">
                {t('ca.hero.scope')}
              </dt>
              <dd>
                <ul className="ca-s01-scope mt-3 flex flex-wrap gap-3">
                  {scope.map((item) => (
                    <li
                      key={item}
                      className="whitespace-nowrap rounded-full border border-[var(--ca-accent)]/35 bg-navy-900/60 px-5 py-2 text-sm font-normal leading-[1.5] text-[var(--ca-text)] backdrop-blur-sm"
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
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            aria-hidden="true"
          >
            <source src="/assets/videos/client-advisory/hero.mp4" type="video/mp4" />
          </video>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,var(--ca-bg)_0%,transparent_30%,transparent_70%,var(--ca-bg)_100%)]"
          />
        </div>

        <aside
          aria-label={t('ca.hero.glance')}
          className="relative flex items-end pb-16 lg:w-[220px] lg:justify-self-end lg:self-stretch lg:pb-0"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-8 bg-[radial-gradient(ellipse_at_center,rgba(3,8,20,0.5)_0%,rgba(3,8,20,0.22)_52%,transparent_78%)]"
          />
          <div className="relative w-full lg:w-[220px]">
            <p className="ca-eyebrow mb-6">{t('ca.hero.glance')}</p>
            <ul className="flex flex-col gap-8">
              {glance.map((item) => (
                <li key={item.label}>
                  <p className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.01em] text-[var(--ca-text)]">
                    {item.kind === '5-10' ? (
                      <>
                        5–10 <span className="text-[1rem] font-medium tracking-normal">min</span>
                      </>
                    ) : item.kind === '30' ? (
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
