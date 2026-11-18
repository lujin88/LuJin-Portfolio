'use client'

import { useEffect, useRef, useState } from 'react'

function useMotionAllowed() {
  const [allowed, setAllowed] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setAllowed(!mq.matches)
    const onChange = () => setAllowed(!mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return allowed
}

type ToolsCardMediaProps = {
  mediaClass: string
  alt: string
  poster: string
  videoWebm?: string
  videoMp4?: string
  videoWebmDark?: string
  videoMp4Dark?: string
  startTime?: number
}

export function ToolsCardMedia({
  mediaClass,
  alt,
  poster,
  videoWebm,
  videoMp4,
  videoWebmDark,
  videoMp4Dark,
  startTime = 0,
}: ToolsCardMediaProps) {
  const motionAllowed = useMotionAllowed()
  const wrapRef = useRef<HTMLDivElement>(null)
  const hasVideo = Boolean(videoWebm || videoMp4)

  useEffect(() => {
    const root = wrapRef.current
    if (!root || !hasVideo || !motionAllowed) return
    const videos = root.querySelectorAll<HTMLVideoElement>('.tools-card__video')

    const theme = window.matchMedia('(prefers-color-scheme: dark)')
    let inView = false
    const sync = () => {
      videos.forEach((video) => {
        const visibleTheme = getComputedStyle(video).display !== 'none'
        if (inView && !document.hidden && visibleTheme) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      })
    }
    const restart = (event: Event) => {
      const video = event.currentTarget as HTMLVideoElement
      video.currentTime = startTime
      sync()
    }
    videos.forEach(video => video.addEventListener('ended', restart))
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio > 0.15
        sync()
      },
      { threshold: [0, 0.15, 0.4] },
    )
    observer.observe(root)
    document.addEventListener('visibilitychange', sync)
    theme.addEventListener('change', sync)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      theme.removeEventListener('change', sync)
      videos.forEach((video) => {
        video.removeEventListener('ended', restart)
        video.pause()
      })
    }
  }, [hasVideo, motionAllowed, startTime])

  if (!hasVideo || !motionAllowed) {
    return (
      <div className={`tools-card__media tools-card__media--${mediaClass}`} ref={wrapRef}>
        <img src={poster} alt={alt} loading="lazy" decoding="async" />
      </div>
    )
  }

  const hasDark = Boolean(videoWebmDark || videoMp4Dark)

  return (
    <div className={`tools-card__media tools-card__media--${mediaClass}`} ref={wrapRef}>
      <video
        className={`tools-card__video tools-card__video--light${hasDark ? '' : ' tools-card__video--solo'}`}
        muted
        loop={startTime === 0}
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden="true"
      >
        {videoWebm ? <source src={startTime ? `${videoWebm}#t=${startTime}` : videoWebm} type="video/webm" /> : null}
        {videoMp4 ? <source src={startTime ? `${videoMp4}#t=${startTime}` : videoMp4} type="video/mp4" /> : null}
      </video>
      {hasDark ? (
        <video
          className="tools-card__video tools-card__video--dark"
          muted
          loop={startTime === 0}
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden="true"
        >
          {videoWebmDark ? <source src={startTime ? `${videoWebmDark}#t=${startTime}` : videoWebmDark} type="video/webm" /> : null}
          {videoMp4Dark ? <source src={startTime ? `${videoMp4Dark}#t=${startTime}` : videoMp4Dark} type="video/mp4" /> : null}
        </video>
      ) : null}
    </div>
  )
}
