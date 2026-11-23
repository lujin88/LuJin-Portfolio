'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslation } from '@i18n/use-translation'

import styles from './session-03-research.module.css'

const POSTER = '/assets/images/client-advisory/ca03-B-poster.webp'
const VIDEO = '/assets/videos/client-advisory/ca03-B-full-web.mp4'

// Lu #22115: hold the last frame a few seconds, then play again.
const HOLD_MS = 3000
const FADE_MS = 700

export function Session03AdvisorMedia() {
  const { t } = useTranslation()
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const video = videoRef.current
    if (!root || !video) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let loaded = false
    let visible = false
    let waiting = false
    let timer: number | undefined

    const clearTimer = () => {
      if (timer !== undefined) window.clearTimeout(timer)
      timer = undefined
    }

    const showStill = () => {
      clearTimer()
      waiting = false
      video.pause()
      video.classList.remove(styles.photoVideoActive, styles.photoVideoFading)
    }

    const loadVideo = () => {
      if (loaded || reduce.matches) return
      loaded = true
      video.src = VIDEO
      video.load()
    }

    const canPlay = () => !reduce.matches && visible && !document.hidden

    const tryPlay = () => {
      if (!canPlay()) {
        if (reduce.matches) showStill()
        else video.pause()
        return
      }
      if (waiting) return // the hold timer restarts playback
      loadVideo()
      video.muted = true
      video.classList.remove(styles.photoVideoFading)
      const play = video.play()
      if (play) play.catch(showStill)
    }

    // Keep the last frame on screen, then fade to the poster (the first
    // frame) and start again from 0, so neither end pops.
    const onEnded = () => {
      waiting = true
      clearTimer()
      timer = window.setTimeout(() => {
        video.classList.add(styles.photoVideoFading)
        timer = window.setTimeout(() => {
          timer = undefined
          waiting = false
          video.currentTime = 0
          if (canPlay()) tryPlay()
          else video.classList.remove(styles.photoVideoActive, styles.photoVideoFading)
        }, FADE_MS)
      }, HOLD_MS)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[entries.length - 1]?.isIntersecting ?? false
        if (visible) tryPlay()
        else if (!waiting) video.pause()
      },
      { threshold: 0.2 },
    )

    const onVisibility = () => {
      if (document.hidden) video.pause()
      else tryPlay()
    }

    const onReduce = () => {
      if (reduce.matches) {
        showStill()
        video.removeAttribute('src')
        loaded = false
      } else tryPlay()
    }

    // Reveal the video only once a frame is on screen; until then the
    // poster (the same first frame) stays visible, so nothing pops.
    // Wait a few decoded frames first: Chrome's very first frames after
    // play() can render slightly brighter than the rest.
    const onPlaying = () => {
      if (video.classList.contains(styles.photoVideoActive)) return
      let n = 0
      const step = () => {
        if (++n >= 4 || !('requestVideoFrameCallback' in video)) {
          if (!video.paused) video.classList.add(styles.photoVideoActive)
          return
        }
        video.requestVideoFrameCallback(step)
      }
      step()
    }

    video.loop = false
    video.addEventListener('playing', onPlaying)
    video.addEventListener('ended', onEnded)
    reduce.addEventListener('change', onReduce)
    document.addEventListener('visibilitychange', onVisibility)
    observer.observe(root)

    if (reduce.matches) showStill()

    return () => {
      clearTimer()
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('ended', onEnded)
      reduce.removeEventListener('change', onReduce)
      document.removeEventListener('visibilitychange', onVisibility)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={rootRef} className={styles.photoFrame}>
      <Image
        src={POSTER}
        alt={t('ca.research.photoAlt')}
        fill
        sizes="100vw"
        unoptimized
        className={`object-cover ${styles.photo}`}
        priority
      />
      <video
        ref={videoRef}
        className={`${styles.photo} ${styles.photoVideo}`}
        poster={POSTER}
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        aria-hidden="true"
      />
    </div>
  )
}
