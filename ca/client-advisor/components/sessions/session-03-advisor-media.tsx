'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslation } from '@i18n/use-translation'

import styles from './session-03-research.module.css'

const POSTER = '/assets/images/client-advisory/ca03-B-poster.webp'
const VIDEO = '/assets/videos/client-advisory/ca03-B-full-web.mp4'

export function Session03AdvisorMedia() {
  const { t } = useTranslation()
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const finishedRef = useRef(false)
  const visibleRef = useRef(false)

  useEffect(() => {
    const root = rootRef.current
    const video = videoRef.current
    if (!root || !video) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let loaded = false

    const showStill = () => {
      video.pause()
      video.classList.remove(styles.photoVideoActive)
    }

    const loadVideo = () => {
      if (loaded || reduce.matches) return
      loaded = true
      video.src = VIDEO
      video.load()
    }

    const tryPlay = () => {
      if (reduce.matches || finishedRef.current || !visibleRef.current || document.hidden) {
        showStill()
        return
      }
      loadVideo()
      if (video.ended) return
      video.muted = true
      video.classList.add(styles.photoVideoActive)
      const play = video.play()
      if (play) play.catch(showStill)
    }

    const onEnded = () => {
      finishedRef.current = true
      showStill()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[entries.length - 1]?.isIntersecting ?? false
        if (visibleRef.current) tryPlay()
        else video.pause()
      },
      { threshold: 0.2 },
    )

    const onVisibility = () => {
      if (document.hidden) video.pause()
      else tryPlay()
    }

    const onReduce = () => {
      if (reduce.matches) {
        finishedRef.current = false
        showStill()
        video.removeAttribute('src')
        loaded = false
      } else tryPlay()
    }

    video.loop = false
    video.addEventListener('ended', onEnded)
    reduce.addEventListener('change', onReduce)
    document.addEventListener('visibilitychange', onVisibility)
    observer.observe(root)

    if (reduce.matches) showStill()

    return () => {
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
