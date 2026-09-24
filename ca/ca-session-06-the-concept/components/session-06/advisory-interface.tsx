'use client'

import { useTranslation } from '@i18n/use-translation'

function Meter({ label, range }: { label: string; range: number[] }) {
  const [start, end] = range
  return (
    <div className="flex flex-col gap-[0.35em]">
      <span className="text-[0.62em] font-medium leading-none text-[#3d5a86]">{label}</span>
      <div className="relative h-px w-full bg-[#c9d5e6]">
        <span
          className="absolute -top-[2px] h-[5px] rounded-full bg-[#1e3d6d]"
          style={{ left: `${start * 100}%`, width: `${(end - start) * 100}%` }}
        />
      </div>
    </div>
  )
}

function SidebarIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex size-[1.3em] shrink-0 items-center justify-center rounded-full border border-[#2c4a78]"
    >
      <span className="size-[0.4em] rounded-full bg-[#4f7bb6]" />
    </span>
  )
}

function UbsMark() {
  return (
    <span className="flex items-center gap-[0.35em] text-[#e60000]" aria-label="UBS">
      <svg viewBox="0 0 24 24" className="size-[1.55em]" fill="currentColor" aria-hidden="true">
        <path d="M11.2 1.5h1.6l-.4 4.3 2.7-3.4 1.4.8-2.1 3.8 3.9-2 .8 1.4-3.5 2.6 4.4-.3v1.6l-4.4-.3 3.5 2.6-.8 1.4-3.9-2 2.1 3.8-1.4.8-2.7-3.4.4 4.3h-1.6l.4-4.3-2.7 3.4-1.4-.8 2.1-3.8-3.9 2-.8-1.4 3.5-2.6-4.4.3V9.9l4.4.3-3.5-2.6.8-1.4 3.9 2-2.1-3.8 1.4-.8 2.7 3.4-.4-4.3Z" />
      </svg>
      <span className="font-serif text-[1.35em] font-semibold leading-none tracking-tight">UBS</span>
    </span>
  )
}

export function AdvisoryInterface() {
  const { t } = useTranslation()
  const navItems = [
    t('ca.ui.navClients'),
    t('ca.ui.navClients'),
    t('ca.ui.navResearch'),
    t('ca.ui.navOpportunities'),
    t('ca.ui.navTools'),
  ]
  const options = [
    {
      title: t('ca.ui.option1'),
      points: [t('ca.ui.option1a'), t('ca.ui.option1b')],
      bars: { return: [0.02, 0.28], risk: [0.55, 0.9], liquidity: [0.5, 0.7] },
    },
    {
      title: t('ca.ui.option2'),
      points: [t('ca.ui.option2a'), t('ca.ui.option2b')],
      bars: { return: [0.02, 0.3], risk: [0.6, 0.85], liquidity: [0.5, 0.75] },
    },
    {
      title: t('ca.ui.option3'),
      points: [t('ca.ui.option3a'), t('ca.ui.option3b')],
      bars: { return: [0.02, 0.28], risk: [0.6, 0.85], liquidity: [0.5, 0.75] },
    },
  ]

  return (
    <div
      role="img"
      aria-label={t('ca.ui.aria')}
      className="flex aspect-[1270/640] w-full overflow-hidden rounded-[0.8em] border border-[#1d3a66]/70 bg-[#0a1c3a] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85),0_0_60px_-10px_rgba(37,99,235,0.18)]"
    >
      {/* Sidebar */}
      <aside className="flex w-[19.5%] shrink-0 flex-col gap-[2.1em] bg-gradient-to-b from-[#0c2146] to-[#071632] px-[1.3em] pt-[1.6em]">
        <UbsMark />
        <nav aria-hidden="true" className="flex flex-col gap-[1.55em]">
          {navItems.map((item, i) => (
            <span key={i} className="flex items-center gap-[0.8em] text-[0.68em] font-medium text-[#7d9cc9]">
              <SidebarIcon />
              {item}
            </span>
          ))}
        </nav>
      </aside>

      {/* Main panel */}
      <div className="m-[0.35em] flex flex-1 flex-col rounded-[0.55em] bg-[#f7f9fc] px-[2.3em] pt-[1.7em] pb-[1.9em]">
        <h3 className="text-[1.05em] font-semibold tracking-tight text-[#0b2a55]">{t('ca.ui.heading')}</h3>

        <div className="mt-[1.3em] flex border-b border-[#d5deeb] text-[0.66em]">
          <span className="border-b-[2px] border-[#e8552a] pb-[0.7em] pr-[7em] text-[#e8552a]">{t('ca.ui.tabCreate')}</span>
          <span className="pb-[0.7em] pr-[9em] text-[#5a7aa8]">{t('ca.ui.tabReview')}</span>
          <span className="pb-[0.7em] text-[#5a7aa8]">{t('ca.ui.tabSummary')}</span>
        </div>

        <p className="mt-[1.6em] text-[0.66em] text-[#7a94bd]">{t('ca.ui.selectOption')}</p>

        <div className="mt-[1.1em] grid flex-1 grid-cols-3 gap-x-[3.2em]">
          {options.map((opt, i) => (
            <div key={opt.title} className="flex flex-col">
              <div className="flex items-baseline gap-[0.5em]">
                <h4 className="text-[1.1em] font-semibold tracking-tight text-[#0b2a55]">{opt.title}</h4>
                {i === 0 && (
                  <span aria-hidden="true" className="h-[0.9em] w-[0.5em] rounded-[2px] bg-[#c9d5e6]" />
                )}
              </div>
              <ul className="mt-[0.5em] flex flex-col gap-[0.25em] text-[0.62em] leading-snug text-[#5a7aa8]">
                {opt.points.map((p, j) => (
                  <li key={p} className={j === 0 || i === 0 ? "before:mr-[0.5em] before:content-['•']" : 'pl-[0.9em]'}>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-[0.7em] pt-[1.6em]">
                <Meter label={t('ca.ui.meterReturn')} range={opt.bars.return} />
                <Meter label={t('ca.ui.meterRisk')} range={opt.bars.risk} />
                <Meter label={t('ca.ui.meterLiquidity')} range={opt.bars.liquidity} />
                <span aria-hidden="true" className="-mt-[0.35em] h-[3px] w-[0.55em] rounded-full bg-[#e8552a]" />
              </div>

              <span
                aria-hidden="true"
                className="mt-[1.1em] flex h-[2.3em] items-center justify-center rounded-[0.35em] bg-[#123a72] text-[0.66em] font-semibold text-[#e6eefc]"
              >
                {t('ca.ui.select')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
