'use client'

import { useEffect, useRef, useState } from 'react'
import { useSiteLanguage } from '@header/lib/language'
import styles from './season-crossfade.module.css'

const seasons = ['spring', 'summer', 'autumn', 'winter'] as const

// Alt matches the reviewed Lindt scenes in #154 (PM #10309, 2026-11-13):
// no swans; winter includes the girl and cat.
const ALT = {
  en: {
    spring: 'A spring scene from the Weather Aquarium app: cherry blossom and tulips, a girl and her cat by the Lindt shop in Kilchberg, and the lake by the jetty',
    summer: 'A summer scene from the Weather Aquarium app: green trees and flowers, a girl and her cat by the Lindt shop in Kilchberg, and the lake by the jetty',
    autumn: 'An autumn scene from the Weather Aquarium app: golden leaves, a girl and her cat by the Lindt shop in Kilchberg, and the lake by the jetty',
    winter: 'A winter scene from the Weather Aquarium app: a girl in pink winter clothes and a cat in a jumper by the Lindt shop in Kilchberg, snow on the roofs and trees, and the frozen lake by the jetty',
  },
  de: {
    spring: 'Eine Frühlingsszene aus der App Weather Aquarium: Kirschblüten und Tulpen, ein Mädchen mit seiner Katze vor dem Lindt-Laden in Kilchberg, und der See am Steg',
    summer: 'Eine Sommerszene aus der App Weather Aquarium: grüne Bäume und Blumen, ein Mädchen mit seiner Katze vor dem Lindt-Laden in Kilchberg, und der See am Steg',
    autumn: 'Eine Herbstszene aus der App Weather Aquarium: goldenes Laub, ein Mädchen mit seiner Katze vor dem Lindt-Laden in Kilchberg, und der See am Steg',
    winter: 'Eine Winterszene aus der App Weather Aquarium: ein Mädchen in rosa Winterkleidung und eine Katze im Pullover vor dem Lindt-Laden in Kilchberg, Schnee auf Dächern und Bäumen und der zugefrorene See am Steg',
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
          src={index === 0 || (springLoaded && motionAllowed) ? `/assets/images/lab/weather-aquarium/season-${season}-lindt.webp` : undefined}
          fetchPriority={index === 0 ? 'high' : 'low'}
          width={1400}
          height={830}
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
