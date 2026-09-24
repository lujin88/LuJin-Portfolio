'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styles from './session-04-the-shift.module.css'
import { watchClass } from '@/lib/observe-once'
import { useTranslation } from '@i18n/use-translation'

function SignalIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" />
      <circle cx="20" cy="20" r="6" />
      <circle cx="20" cy="20" r="1.6" fill="currentColor" stroke="none" />
      <path d="M20 8v3M20 29v3M8 20h3M29 20h3" strokeLinecap="round" />
    </svg>
  )
}

function ContextIcon() {
  return (
    <svg viewBox="0 0 52 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="19" cy="20" r="18.5" />
      <circle cx="33" cy="20" r="18.5" />
    </svg>
  )
}

function ActIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" />
      <path d="M13 20h13M21 14.5l5.5 5.5-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type PointId = 'signal' | 'context' | 'act'

type WavePoint = {
  x: number
  y: number
  id?: PointId
}

/**
 * Percent of the section. Signal, Context, and Act are the nodes the wave
 * must pass through. The same numbers position each point's glow.
 */
const WAVE: WavePoint[] = [
  { x: -2, y: 18 },
  { x: 14, y: 15 },
  { x: 30, y: 14.5 },
  { x: 40, y: 16 },
  { x: 45, y: 24 },
  { x: 47.6, y: 33 },
  { x: 49.4, y: 40.5, id: 'signal' },
  { x: 53.2, y: 54 },
  { x: 57.6, y: 59.5 },
  { x: 62.2, y: 52 },
  { x: 65.4, y: 45.5 },
  { x: 67.6, y: 41.6, id: 'context' },
  { x: 71.4, y: 40.8 },
  { x: 75.2, y: 46.5 },
  { x: 78.2, y: 53 },
  { x: 81.2, y: 59.8, id: 'act' },
  { x: 86.5, y: 71 },
  { x: 93, y: 83 },
  { x: 102, y: 96 },
]

const conceptMeta: Array<{
  id: PointId
  icon: React.ReactNode
  className: string
}> = [
  {
    id: 'signal',
    icon: <SignalIcon />,
    className: styles.pointSignal,
  },
  {
    id: 'context',
    icon: <ContextIcon />,
    className: styles.pointContext,
  },
  {
    id: 'act',
    icon: <ActIcon />,
    className: styles.pointAct,
  },
]

function anchor(id: PointId) {
  const point = WAVE.find((entry) => entry.id === id)
  if (!point) throw new Error(`Missing wave anchor: ${id}`)
  return point
}

function toPixels(width: number, height: number) {
  return WAVE.map((point) => ({
    x: (point.x / 100) * width,
    y: (point.y / 100) * height,
    id: point.id,
  }))
}

/** Catmull-Rom segment. Neighbors outside [start, end] keep the join smooth. */
function segmentPath(
  points: Array<{ x: number; y: number }>,
  start: number,
  end: number,
) {
  const fmt = (value: number) => value.toFixed(2)
  const commands = [`M ${fmt(points[start].x)} ${fmt(points[start].y)}`]

  for (let index = start; index < end; index += 1) {
    const p0 = points[Math.max(0, index - 1)]
    const p1 = points[index]
    const p2 = points[index + 1]
    const p3 = points[Math.min(points.length - 1, index + 2)]
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    commands.push(
      `C ${fmt(c1x)} ${fmt(c1y)}, ${fmt(c2x)} ${fmt(c2y)}, ${fmt(p2.x)} ${fmt(p2.y)}`,
    )
  }

  return commands.join(' ')
}

function buildWave(width: number, height: number) {
  const points = toPixels(width, height)
  const signal = points.findIndex((point) => point.id === 'signal')
  const context = points.findIndex((point) => point.id === 'context')
  const act = points.findIndex((point) => point.id === 'act')
  const last = points.length - 1

  return {
    signal: segmentPath(points, 0, signal),
    context: segmentPath(points, signal, context),
    act: segmentPath(points, context, last),
    full: segmentPath(points, 0, last),
  }
}

export function Session04TheShift() {
  const { t } = useTranslation()
  const concepts = conceptMeta.map((item) => ({
    ...item,
    title: t(`ca.shift.${item.id}`),
    question: t(`ca.shift.${item.id}Q`),
  }))
  const sectionRef = useRef<HTMLElement>(null)
  const [frame, setFrame] = useState({ w: 1440, h: 680 })

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const measure = () => {
      const { width, height } = section.getBoundingClientRect()
      if (width < 1 || height < 1) return
      setFrame((current) =>
        Math.abs(current.w - width) < 0.5 && Math.abs(current.h - height) < 0.5
          ? current
          : { w: width, h: height },
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const revealEls = Array.from(
      section.querySelectorAll<HTMLElement>(`.${styles.reveal}`),
    )

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionMq.matches || typeof IntersectionObserver === 'undefined') {
      revealEls.forEach((el) => el.classList.add(styles.isVisible))
      return
    }

    const stops: Array<() => void> = []
    for (let i = 0; i < revealEls.length; i++) {
      stops.push(watchClass(revealEls[i], styles.isVisible, 0.15))
    }

    return () => {
      for (let i = 0; i < stops.length; i++) stops[i]()
    }
  }, [])

  const wave = useMemo(() => buildWave(frame.w, frame.h), [frame.w, frame.h])
  const segments: PointId[] = ['signal', 'context', 'act']

  return (
    <section
      ref={sectionRef}
      id="session-04"
      aria-labelledby="session-04-heading"
      className={`${styles.section} font-[family-name:var(--font-poppins)]`}
    >
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.atmos} aria-hidden="true" />

      <div className={styles.field} aria-hidden="true">
        <svg viewBox={`0 0 ${frame.w} ${frame.h}`} preserveAspectRatio="none">
          <defs>
            <linearGradient
              id="s04-shiftBeam"
              gradientUnits="userSpaceOnUse"
              x1={0}
              y1={frame.h * 0.08}
              x2={frame.w}
              y2={frame.h * 0.72}
            >
              <stop offset="0" stopColor="#6a8cdf" stopOpacity="0.06" />
              <stop offset="0.18" stopColor="#7ba6f2" stopOpacity="0.55" />
              <stop offset="0.42" stopColor="#a8d0ff" stopOpacity="0.95" />
              <stop offset="0.64" stopColor="#9dbaf7" stopOpacity="0.78" />
              <stop offset="0.84" stopColor="#8eb4f8" stopOpacity="0.4" />
              <stop offset="1" stopColor="#7f9ef0" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path className={styles.beamBloom} vectorEffect="non-scaling-stroke" d={wave.full} />
          <g className={styles.beam} data-beam="shift">
            {segments.map((id) => (
              <g key={id} className={styles.beamSegment} data-segment={id}>
                <path className={styles.beamHalo} vectorEffect="non-scaling-stroke" d={wave[id]} />
                <path
                  className={styles.beamLine}
                  stroke="url(#s04-shiftBeam)"
                  vectorEffect="non-scaling-stroke"
                  d={wave[id]}
                />
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className={styles.inner}>
        <p className={`${styles.reveal} ca-eyebrow`} data-delay="1">
          <span className="ca-eyebrow-index">04</span>
          <span className="ca-eyebrow-rule" aria-hidden="true" />
          <span>{t('ca.shift.eyebrow')}</span>
        </p>

        <div className={styles.copy}>
          <h2
            id="session-04-heading"
            className={`${styles.reveal} ${styles.headline}`}
            data-delay="1"
          >
            {t('ca.shift.headline1')} <br />
            {t('ca.shift.headline2')}
          </h2>
          <p className={`${styles.reveal} ${styles.body}`} data-delay="2">
            {t('ca.shift.bodyLead')}
            <br />
            {t('ca.shift.bodyInstead')}
            <br />
            {t('ca.shift.bodyOld')}
            <br />
            {t('ca.shift.bodyWeAsked')}
            <br />
            <strong className={styles.bodyStrong}>
              {t('ca.shift.bodyAsk1')}
              <br />
              {t('ca.shift.bodyAsk2')}
              <br />
              {t('ca.shift.bodyAsk3')}
            </strong>
          </p>
          <p className={`${styles.reveal} ${styles.closing}`} data-delay="3">
            {t('ca.shift.closing1')}
            <br />
            {t('ca.shift.closing2')}
          </p>
        </div>
      </div>

      <ul className={`${styles.reveal} ${styles.stage}`} data-delay="2">
        {concepts.map((concept) => {
          const point = anchor(concept.id)
          return (
            <li
              key={concept.id}
              className={`${styles.point} ${concept.className}`}
              data-point={concept.id}
              style={
                {
                  '--x': `${point.x}%`,
                  '--y': `${point.y}%`,
                } as React.CSSProperties
              }
            >
              <span className={styles.node} data-node={concept.id} aria-hidden="true" />
              <div className={styles.pointBody}>
                <span className={`${styles.icon} ${concept.id === 'context' ? styles.iconWide : ''}`}>
                  {concept.icon}
                </span>
                <span className={styles.pointTitle}>{concept.title}</span>
                <span className={styles.pointQuestion}>{concept.question}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
