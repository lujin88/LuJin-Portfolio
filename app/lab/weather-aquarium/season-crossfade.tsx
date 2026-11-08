'use client'

import { useEffect, useRef, useState } from 'react'
import { useSiteLanguage } from '@header/lib/language'
import styles from './season-crossfade.module.css'

const seasons = ['spring', 'summer', 'autumn', 'winter'] as const

// Lindt scenes shared with the hero iPad (hero-seasons.tsx). Alt follows UX 文案 300924d1
// minus the iPad clause and the weather panel, which these scene-only frames do not show.
const ALT = {
  en: {
    spring: 'A spring scene from the Weather Aquarium app: cherry blossom and tulips, a girl and her cat by the Lindt shop in Kilchberg, two swans on the lake',
    summer: 'A summer scene from the Weather Aquarium app: green trees and flowers, a girl and her cat by the Lindt shop in Kilchberg, two swans on the lake',
    autumn: 'An autumn scene from the Weather Aquarium app: golden leaves, a girl and her cat by the Lindt shop in Kilchberg, two swans on the lake',
    winter: 'A winter scene from the Weather Aquarium app: snow on the roofs and trees, a girl and her cat by the Lindt shop in Kilchberg, two swans on the lake',
  },
  de: {
    spring: 'Eine Frühlingsszene aus der App Weather Aquarium: Kirschblüten und Tulpen, ein Mädchen mit ihrer Katze vor dem Lindt-Laden in Kilchberg, zwei Schwäne auf dem See',
    summer: 'Eine Sommerszene aus der App Weather Aquarium: grüne Bäume und Blumen, ein Mädchen mit ihrer Katze vor dem Lindt-Laden in Kilchberg, zwei Schwäne auf dem See',
    autumn: 'Eine Herbstszene aus der App Weather Aquarium: goldenes Laub, ein Mädchen mit ihrer Katze vor dem Lindt-Laden in Kilchberg, zwei Schwäne auf dem See',
    winter: 'Eine Winterszene aus der App Weather Aquarium: Schnee auf Dächern und Bäumen, ein Mädchen mit ihrer Katze vor dem Lindt-Laden in Kilchberg, zwei Schwäne auf dem See',
  },
} as const

export function SeasonCrossfade() {
  const { langCode } = useSiteLanguage()
  const labels = {
    en: ['Play seasons', 'Pause seasons'],
    de: ['Jahreszeiten abspielen', 'Jahreszeiten pausieren'],
  }
  const stage = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const label = labels[langCode][paused ? 0 : 1]
  const [springLoaded, setSpringLoaded] = useState(false)
  const [motionAllowed, setMotionAllowed] = useState(false)
  const decoded = useRef(new Set<number>())

  async function onFrameLoad(image: HTMLImageElement, index: number) {
    try {
      await image.decode()
      if (!image.isConnected || (index > 0 && matchMedia('(prefers-reduced-motion: reduce)').matches)) return
      decoded.current.add(index)
      if (index === 0) setSpringLoaded(true)
    } catch {
      // Keep the current season visible if a frame cannot be decoded.
    }
  }

  useEffect(() => {
    const element = stage.current
    if (!element) return
    // The high-priority image can finish before hydration attaches onLoad.
    const spring = element.querySelector('img')
    if (spring?.complete && spring.naturalWidth > 0) void onFrameLoad(spring, 0)
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let timer: ReturnType<typeof setInterval> | undefined
    const sync = () => {
      clearInterval(timer)
      setMotionAllowed(!motion.matches)
      if (motion.matches) {
        setActive(0)
        decoded.current = new Set(decoded.current.has(0) ? [0] : [])
      }
      if (!motion.matches && visible && !document.hidden && !paused) {
        timer = setInterval(() => setActive((value) => {
          for (let offset = 1; offset < seasons.length; offset++) {
            const next = (value + offset) % seasons.length
            if (decoded.current.has(next)) return next
          }
          return value
        }), 3800)
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    observer.observe(element)
    motion.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)
    return () => {
      clearInterval(timer)
      observer.disconnect()
      motion.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [paused])

  return (
    <div ref={stage} className={styles.stage} role="group" aria-label="The lake through four seasons">
      {seasons.map((season, index) => (
        <img
          key={season}
          src={index === 0 || (springLoaded && motionAllowed) ? `/assets/images/lab/weather-aquarium/hero-season-${season}.webp` : undefined}
          fetchPriority={index === 0 ? 'high' : 'low'}
          width={1619}
          height={959}
          onLoad={(event) => { void onFrameLoad(event.currentTarget, index) }}
          alt={index === active ? ALT[langCode][season] : ''}
          aria-hidden={index !== active}
          className={styles.frame}
          data-active={index === active}
          draggable={false}
        />
      ))}
      <button className={styles.pause} onClick={() => setPaused((value) => !value)} aria-label={label} title={label} type="button">
        <i className={paused ? 'ri-play-line' : 'ri-pause-line'} aria-hidden="true" />
      </button>
    </div>
  )
}
