'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { watchState } from '@/lib/observe-once'
import { ProcessJourney } from './process-journey'
import { TiltCard } from './tilt-card'
import { OutcomeLine } from './outcome-line'
import { ScrollReveal } from '@/components/motion/scroll-reveal'
import { useTranslation } from '@i18n/use-translation'

// Scoped palette for this session only — keeps the section self-contained.
const tokens = {
  '--ca-card': '#071224',
  '--ca-line': 'rgb(169 184 204 / 0.22)',
  '--ca-line-strong': 'rgb(47 124 255 / 0.45)',
  '--ca-accent': '#2f7cff',
  '--ca-accent-soft': '#7cc0ff',
  '--ca-muted': '#a9b8cc',
  '--ca-dim': '#71839a',
} as CSSProperties

export function Session07Outcome() {
  return (
    <section
      id="session-07"
      aria-labelledby="session-07-title"
      style={tokens}
      className="relative isolate flex min-h-svh w-full flex-col justify-center overflow-hidden bg-[var(--ca-bg)] font-sans text-[var(--ca-text)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(61,139,255,0.10),transparent_60%)] [-webkit-mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.5)_25%,#000_60%)] [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.5)_25%,#000_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,transparent_0%,var(--ca-bg)_100%)]"
      />

      <div className="relative mx-auto flex h-auto w-full max-w-[1440px] flex-col gap-12 overflow-visible px-[var(--content-inset,24px)] py-24 max-sm:pt-[34px] lg:mx-0 lg:max-w-none lg:py-28 xl:flex-row xl:items-center xl:gap-20">
        <Editorial />
        <Outcomes />
      </div>
    </section>
  )
}

function Editorial() {
  const { t } = useTranslation()
  return (
    <div className="flex w-full max-w-[560px] shrink-0 flex-col overflow-visible xl:w-[38%]">
      <ScrollReveal>
        <p className="ca-eyebrow">
          <span className="ca-eyebrow-index">07</span>
          <span aria-hidden="true" className="ca-eyebrow-rule" />
          <span>{t('ca.outcome.eyebrow')}</span>
        </p>

        <div className="flex min-w-0 w-full max-w-[46ch] flex-col">
          <h2 data-type="h2" id="session-07-title" className="ca-h2 mt-[var(--ca-heading-gap)] text-balance">
            {t('ca.outcome.title')}
          </h2>

          <p data-type="body" className="mt-[var(--ca-body-gap)] text-pretty text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]">
            {t('ca.outcome.subhead')}
          </p>

        </div>
      </ScrollReveal>

      <div className="mt-8 w-full min-w-0 overflow-visible">
        <ProcessJourney />
      </div>
    </div>
  )
}

function Outcomes() {
  const { t } = useTranslation()
  const metrics = [
    { value: t('ca.outcome.m1Value'), label: t('ca.outcome.m1Label'), image: '/assets/images/client-advisory/sessions/07/card-01.webp', imageAlt: t('ca.outcome.m1Alt') },
    { value: t('ca.outcome.m2Value'), label: t('ca.outcome.m2Label'), image: '/assets/images/client-advisory/sessions/07/card-02.webp', imageAlt: t('ca.outcome.m2Alt') },
    { value: t('ca.outcome.m3Value'), label: t('ca.outcome.m3Label'), eyebrow: t('ca.outcome.reach'), image: '/assets/images/client-advisory/sessions/07/card-03.webp', imageAlt: t('ca.outcome.m3Alt') },
  ]
  return (
    <div className="flex h-auto w-full flex-col gap-5 overflow-visible xl:w-[62%]">
      <p className="sr-only">{t('ca.outcome.avgFeedback')}</p>

      <div className="grid h-auto grid-cols-1 gap-4 overflow-visible md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.image} index={index} {...metric} />
        ))}
      </div>
    </div>
  )
}

// Card rises in, artwork follows, then every number in the value counts up from 0.
// Each card watches itself, so on one column (390) a card plays when it is reached.
const STAGGER_MS = 160
const COUNT_DELAY_MS = 250
const COUNT_MS = 1400
// Hover devices: the animation plays only while the pointer is on the card, 1.6x faster, no stagger.
const HOVER_RATE = 1.6

function useReveal<T extends Element>() {
  const ref = useRef<T>(null)
  const [state, setState] = useState<'idle' | 'play' | 'static'>('idle')
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) {
      setState('static')
      return
    }
    // Re-read at trigger time: reduced motion may have been switched on since load.
    return watchState(node, () => setState(reduced.matches ? 'static' : 'play'), 0.3)
  }, [])
  return [ref, state] as const
}

function CountUp({ text, play, delay, run, rate }: { text: string; play: boolean; delay: number; run: number; rate: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!play || !node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) {
      // The previous run's cleanup wrote the old text; write the current one.
      node.textContent = text
      return
    }
    const parts = text.split(/(\d+)/)
    const render = (k: number) => {
      node.textContent = parts.map((part, i) => (i % 2 ? String(Math.round(Number(part) * k)) : part)).join('')
    }
    render(0)
    let frame = 0
    const start = performance.now() + delay
    const tick = (now: number) => {
      // Reduced motion switched on mid-count: jump to the final value.
      if (reduced.matches) {
        node.textContent = text
        return
      }
      const k = Math.min(1, Math.max(0, (now - start) / (COUNT_MS / rate)))
      render(1 - Math.pow(1 - k, 3))
      if (k < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      node.textContent = text
    }
  }, [text, play, delay, run, rate])
  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {text}
      </span>
    </>
  )
}

// Card 1: the curve video plays once and holds its last frame (no loop). `run` counts plays:
// on hover devices each hover restarts it; on touch it plays once when the card is reached.
// Before the first play it rests on the finished still; reduced motion shows the full still.
function CurveArt({ state, run, delay, rate, image, imageAlt }: { state: 'idle' | 'play' | 'static'; run: number; delay: number; rate: number; image: string; imageAlt: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  // Autoplay refused (low-power mode) or the file failed to load: show the still, never an empty card.
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (state !== 'play' || !node) return
    const timer = window.setTimeout(() => {
      node.currentTime = 0
      node.playbackRate = rate
      node.play().catch(() => setFailed(true))
    }, delay)
    return () => window.clearTimeout(timer)
  }, [state, run, delay, rate])
  if (state === 'static' || failed) {
    return (
      <div className="ca-outcome-art absolute inset-x-0 -bottom-[6%] h-[62%] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.5)_30%,#000_58%)]">
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw" className="object-cover object-bottom" />
      </div>
    )
  }
  return (
    <div className="ca-outcome-art absolute inset-x-0 -bottom-[6%] h-[62%] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.5)_30%,#000_58%)]">
    <video
      ref={ref}
      role="img"
      aria-label={imageAlt}
      className="size-full object-cover object-bottom"
      src="/assets/videos/client-advisory/ca07-card-01-curve.mp4#t=0.001"
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      onError={() => setFailed(true)}
    />
    {/* Before the first play the card shows the finished still, never a dark or empty card. */}
    {run === 0 ? <Image src={image} alt="" aria-hidden="true" fill sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw" className="object-cover object-bottom" /> : null}
    </div>
  )
}

// Card 2: stacked glass plates entry (Lu #23649: bottom-to-top, settles at layer 3 and stops)
function StackArt({ state, run, delay, rate, image, imageAlt }: { state: 'idle' | 'play' | 'static'; run: number; delay: number; rate: number; image: string; imageAlt: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (state !== 'play' || !node) return
    const timer = window.setTimeout(() => {
      node.currentTime = 0
      node.playbackRate = rate
      node.play().catch(() => setFailed(true))
    }, delay)
    return () => window.clearTimeout(timer)
  }, [state, run, delay, rate])
  if (state === 'static' || failed) {
    return (
      <div className="ca-outcome-art absolute inset-0">
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw" className="object-contain object-bottom" />
      </div>
    )
  }
  return (
    <div className="ca-outcome-art absolute inset-0">
      <video
        ref={ref}
        role="img"
        aria-label={imageAlt}
        className="size-full object-contain object-bottom"
        src="/assets/videos/client-advisory/ca07-card-02-layers.mp4#t=0.001"
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onError={() => setFailed(true)}
      />
      {run === 0 ? <Image src={image} alt="" aria-hidden="true" fill sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw" className="object-contain object-bottom" /> : null}
    </div>
  )
}

type MetricCardProps = {
  index: number
  value: string
  label: string
  eyebrow?: string
  image: string
  imageAlt: string
}

function MetricCard({ index, value, label, eyebrow, image, imageAlt }: MetricCardProps) {
  const [ref, reveal] = useReveal<HTMLDivElement>()
  const [wide, setWide] = useState(false)
  // null until measured. Hover devices play on hover; touch devices play once when reached.
  const [hoverable, setHoverable] = useState<boolean | null>(null)
  const [run, setRun] = useState(0)
  useEffect(() => {
    setWide(window.matchMedia('(min-width: 768px)').matches)
    setHoverable(window.matchMedia('(hover: hover)').matches)
  }, [])
  useEffect(() => {
    if (hoverable === false && reveal === 'play') setRun(1)
  }, [hoverable, reveal])
  // Reduced motion can be switched on while the page is open: stop at once and show the still.
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  // Scroll reveal (rise-in) follows `reveal`; the animation inside follows `anim`.
  const anim: 'idle' | 'play' | 'static' = reveal === 'static' || reduced ? 'static' : run > 0 ? 'play' : 'idle'
  const rate = hoverable ? HOVER_RATE : 1
  const delay = hoverable ? 0 : wide ? index * STAGGER_MS : 0
  const revealDelay = wide ? index * STAGGER_MS : 0
  return (
    <div
      ref={ref}
      data-outcome-state={anim}
      className={`ca-outcome-card ${reveal === 'idle' ? '' : 'is-visible'}`}
      onMouseEnter={
        hoverable
          ? () => {
              // Read the preference now, not the value from load.
              if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setRun((r) => r + 1)
            }
          : undefined
      }
      style={
        {
          '--ca-outcome-delay': `${revealDelay}ms`,
          '--ca-trace-delay': `${delay + (hoverable ? 0 : 250)}ms`,
          '--ca-trace-dur': `${Math.round((wide ? 1100 : 700) / rate)}ms`,
        } as CSSProperties
      }
    >
      <TiltCard className="relative flex aspect-[4/5] flex-col overflow-hidden rounded-xl border border-[var(--ca-line)] bg-[var(--ca-card)] shadow-[0_0_0_1px_rgba(61,139,255,0.04),0_30px_60px_-40px_rgba(61,139,255,0.35)]">
        {index === 0 ? (
          <CurveArt state={anim} run={run} delay={delay} rate={rate} image={image} imageAlt={imageAlt} />
        ) : index === 1 ? (
          <StackArt state={anim} run={run} delay={delay} rate={rate} image={image} imageAlt={imageAlt} />
        ) : (
          <div className="ca-outcome-art absolute inset-0">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
              className="object-contain object-bottom"
            />
            <OutcomeLine key={run} index={index} />
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[64%] bg-gradient-to-b from-[var(--ca-card)] via-[var(--ca-card)]/90 via-[60%] to-transparent"
        />

        <div
          className="relative flex flex-1 flex-col gap-5 p-6 transition-transform duration-500 ease-out"
          style={{ transform: 'translate3d(var(--tilt-x), var(--tilt-y), 0)' }}
        >
          {eyebrow ? <span className="sr-only">{eyebrow}</span> : null}

          <div className="flex flex-col gap-3">
            <p className="whitespace-nowrap text-[clamp(24px,2.2vw,32px)] font-medium leading-[1.1] tracking-[-0.015em]">
              <CountUp text={value} play={anim === 'play'} delay={delay + (hoverable ? 0 : COUNT_DELAY_MS)} run={run} rate={rate} />
            </p>
            <p data-type="body" className="text-pretty text-[15px] leading-[1.55] text-[var(--ca-muted)] sm:text-[16px]">{label}</p>
          </div>
        </div>
      </TiltCard>
    </div>
  )
}
