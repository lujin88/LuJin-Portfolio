'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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

// Hover clips (Lu, 2026-11-05). Each 1112×834 clip has wide #edf3e7 padding, so it is
// scaled until its subject matches the webp subject: `w` is the clip width and `x`/`y`
// its left/top offset, all as fractions of the rendered webp width. Found by fitting the
// webp onto the clip's first frame (least mean pixel difference). `motion` is the union of
// the moving subject over every frame, in clip pixels; the mask is opaque inside it and
// fades out beyond it, so the padding never shows a hard edge.
// Clips rest on and loop from their own first frame. Fish, sun and coat are `_trim`
// exports with the source-image frames cut from both ends, so the loop point does not flash.
type VocabClip = { file: string; w: number; x: number; y: number; motion: [number, number, number, number]; fadeBottom?: boolean }

const VOCAB: { word: Word; alt: string; src: string; ratio: number; clip: VocabClip }[] = [
  { word: 'perch', alt: 'European perch', src: `${IMG}/vocab-perch.webp`, ratio: 1536 / 1024, clip: { file: 'vocab-perch-trim.mp4', w: 1.4866, x: -0.2435, y: -0.2234, motion: [215, 219, 892, 610] } },
  { word: 'church', alt: 'Church', src: `${IMG}/vocab-church.webp`, ratio: 1334 / 1179, clip: { file: 'vocab-church-v3.mp4', w: 1.8774, x: -0.4455, y: -0.2689, motion: [348, 179, 837, 656] } },
  { word: 'sun', alt: 'Sun', src: `${IMG}/vocab-sun.webp`, ratio: 1314 / 1197, clip: { file: 'vocab-sun-trim.mp4', w: 1.9819, x: -0.4958, y: -0.286, motion: [334, 151, 772, 632] } },
  // Drops reach the clip's bottom edge, so the bottom 20% fades instead (Lu-approved first version).
  { word: 'rain', alt: 'Rain cloud', src: `${IMG}/vocab-rain.webp`, ratio: 1377 / 1142, clip: { file: 'vocab-rain-v1.mp4', w: 1.6965, x: -0.3624, y: -0.2242, motion: [345, 196, 816, 834], fadeBottom: true } },
  { word: 'coat', alt: 'Yellow raincoat', src: `${IMG}/vocab-coat.webp`, ratio: 1312 / 1199, clip: { file: 'vocab-coat-trim.mp4', w: 1.9263, x: -0.4701, y: -0.2654, motion: [356, 162, 772, 658] } },
  { word: 'hat', alt: 'Red winter hat', src: `${IMG}/vocab-hat.webp`, ratio: 1374 / 1145, clip: { file: 'vocab-hat-v1.mp4', w: 1.7905, x: -0.3997, y: -0.2456, motion: [338, 167, 786, 651] } },
]

const CLIP_W = 1112
const CLIP_H = 834
// Fade distance outside the motion union, as a share of the clip.
const FADE = 0.12

function clipMask({ motion: [x0, y0, x1, y1], fadeBottom }: VocabClip) {
  const pct = (n: number) => `${(n * 100).toFixed(2)}%`
  const l = x0 / CLIP_W
  const r = x1 / CLIP_W
  const t = y0 / CLIP_H
  const b = fadeBottom ? 0.8 : y1 / CLIP_H
  const bEnd = fadeBottom ? 1 : b + FADE
  const across = `linear-gradient(to right, transparent ${pct(Math.max(0, l - FADE))}, #000 ${pct(l)}, #000 ${pct(r)}, transparent ${pct(Math.min(1, r + FADE))})`
  const down = `linear-gradient(to bottom, transparent ${pct(Math.max(0, t - FADE))}, #000 ${pct(t)}, #000 ${pct(b)}, transparent ${pct(Math.min(1, bEnd))})`
  return `${across}, ${down}`
}

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
  { slice: 0, caption: 'Easter / Ostern', alt: 'Easter eggs, blossoms and a child beside the lake', image: 'holiday-easter-v3.webp', video: 'easter-v3.mp4' },
  { slice: 1, caption: '1 August / Nationalfeiertag', alt: 'Swiss flags, lanterns and fireworks reflected in the lake', image: 'holiday-august.webp', video: 'august-v1.mp4' },
  { slice: 2, caption: 'Christmas / Weihnachten', alt: 'A child by a glowing Christmas tree on a snowy dock', image: 'holiday-christmas-v3.webp', video: 'christmas-v3.mp4' },
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
// Lu 11-05 23:02: B. Clips move only while hovered (or tapped on touch).
const AUTO_LOOP_POSES = false

const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

// Section 03 icon. At rest it shows the clip itself paused on frame 0, so starting
// playback never changes colour; the webp only covers the time before the clip loads.
// Loading starts once, a screen before the section. Mouse: loops while hovered, back to
// frame 0 on leave. Touch: tap toggles (same finePointer() split as PoseButton).
// Keyboard: plays while focused. Reduced motion: never plays. `active` is owned by the
// page so only one plays at a time.
function VocabArt({
  item,
  label,
  active,
  onActive,
}: {
  item: (typeof VOCAB)[number]
  label: string
  active: boolean
  onActive: (on: boolean) => void
}) {
  const { clip } = item
  const rootRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const motionAllowed = useMotionAllowed()
  const [load, setLoad] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const canPlay = ready && motionAllowed && !failed

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setLoad(true)
        observer.disconnect()
      },
      { rootMargin: '100% 0px' },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !ready) return
    if (active && canPlay) {
      video.currentTime = 0
      void video.play().catch(() => {
        // Playback can be refused after a quick leave.
      })
      return
    }
    video.pause()
    if (video.currentTime !== 0) video.currentTime = 0
  }, [active, canPlay, ready])

  // Stop when scrolled away or the tab is hidden, so a tapped clip does not keep running.
  useEffect(() => {
    const root = rootRef.current
    if (!root || !active) return
    const stop = () => onActive(false)
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stop()
    })
    observer.observe(root)
    const onHidden = () => {
      if (document.hidden) stop()
    }
    document.addEventListener('visibilitychange', onHidden)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onHidden)
    }
  }, [active, onActive])

  const mask = clipMask(clip)

  return (
    <button
      ref={rootRef}
      className={`vocab-art vocab-art--clip${ready && !failed ? ' is-ready' : ''}`}
      type="button"
      aria-label={label}
      aria-pressed={canPlay ? active : undefined}
      style={{ ['--ratio' as string]: item.ratio, ['--clip-w' as string]: clip.w, ['--clip-x' as string]: clip.x, ['--clip-y' as string]: clip.y }}
      onPointerEnter={(event) => {
        if (event.pointerType === 'touch' || !finePointer()) return
        onActive(true)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'touch' || !finePointer()) return
        onActive(false)
      }}
      onFocus={() => {
        if (!finePointer()) return
        onActive(true)
      }}
      onBlur={() => {
        if (!finePointer()) return
        onActive(false)
      }}
      onClick={() => {
        if (finePointer()) return
        onActive(!active)
      }}
    >
      <img src={item.src} alt="" loading="lazy" />
      {!failed && (
        <video
          ref={videoRef}
          className="vocab-video"
          // #t=0.001 makes iOS Safari paint the first frame without playing.
          src={load ? `/assets/videos/lab/weather-aquarium/${clip.file}#t=0.001` : undefined}
          muted
          loop
          playsInline
          preload={load ? 'auto' : 'none'}
          aria-hidden="true"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
          onLoadedData={(event) => {
            const video = event.currentTarget
            if (video.currentTime === 0) setReady(true)
            else video.currentTime = 0
          }}
          onSeeked={(event) => {
            if (event.currentTarget.readyState >= 2) setReady(true)
          }}
          onError={() => setFailed(true)}
        />
      )}
    </button>
  )
}

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
  onTap: (index: number, on: boolean) => void
}) {
  // WA character B (Lu 11-05): the poster stays still until the card is hovered or
  // focused; then the clip loops (Walk included) until the pointer leaves, and
  // resets to frame 0. On touch, a tap starts the loop; tapping the same card again,
  // another card or anywhere else stops it. Reduced motion shows only the poster.
  // The A path (HolidayVideo, loop in view) stays behind AUTO_LOOP_POSES.
  const autoLoop = AUTO_LOOP_POSES
  const hoverOnly = !autoLoop
  const file = item.video
  const videoRef = useRef<HTMLVideoElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  // True while hovered, focused or tap-activated: playback may resume after the
  // card scrolls back into view or the tab becomes visible again.
  const hovering = useRef(false)
  const tapActive = activeTap === item.index
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

  const start = () => {
    const video = videoRef.current
    if (!video) return
    video.loop = true
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
    if (!hoverOnly || activeTap === item.index) return
    // Another card was tapped, or the tap was cleared: stop this one.
    if (hovering.current && !finePointer()) reset()
  }, [activeTap, hoverOnly, item.index])

  useEffect(() => {
    if (!hoverOnly || !tapActive) return
    // "Tap anywhere else" stops the tapped clip.
    const onDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (target && buttonRef.current?.contains(target)) return
      if (target instanceof Element && target.closest('.pose')) return // the other card's click handles it
      reset()
      onTap(item.index, false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [hoverOnly, tapActive, onTap])

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
      if (hovering.current) void video.play().catch(() => {})
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

  return (
    <button
      ref={buttonRef}
      className="pose reveal pose-nodot"
      type="button"
      aria-pressed={autoLoop ? undefined : hoverOnly ? playing : selected}
      style={{ ['--index' as string]: item.index }}
      onPointerEnter={(event) => {
        if (!hoverOnly || event.pointerType === 'touch' || !finePointer()) return
        hovering.current = true
        start()
      }}
      onPointerLeave={(event) => {
        if (!hoverOnly || event.pointerType === 'touch') return
        reset()
      }}
      onFocus={() => {
        if (!hoverOnly || !finePointer()) return
        hovering.current = true
        start()
      }}
      onBlur={() => {
        if (!hoverOnly || !finePointer()) return
        reset()
      }}
      onClick={() => {
        if (!hoverOnly) {
          onSelect()
          onTap(item.index, true)
          return
        }
        if (finePointer()) return
        if (tapActive) {
          reset()
          onTap(item.index, false)
          return
        }
        hovering.current = true
        onTap(item.index, true)
        start()
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
        {!hoverOnly && item.video && <HolidayVideo file={item.video} className="pose-video" once={item.index === 3} />}
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
  const [activeVocab, setActiveVocab] = useState<Word | null>(null)
  // Stable so PoseButton's outside-tap listener isn't rebound on every render.
  const onPoseTap = useCallback(
    (index: number, on: boolean) => setActiveTap((current) => (on ? index : current === index ? null : current)),
    [],
  )

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
    const onMove = (event: globalThis.PointerEvent) => {
      if (!heroMedia || !heroDevice) return
      const bounds = heroMedia.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      heroDevice.style.transform = `translate3d(${x * 7}px, ${y * 5}px, 0) rotateX(${-y * 1.2}deg) rotateY(${x * 1.4}deg) rotateZ(0.75deg)`
    }
    const onLeave = () => {
      if (!heroDevice) return
      heroDevice.style.transform = 'translate3d(0, 0, 0) rotateZ(0.75deg)'
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
                  <span className="wa-title-line">Weather</span>{' '}
                  <span className="wa-title-line">Aquarium</span>
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
                  src={`${IMG}/hero-device-left-v2.webp`}
                  alt="An iPad turned to the left, showing the Weather Aquarium app: an autumn lakeside in Kilchberg with a girl, her cat and a boy on the jetty, fish under the water, and the weather panel below"
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
                      <VocabArt
                        item={item}
                        label={label}
                        active={activeVocab === item.word}
                        onActive={(on) => setActiveVocab((current) => (on ? item.word : current === item.word ? null : current))}
                      />
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
                    onTap={onPoseTap}
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
