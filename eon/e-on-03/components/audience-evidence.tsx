'use client'

import { useEffect, useRef, useState } from 'react'
import { watchState } from '../../e-on-09/lib/motion/observe-once'
import { useTranslation } from '@i18n/use-translation'

/*
 * Audience evidence: clean photo + HTML overlay (ring, stat, three segment cards,
 * handwritten note).
 *
 * ≥640px: everything sits on the photo at the positions of the former baked-in JPG,
 *         sized in container units so the composition scales like the old image.
 * <640px: ring + stat stay on the photo; the note and the three cards move below it
 *         at readable sizes (title 14px, quote 13px).
 *
 * Motion (plays once; reduced motion — at load or switched on later — shows the end state):
 *   1. section ~35% in view → ring 0 → 66.7% with the number (1.0s), photo push-in 1 → 1.04
 *   2. when the ring is done (and, on mobile, the card list is in view) → cards one by one
 *      (desktop slide from the left, mobile rise from below), inside each card icon → title → quote
 *   3. after the third card settles → handwritten note
 * Only transform/opacity animate, except the SVG ring stroke and the number text.
 */

const STAT = 66.7
const RING_MS = 1000
const CARD_LEAD_MS = 50 // cards may start this much before the ring lands
const RING_R = 42
const RING_C = 2 * Math.PI * RING_R
const REDUCE = '(prefers-reduced-motion: reduce)'

const SEGMENTS = [
  { icon: 'ri-home-4-line', tone: 'bg-lavender' },
  { icon: 'ri-leaf-line', tone: 'bg-mint' },
  { icon: 'ri-file-list-3-line', tone: 'bg-[#b9d4ff]' },
] as const

const CARD_STAGGER_MS = 110
const CARD_MS = 400
const NOTE_DELAY_MS = (SEGMENTS.length - 1) * CARD_STAGGER_MS + CARD_MS

// ssr = server render before hydration: CSS hides the start state when JS will animate,
// and shows the final composition when JS is off or reduced motion is on.
type Phase = 'ssr' | 'static' | 'out' | 'in'

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` })

export function AudienceEvidence({ alt }: { alt: string }) {
  const { t, lang } = useTranslation()
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  // static = final composition (reduced motion). out = armed, waiting. in = playing/played.
  const [ring, setRing] = useState<Phase>('ssr')
  const [cards, setCards] = useState<Phase>('ssr')
  const [stat, setStat] = useState(STAT)
  const [ringDone, setRingDone] = useState(false)
  const [listInView, setListInView] = useState(false)

  // Arm, then start watching only after the hidden frame has been painted, so a section that
  // is already in view at load still animates from its start state instead of skipping it.
  useEffect(() => {
    const root = rootRef.current
    const list = listRef.current
    if (!root || !list) return
    const mq = window.matchMedia(REDUCE)
    if (mq.matches) {
      setRing('static')
      setCards('static')
      return
    }

    let stopRoot = () => {}
    let stopList = () => {}
    let raf1 = 0
    let raf2 = 0

    setRing('out')
    setCards('out')
    setStat(0)
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        stopRoot = watchState(root, (hit) => hit && setRing('in'), 0.35)
        stopList = watchState(list, (hit) => hit && setListInView(true), 0.2)
      })
    })

    // Reduced motion switched on mid-visit: jump to the end state and stop everything.
    const onChange = () => {
      if (!mq.matches) return
      stopRoot()
      stopList()
      setRing('static')
      setCards('static')
      setStat(STAT)
    }
    mq.addEventListener('change', onChange)

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      stopRoot()
      stopList()
      mq.removeEventListener('change', onChange)
    }
  }, [])

  // Ring + number.
  useEffect(() => {
    if (ring !== 'in') return
    let raf = 0
    let lead = 0
    const origin = performance.now()
    const frame = (now: number) => {
      const p = Math.min((now - origin) / RING_MS, 1)
      setStat(p >= 1 ? STAT : Math.round(STAT * easeOutCubic(p) * 10) / 10)
      if (p < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    lead = window.setTimeout(() => setRingDone(true), RING_MS - CARD_LEAD_MS)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(lead)
    }
  }, [ring])

  // Cards wait for the ring; on mobile they also wait until the list is on screen.
  useEffect(() => {
    if (cards === 'out' && ringDone && listInView) setCards('in')
  }, [cards, ringDone, listInView])

  const progress = stat / 100
  const statText =
    lang === 'de'
      ? `${stat.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`
      : `${stat.toFixed(1)}%`

  return (
    <div
      ref={rootRef}
      data-ring={ring}
      data-cards={cards}
      className="aud-ev relative z-10 w-full [container-type:inline-size]"
    >
      {/* Photo box — clips the push-in; the frame itself never scales. */}
      <div className="relative aspect-[7/5] w-full overflow-hidden rounded-[28px] border border-slide-line/60 bg-slide-bg shadow-[0_16px_40px_rgba(5,20,30,0.2)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/eon/audience-photo-clean.webp"
          alt={alt}
          loading="lazy"
          className="aud-ev-photo absolute inset-0 h-full w-full object-cover"
        />
        {/* Soft left shade so the desktop cards read on the bright foliage. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-black/45 via-black/20 to-transparent sm:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-black/35 to-transparent sm:hidden"
        />

        {/* Ring + number */}
        <div aria-hidden="true" className="absolute left-[7%] top-[7%] flex items-center gap-[max(10px,3.2cqw)] text-white">
          <svg viewBox="0 0 100 100" className="size-[max(52px,10.5cqw)] -rotate-90">
            <circle cx="50" cy="50" r={RING_R} fill="none" stroke="rgb(255 255 255 / 0.22)" strokeWidth="13" />
            <circle
              cx="50"
              cy="50"
              r={RING_R}
              fill="none"
              stroke="var(--mint)"
              className="aud-ev-progress"
              strokeWidth="13"
              strokeLinecap="round"
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C * (1 - progress)}
            />
          </svg>
          <div>
            <p className="text-[max(22px,4.4cqw)] font-bold leading-none tracking-[-0.02em] tabular-nums aud-ev-stat">{statText}</p>
            <p
              className="aud-ev-ring-fade mt-[max(4px,1cqw)] max-w-[max(110px,18cqw)] text-[max(12px,2cqw)] leading-[1.3] text-white/90"
              style={d(250)}
            >
              {t('eon.audience.evidence.statLabel')}
            </p>
          </div>
        </div>
      </div>

      {/* Handwritten note: on the photo (≥640) or first row under it (<640). */}
      <div
        aria-hidden="true"
        className="aud-ev-fade mt-5 text-white sm:absolute sm:right-[2%] sm:top-[25%] sm:mt-0 sm:w-[27%] sm:text-right"
        style={{ ...d(NOTE_DELAY_MS), ['--dur' as string]: '600ms' }}
      >
        <p
          className={`inline-block -rotate-[4deg] font-hand text-[22px] leading-[1.15] sm:-rotate-[7deg] sm:whitespace-nowrap sm:text-left sm:drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)] ${
            lang === 'de' ? 'sm:text-[2.9cqw]' : 'sm:text-[3.3cqw]'
          }`}
        >
          {t('eon.audience.evidence.hand1')}
          <span className="sm:hidden"> </span>
          <br className="hidden sm:inline" />
          {t('eon.audience.evidence.hand2')}
        </p>
        <svg viewBox="0 0 100 80" className="ml-auto mr-[18%] mt-[0.5cqw] hidden w-[38%] overflow-visible sm:block" fill="none">
          <path d="M78 4 C 84 32, 62 58, 12 66" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M24 56 L 11 66 L 26 74" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Segment cards: over the photo (≥640) or stacked under it (<640). */}
      <ul
        ref={listRef}
        aria-hidden="true"
        className="mt-4 flex flex-col gap-3 text-white sm:absolute sm:left-[3.6%] sm:top-[30%] sm:mt-0 sm:w-[37.5%] sm:gap-[1.6cqw]"
      >
        {SEGMENTS.map((seg, i) => {
          const base = i * CARD_STAGGER_MS
          return (
            <li
              key={seg.icon}
              className="aud-ev-card flex items-center gap-4 rounded-2xl border border-white/12 bg-[rgb(16_18_22/0.82)] px-4 py-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.25)] sm:min-h-[13.6cqw] sm:gap-[2.4cqw] sm:rounded-[2.4cqw] sm:px-[2.2cqw] sm:py-[1.8cqw] sm:shadow-[0_1cqw_3cqw_rgba(0,0,0,0.25)]"
              style={d(base)}
            >
              <span
                aria-hidden="true"
                className={`aud-ev-fade flex size-12 shrink-0 items-center justify-center rounded-full text-[#07151f] sm:size-[8.4cqw] ${seg.tone}`}
                style={d(base + 90)}
              >
                <i className={`${seg.icon} text-[24px] leading-none sm:text-[3.6cqw]`} />
              </span>
              <span className="min-w-0">
                <span
                  className="aud-ev-fade block text-[14px] font-semibold leading-[1.3] sm:text-[1.8cqw]"
                  style={d(base + 180)}
                >
                  {t(`eon.audience.evidence.segments.${i}.title`)}
                </span>
                <span
                  className="aud-ev-fade mt-1 block text-[13px] leading-[1.35] text-white/75 sm:mt-[0.6cqw] sm:text-[1.65cqw]"
                  style={d(base + 270)}
                >
                  {t(`eon.audience.evidence.segments.${i}.quote`)}
                </span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
