'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useSiteLanguage } from '@header/lib/language'

const IMG = '/assets/images/lab/weather-aquarium'

// The screen is laid out in the 2322×1682 coordinate space of SCREEN_2X (scene 0–1376,
// weather panel below) and projected onto the 2048×1440 device photo by the homography
// from OUTBOX/WA_SEASON_IPAD_KEYFRAMES_1106_B/H.npy (SIFT + RANSAC, 1638 inliers).
// CSS matrix3d is column-major: (a, d, 0, g, b, e, 0, h, 0, 0, 1, 0, c, f, 0, 1).
const DEVICE_W = 2048
const SCREEN_MATRIX =
  'matrix3d(0.537615547, -0.0304249932, 0, -0.0000546814024, -0.0404494118, 0.630190862, 0, -0.0000109936565, 0, 0, 1, 0, 359.299902, 173.836337, 0, 1)'

const SEASONS = ['spring', 'summer', 'autumn', 'winter'] as const
type Season = (typeof SEASONS)[number]
const DEFAULT: Season = 'autumn'

// The dots sit outside the projected screen so they keep a fixed CSS size. They are anchored
// by their bottom centre to the bottom centre of the B-frame capsule, (1161, 1346) in screen
// space (30px above the weather panel), pushed through the matrix above: (1007.93, 1070.56)
// on the 2048×1440 device photo. Anchoring the bottom keeps them off the panel at any width.
const DOTS_LEFT = '49.2153%'
const DOTS_TOP = '74.3441%'

// Copy: UX 文案 300924d1 (EN / DE).
const COPY = {
  en: {
    group: 'Choose a season',
    labels: { spring: 'Spring', summer: 'Summer', autumn: 'Autumn', winter: 'Winter' },
    alt: {
      spring: 'An iPad turned to the left, showing the Weather Aquarium app in spring: cherry blossom and tulips, a girl and her cat by the Lindt shop in Kilchberg, two swans on the lake and the weather panel below',
      summer: 'An iPad turned to the left, showing the Weather Aquarium app in summer: green trees and flowers, a girl and her cat by the Lindt shop in Kilchberg, two swans on the lake and the weather panel below',
      autumn: 'An iPad turned to the left, showing the Weather Aquarium app in autumn: golden leaves, a girl and her cat by the Lindt shop in Kilchberg, two swans on the lake and the weather panel below',
      winter: 'An iPad turned to the left, showing the Weather Aquarium app in winter: snow on the roofs and trees, a girl and her cat by the Lindt shop in Kilchberg, two swans on the lake and the weather panel below',
    },
  },
  de: {
    group: 'Jahreszeit wählen',
    labels: { spring: 'Frühling', summer: 'Sommer', autumn: 'Herbst', winter: 'Winter' },
    alt: {
      spring: 'Ein nach links gedrehtes iPad mit der App Weather Aquarium im Frühling: Kirschblüten und Tulpen, ein Mädchen mit ihrer Katze vor dem Lindt-Laden in Kilchberg, zwei Schwäne auf dem See und darunter die Wetteranzeige',
      summer: 'Ein nach links gedrehtes iPad mit der App Weather Aquarium im Sommer: grüne Bäume und Blumen, ein Mädchen mit ihrer Katze vor dem Lindt-Laden in Kilchberg, zwei Schwäne auf dem See und darunter die Wetteranzeige',
      autumn: 'Ein nach links gedrehtes iPad mit der App Weather Aquarium im Herbst: goldenes Laub, ein Mädchen mit ihrer Katze vor dem Lindt-Laden in Kilchberg, zwei Schwäne auf dem See und darunter die Wetteranzeige',
      winter: 'Ein nach links gedrehtes iPad mit der App Weather Aquarium im Winter: Schnee auf Dächern und Bäumen, ein Mädchen mit ihrer Katze vor dem Lindt-Laden in Kilchberg, zwei Schwäne auf dem See und darunter die Wetteranzeige',
    },
  },
} as const

export const HeroSeasons = forwardRef<HTMLDivElement>(function HeroSeasons(_, ref) {
  const device = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => device.current as HTMLDivElement)
  const { langCode } = useSiteLanguage()
  const copy = COPY[langCode]
  const [active, setActive] = useState<Season>(DEFAULT)
  // Each newly chosen season is stacked above everything still on screen and wiped in;
  // once its wipe ends, the layers underneath are hidden. Clicking mid-wipe just stacks
  // another layer on top, so nothing jumps.
  const [stack, setStack] = useState<Season[]>([DEFAULT])
  const [wiping, setWiping] = useState<Season[]>([])

  useEffect(() => {
    const element = device.current
    if (!element) return
    const resize = () => element.style.setProperty('--k', String(element.offsetWidth / DEVICE_W))
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const choose = (season: Season) => {
    if (season === active) return
    setActive(season)
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setWiping([])
      setStack([season])
      return
    }
    // A layer that is still wiping keeps its mask (and finishes) under the new one.
    setWiping((current) => [...current.filter((s) => s !== season), season])
    setStack((current) => [...current.filter((s) => s !== season), season])
  }

  return (
    <div className="hero-device" ref={device}>
      <img
        className="hero-device-base"
        src={`${IMG}/hero-device-seasons-base.webp`}
        // Switches to the new season on click, without waiting for the wipe (UX 文案 300924d1).
        alt={copy.alt[active]}
        fetchPriority="high"
        draggable={false}
      />
      <div className="hero-screen" style={{ transform: `scale(var(--k, ${840 / DEVICE_W})) ${SCREEN_MATRIX}` }}>
        {SEASONS.map((season) => {
          const depth = stack.indexOf(season)
          return (
            <div
              key={season}
              className="hero-season"
              data-shown={depth >= 0}
              data-wipe={wiping.includes(season)}
              style={{ zIndex: depth + 1 }}
              aria-hidden="true"
              onAnimationEnd={(event) => {
                if (event.target !== event.currentTarget) return
                if (stack[stack.length - 1] !== season) return
                setWiping([])
                setStack([season])
              }}
            >
              {/* All seasons load up front (low priority) so a wipe never reveals an empty frame. */}
              <img
                className="hero-season-scene"
                src={`${IMG}/hero-season-${season}.webp`}
                alt=""
                fetchPriority={season === DEFAULT ? 'high' : 'low'}
                draggable={false}
              />
              <img className="hero-season-panel" src={`${IMG}/hero-panel-${season}.webp`} alt="" draggable={false} />
            </div>
          )
        })}
        {SEASONS.map((season) => (
          <img
            key={season}
            className="hero-pill"
            data-shown={season === active}
            src={`${IMG}/hero-pill-${season}.png`}
            alt=""
            draggable={false}
          />
        ))}
      </div>
      <div className="hero-dots" role="group" aria-label={copy.group} style={{ left: DOTS_LEFT, top: DOTS_TOP }}>
        {SEASONS.map((season) => (
          <button
            key={season}
            type="button"
            className="hero-dot"
            aria-label={copy.labels[season]}
            aria-pressed={season === active}
            onClick={() => choose(season)}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  )
})
