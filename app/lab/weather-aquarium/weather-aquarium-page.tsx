'use client'

import { useEffect, useRef, useState } from 'react'
import { SeasonCrossfade } from './season-crossfade'
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
  { index: 0, label: 'Idle', alt: 'Character standing idle', video: 'pose-idle-v1.mp4', poster: null },
  // Wave's still is the clip's own first frame, so starting playback does not jump.
  { index: 1, label: 'Wave', alt: 'Character waving', video: 'pose-wave-v2.mp4', poster: 'pose-wave-v2-poster.jpg' },
  { index: 2, label: 'Get dressed', alt: 'Character getting dressed', video: 'pose-get-dressed-v1.mp4', poster: null },
  { index: 3, label: 'Walk & explore', alt: 'Character walking and exploring', video: 'pose-walk-explore-v21.mp4', poster: null },
] as const

const VOCAB: { word: Word; alt: string; src: string }[] = [
  { word: 'perch', alt: 'European perch', src: `${IMG}/vocab-perch.webp` },
  { word: 'church', alt: 'Church', src: `${IMG}/vocab-church.webp` },
  { word: 'sun', alt: 'Sun', src: `${IMG}/vocab-sun.webp` },
  { word: 'rain', alt: 'Rain cloud', src: `${IMG}/vocab-rain.webp` },
  { word: 'coat', alt: 'Yellow raincoat', src: `${IMG}/vocab-coat.webp` },
  { word: 'hat', alt: 'Red winter hat', src: `${IMG}/vocab-hat.webp` },
]

function voiceForLocale(locale: string): SpeechSynthesisVoice | undefined {
  if (!('speechSynthesis' in window)) return undefined
  const want = locale.toLowerCase()
  const language = want.split('-')[0]
  const matches = speechSynthesis.getVoices().filter((voice) => {
    const code = voice.lang.toLowerCase()
    return code === want || code === language || code.startsWith(`${language}-`)
  })
  matches.sort((a, b) => voiceScore(b, want) - voiceScore(a, want))
  return matches[0]
}

// macOS ships en-US novelty voices (Albert, Bahh, Boing, …). They match the
// locale and are localService, so a locale-only sort speaks English in one
// of those voices. Prefer the installed natural voices for each locale.
const NOVELTY_VOICE =
  /^(albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|eddy|flo|fred|good news|grandma|grandpa|hysterical|jester|junior|kathy|organ|princess|ralph|shelley|superstar|trinoids|whisper|wobble|zarvox)\b/i
const PREFERRED_VOICE = [
  'samantha',
  'alex',
  'tingting',
  'ting-ting',
  'anna',
  'thomas',
  'amelie',
  'amélie',
]

function voiceScore(voice: SpeechSynthesisVoice, want: string): number {
  const code = voice.lang.toLowerCase()
  const name = voice.name.toLowerCase()
  let score = code === want ? 100 : 40
  if (voice.localService) score += 10
  if (NOVELTY_VOICE.test(voice.name)) score -= 80
  if (PREFERRED_VOICE.some((item) => name.includes(item))) score += 30
  return score
}

const EDITIONS = [
  { slice: 0, caption: 'Easter / Ostern', alt: 'Easter eggs, blossoms and a child beside the lake', image: 'holiday-easter.webp', video: 'easter-v2.mp4' },
  { slice: 1, caption: '1 August / Nationalfeiertag', alt: 'Swiss flags, lanterns and fireworks reflected in the lake', image: 'holiday-august.webp', video: 'august-v1.mp4' },
  { slice: 2, caption: 'Christmas / Weihnachten', alt: 'A child by a glowing Christmas tree on a snowy dock', image: 'holiday-christmas.webp', video: 'christmas-v2.mp4' },
] as const

function useMotionAllowed() {
  const [motionAllowed, setMotionAllowed] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setMotionAllowed(!preference.matches)
    update()
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  return motionAllowed
}

function HolidayVideo({ file, className = 'holiday-video', once = false }: { file: string; className?: string; once?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const motionAllowed = useMotionAllowed()
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setPlaying(false)
  }, [motionAllowed])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !motionAllowed || failed) return

    let inView = false
    const syncPlayback = () => {
      // A play-once clip holds its last frame; play() on an ended video would restart it.
      if (once && video.ended) return
      if (inView && !document.hidden) {
        void video.play().catch(() => {
          // Playback may be interrupted by a scroll or preference change.
        })
      } else {
        video.pause()
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio > 0
      syncPlayback()
    })
    observer.observe(video)
    document.addEventListener('visibilitychange', syncPlayback)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
      video.pause()
    }
  }, [motionAllowed, failed, file, once])

  if (!motionAllowed || failed) return null

  return (
    <video
      ref={videoRef}
      className={`${className}${playing ? ' is-playing' : ''}`}
      src={`/assets/videos/lab/weather-aquarium/${file}`}
      loop={!once}
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      onPlaying={() => setPlaying(true)}
      onError={() => setFailed(true)}
    />
  )
}

// Lu's choice for section 04: true = loop in view (A), false = play on hover (B).
const AUTO_LOOP_POSES = true

function PoseButton({
  item,
  selected,
  onSelect,
  activeTap,
  onTap,
}: {
  item: (typeof POSES)[number]
  selected: boolean
  onSelect: () => void
  activeTap: number | null
  onTap: () => void
}) {
  // WA character A: clips play on their own while the card is on screen; Walk plays
  // once and holds its last frame, the others loop
  // (HolidayVideo: plays in view, pauses off screen or in a hidden tab, renders
  // nothing under reduced motion). The hover/tap path below stays for B.
  const autoLoop = AUTO_LOOP_POSES
  // Walk plays once and holds the last frame until the pointer leaves.
  // The other clips keep looping while the pointer stays.
  const playOnce = item.index === 3
  const hoverOnly = !autoLoop
  const file = item.video
  const videoRef = useRef<HTMLVideoElement>(null)
  const hovering = useRef(false)
  const motionAllowed = useMotionAllowed()
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const showClip = hoverOnly && Boolean(file) && motionAllowed && !failed

  const reset = () => {
    hovering.current = false
    setPlaying(false)
    const video = videoRef.current
    if (!video) return
    video.pause()
    if (video.currentTime !== 0) video.currentTime = 0
  }

  const start = (loop: boolean) => {
    const video = videoRef.current
    if (!video) return
    video.loop = loop
    const go = () => {
      video.currentTime = 0
      void video.play().catch(() => {
        // A tap can be rejected if the file is not ready yet.
      })
    }
    // preload=metadata stops at HAVE_METADATA (readyState 1) and never fires
    // loadeddata until playback starts, so waiting for loadeddata drops the tap.
    if (video.readyState >= 1) go()
    else video.addEventListener('loadedmetadata', go, { once: true })
  }

  useEffect(() => {
    if (!hoverOnly || activeTap == null || activeTap === item.index) return
    reset()
  }, [activeTap, hoverOnly, item.index])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !showClip) return

    let inView = false
    const syncPlayback = () => {
      if (!inView || document.hidden) {
        video.pause()
        setPlaying(false)
        return
      }
      if (hovering.current) {
        // An ended play-once clip stays on its last frame. play() would restart it.
        if (video.ended) setPlaying(true)
        else void video.play().catch(() => {})
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio > 0
      syncPlayback()
    })
    observer.observe(video)
    document.addEventListener('visibilitychange', syncPlayback)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
      video.pause()
    }
  }, [showClip, item.video])

  const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

  return (
    <button
      className="pose reveal pose-nodot"
      type="button"
      aria-pressed={autoLoop ? undefined : hoverOnly ? playing : selected}
      style={{ ['--index' as string]: item.index }}
      onPointerEnter={(event) => {
        if (!hoverOnly || event.pointerType === 'touch' || !finePointer()) return
        hovering.current = true
        start(!playOnce)
      }}
      onPointerLeave={(event) => {
        if (!hoverOnly || event.pointerType === 'touch') return
        reset()
      }}
      onFocus={() => {
        if (!hoverOnly || !finePointer()) return
        hovering.current = true
        start(!playOnce)
      }}
      onBlur={() => {
        if (!hoverOnly || !finePointer()) return
        reset()
      }}
      onClick={() => {
        if (!hoverOnly) {
          onSelect()
          onTap()
          return
        }
        if (finePointer()) return
        hovering.current = false
        onTap()
        start(false)
      }}
    >
      <span className="pose-art sprite-window">
        {item.poster ? (
          <img className="pose-poster" src={`${IMG}/${item.poster}`} alt={item.alt} loading="lazy" />
        ) : (
          <img src={`${IMG}/character-sprite.webp`} alt={item.alt} loading="lazy" />
        )}
        {showClip && file && (
          <video
            ref={videoRef}
            className={`pose-video${playing ? ' is-playing' : ''}`}
            src={`/assets/videos/lab/weather-aquarium/${file}`}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            onPlaying={() => setPlaying(true)}
            onEnded={() => {
              if (!hovering.current) reset()
            }}
            onError={() => setFailed(true)}
          />
        )}
        {!hoverOnly && item.video && <HolidayVideo file={item.video} className="pose-video" once={playOnce} />}
      </span>
      <span>{item.label}</span>
    </button>
  )
}

export function WeatherAquariumPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const heroMediaRef = useRef<HTMLDivElement>(null)
  const heroDeviceRef = useRef<HTMLImageElement>(null)
  const [language, setLanguage] = useState<Lang>('zh')
  const [pose, setPose] = useState(0)
  const [activeTap, setActiveTap] = useState<number | null>(null)

  useEffect(() => {
    if (!('speechSynthesis' in window)) return
    const warm = () => {
      speechSynthesis.getVoices()
    }
    warm()
    speechSynthesis.addEventListener('voiceschanged', warm)
    return () => speechSynthesis.removeEventListener('voiceschanged', warm)
  }, [])

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
    const onMove = (event: PointerEvent) => {
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

  const speak = (word: Word) => {
    if (!('speechSynthesis' in window)) return
    const entry = DICTIONARY[language]
    const say = () => {
      const utterance = new SpeechSynthesisUtterance(entry.words[word])
      utterance.lang = entry.locale
      utterance.rate = language === 'zh' ? 0.82 : 0.9
      const voice = voiceForLocale(entry.locale)
      if (voice) utterance.voice = voice
      speechSynthesis.cancel()
      speechSynthesis.speak(utterance)
    }
    if (speechSynthesis.getVoices().length) {
      say()
      return
    }
    const onVoices = () => {
      if (!speechSynthesis.getVoices().length) return
      speechSynthesis.removeEventListener('voiceschanged', onVoices)
      say()
    }
    speechSynthesis.addEventListener('voiceschanged', onVoices)
    speechSynthesis.getVoices()
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
                  src={`${IMG}/hero-device.webp`}
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
              <SeasonCrossfade />
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
                      className={`edition-media ${edition.video ? 'holiday-cover' : 'holiday-slice'}`}
                      style={{ ['--slice' as string]: edition.slice }}
                    >
                      <img src={`${IMG}/${edition.image}`} alt={edition.alt} loading="lazy" />
                      {edition.video && <HolidayVideo file={edition.video} />}
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
                  <PoseButton
                    key={item.label}
                    item={item}
                    selected={pose === item.index}
                    onSelect={() => setPose(item.index)}
                    activeTap={activeTap}
                    onTap={() => setActiveTap(item.index)}
                  />
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
