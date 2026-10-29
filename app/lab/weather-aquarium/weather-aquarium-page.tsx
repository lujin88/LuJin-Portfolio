'use client'

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { SiteClosing } from '../../components/site-closing'

const IMG = '/assets/images/lab/weather-aquarium'

const WORDS = ['perch', 'church', 'sun', 'rain', 'coat', 'hat'] as const
type Word = (typeof WORDS)[number]
type Lang = 'zh' | 'en' | 'de' | 'fr'

const DICTIONARY: Record<Lang, { locale: string; words: Record<Word, string> }> = {
  zh: {
    locale: 'zh-CN',
    words: { perch: '河鲈', church: '教堂', sun: '太阳', rain: '雨', coat: '外套', hat: '帽子' },
  },
  en: {
    locale: 'en-US',
    words: { perch: 'Perch', church: 'Church', sun: 'Sun', rain: 'Rain', coat: 'Coat', hat: 'Hat' },
  },
  de: {
    locale: 'de-DE',
    words: { perch: 'Egli', church: 'Kirche', sun: 'Sonne', rain: 'Regen', coat: 'Mantel', hat: 'Mütze' },
  },
  fr: {
    locale: 'fr-FR',
    words: { perch: 'Perche', church: 'Église', sun: 'Soleil', rain: 'Pluie', coat: 'Manteau', hat: 'Bonnet' },
  },
}

const LANGUAGES: { id: Lang; label: string }[] = [
  { id: 'zh', label: '中文' },
  { id: 'en', label: 'EN' },
  { id: 'de', label: 'DE' },
  { id: 'fr', label: 'FR' },
]

const POSES = [
  { index: 0, label: 'Idle', alt: 'Character standing idle' },
  { index: 1, label: 'Wave', alt: 'Character waving' },
  { index: 2, label: 'Get dressed', alt: 'Character getting dressed' },
  { index: 3, label: 'Walk & explore', alt: 'Character walking and exploring' },
] as const

const VOCAB: { word: Word; alt: string; src: string }[] = [
  { word: 'perch', alt: 'European perch', src: `${IMG}/vocab-perch.png` },
  { word: 'church', alt: 'Church', src: `${IMG}/vocab-church.png` },
  { word: 'sun', alt: 'Sun', src: `${IMG}/vocab-sun.png` },
  { word: 'rain', alt: 'Rain cloud', src: `${IMG}/vocab-rain.png` },
  { word: 'coat', alt: 'Yellow raincoat', src: `${IMG}/vocab-coat.png` },
  { word: 'hat', alt: 'Red winter hat', src: `${IMG}/vocab-hat.png` },
]

const SEASONS = [
  { name: 'Spring', caption: '春 · Spring · Frühling' },
  { name: 'Summer', caption: '夏 · Summer · Sommer' },
  { name: 'Autumn', caption: '秋 · Autumn · Herbst' },
  { name: 'Winter', caption: '冬 · Winter · Winter' },
] as const

const IMAGE_ASPECT = 1837 / 856
const STAGE_ASPECT = 1
const SEASON_WINDOW = STAGE_ASPECT / IMAGE_ASPECT
const SEASON_PAN = 1 - SEASON_WINDOW

function seasonIndex(t: number) {
  const center = t * SEASON_PAN + SEASON_WINDOW / 2
  return Math.min(SEASONS.length - 1, Math.floor(Math.min(center, 0.999) * SEASONS.length))
}

const EDITIONS = [
  { slice: 0, caption: 'Easter / Ostern', alt: 'Easter eggs, blossoms and a child beside the lake' },
  { slice: 1, caption: '1 August / Nationalfeiertag', alt: 'Swiss flags, lanterns and fireworks reflected in the lake' },
  { slice: 2, caption: 'Christmas / Weihnachten', alt: 'A child by a glowing Christmas tree on a snowy dock' },
] as const

export function WeatherAquariumPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const heroMediaRef = useRef<HTMLDivElement>(null)
  const heroDeviceRef = useRef<HTMLImageElement>(null)
  const seasonRef = useRef<HTMLDivElement>(null)
  const seasonDrag = useRef<{ id: number; x: number; y: number; locked: boolean | null } | null>(null)
  const [language, setLanguage] = useState<Lang>('zh')
  const [pose, setPose] = useState(0)
  const [seasonT, setSeasonT] = useState(0.5)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealItems = [...root.querySelectorAll('.reveal')]
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8%', threshold: 0.08 },
    )

    if (reduced || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
    } else {
      revealItems.forEach((item) => revealObserver.observe(item))
    }

    const heroMedia = heroMediaRef.current
    const heroDevice = heroDeviceRef.current
    const onMove = (event: globalThis.PointerEvent) => {
      if (!heroMedia || !heroDevice) return
      const bounds = heroMedia.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      heroDevice.style.transform = `translate3d(${x * 7}px, ${y * 5}px, 0) rotateX(${-y * 1.2}deg) rotateY(${x * 1.4}deg) rotateZ(-0.75deg)`
    }
    const onLeave = () => {
      if (!heroDevice) return
      heroDevice.style.transform = 'translate3d(0, 0, 0) rotateZ(-0.75deg)'
    }
    if (heroMedia && heroDevice && !reduced) {
      heroMedia.addEventListener('pointermove', onMove)
      heroMedia.addEventListener('pointerleave', onLeave)
    }

    return () => {
      revealObserver.disconnect()
      heroMedia?.removeEventListener('pointermove', onMove)
      heroMedia?.removeEventListener('pointerleave', onLeave)
      if ('speechSynthesis' in window) speechSynthesis.cancel()
    }
  }, [])

  const seasonFromClientX = (clientX: number) => {
    const stage = seasonRef.current
    if (!stage) return seasonT
    const bounds = stage.getBoundingClientRect()
    if (bounds.width <= 0) return seasonT
    return Math.min(1, Math.max(0, (clientX - bounds.left) / bounds.width))
  }

  const onSeasonPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    seasonDrag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, locked: null }
  }

  const onSeasonPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = seasonDrag.current
    if (!drag || drag.id !== event.pointerId) return
    const dx = event.clientX - drag.x
    const dy = event.clientY - drag.y
    if (drag.locked === null) {
      if (Math.hypot(dx, dy) < 8) return
      drag.locked = Math.abs(dx) > Math.abs(dy)
      if (!drag.locked) {
        seasonDrag.current = null
        return
      }
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    setSeasonT(seasonFromClientX(event.clientX))
  }

  const onSeasonPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const drag = seasonDrag.current
    if (drag && drag.id === event.pointerId && drag.locked !== false) {
      setSeasonT(seasonFromClientX(event.clientX))
    }
    seasonDrag.current = null
  }

  const onSeasonKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 0.25 : 0.08
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault()
      setSeasonT((value) => Math.min(1, value + step))
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault()
      setSeasonT((value) => Math.max(0, value - step))
    } else if (event.key === 'Home') {
      event.preventDefault()
      setSeasonT(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setSeasonT(1)
    }
  }

  const speak = (word: Word) => {
    if (!('speechSynthesis' in window)) return
    const entry = DICTIONARY[language]
    const utterance = new SpeechSynthesisUtterance(entry.words[word])
    utterance.lang = entry.locale
    utterance.rate = language === 'zh' ? 0.82 : 0.9
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }

  return (
    <>
      <div className="wa-page" ref={rootRef}>
        <header className="hero" id="overview">
          <div className="shell">
            <div className="hero-grid">
              <div className="hero-copy reveal">
                <h1>
                  Weather
                  <br />
                  Aquarium
                </h1>
                <p>
                  A 2.5D weather world for iPad — helping children understand the day and discover
                  new words.
                </p>
                <div className="hero-meta">Experience · Motion Graphic</div>
              </div>

              <div
                className="hero-media reveal"
                ref={heroMediaRef}
                aria-label="Weather Aquarium shown on an iPad"
              >
                <img
                  ref={heroDeviceRef}
                  className="hero-device"
                  src={`${IMG}/hero-device.png`}
                  alt="A tilted iPad showing an Alpine lake, village, weather forecast and freshwater aquarium"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </header>

        <main id="main">
          <section className="seasons-section" id="seasons" aria-labelledby="seasons-title">
            <div className="shell section-heading reveal">
              <p className="eyebrow">01 / The year in one place</p>
              <h2 id="seasons-title">The same world changes with the season outside.</h2>
            </div>

            <div className="shell seasons-frame">
              <div
                className="season-stage"
                ref={seasonRef}
                role="slider"
                tabIndex={0}
                aria-label="Season"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(seasonT * 100)}
                aria-valuetext={SEASONS[seasonIndex(seasonT)].name}
                style={{ ['--t' as string]: seasonT, ['--pan' as string]: SEASON_PAN }}
                onPointerDown={onSeasonPointerDown}
                onPointerMove={onSeasonPointerMove}
                onPointerUp={onSeasonPointerUp}
                onPointerCancel={onSeasonPointerUp}
                onKeyDown={onSeasonKeyDown}
              >
                <img
                  src={`${IMG}/seasons-panorama.png`}
                  alt=""
                  draggable={false}
                />
                <div className="season-playhead" aria-hidden="true">
                  <span className="season-now">{SEASONS[seasonIndex(seasonT)].name}</span>
                  <span className="season-knob" />
                </div>
              </div>

              <div className="season-captions" aria-label="Season names in Chinese, English and German">
                {SEASONS.map((season, index) => (
                  <span key={season.name} className={index === seasonIndex(seasonT) ? 'is-current' : undefined}>
                    {season.caption}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="editions-section" id="editions" aria-labelledby="editions-title">
            <div className="shell">
              <div className="section-heading compact reveal">
                <p className="eyebrow">02 / Limited editions</p>
                <h2 id="editions-title">For special days, the same world gets a new little story.</h2>
              </div>

              <div className="edition-grid">
                {EDITIONS.map((edition) => (
                  <figure className="edition reveal" key={edition.caption}>
                    <div
                      className="edition-media holiday-slice"
                      style={{ ['--slice' as string]: edition.slice }}
                    >
                      <img src={`${IMG}/holiday-strip.png`} alt={edition.alt} loading="lazy" />
                    </div>
                    <figcaption>{edition.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <section className="learning-section" id="learning" aria-labelledby="learning-title">
            <div className="shell">
              <div className="learning-head reveal">
                <div>
                  <p className="eyebrow">03 / Look, listen, learn</p>
                  <h2 id="learning-title">Every object in the aquarium can become a word.</h2>
                  <p className="section-copy">Switch the language to explore every object.</p>
                </div>

                <div className="language-toggle" role="group" aria-label="Choose language">
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={language === item.id}
                      onClick={() => setLanguage(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="vocab-grid" aria-live="polite">
                {VOCAB.map((item) => {
                  const label = DICTIONARY[language].words[item.word]
                  return (
                    <article className="vocab-item reveal" key={item.word}>
                      <div className="vocab-art">
                        <img src={item.src} alt={item.alt} loading="lazy" />
                      </div>
                      <div className="vocab-row">
                        <button
                          className="speak-button"
                          type="button"
                          aria-label={`Listen to ${label}`}
                          onClick={() => speak(item.word)}
                        >
                          <i className="ri-volume-up-line" aria-hidden="true" />
                        </button>
                        <span className="vocab-label">{label}</span>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="motion-section" id="motion" aria-labelledby="motion-title">
            <div className="shell motion-grid">
              <div className="motion-copy reveal">
                <p className="eyebrow">04 / Character motion</p>
                <h2 id="motion-title">Built in Rive</h2>
                <p>The character uses reusable Rive states for idle, waving, getting dressed and exploring.</p>
              </div>

              <div className="pose-track" aria-label="Character motion states">
                {POSES.map((item) => (
                  <button
                    key={item.label}
                    className="pose reveal"
                    type="button"
                    aria-pressed={pose === item.index}
                    style={{ ['--index' as string]: item.index }}
                    onClick={() => setPose(item.index)}
                  >
                    <span className="pose-art sprite-window">
                      <img src={`${IMG}/character-sprite.png`} alt={item.alt} loading="lazy" />
                    </span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <SiteClosing className="wa-closing" />
    </>
  )
}
