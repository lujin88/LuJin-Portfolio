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
}

export function ToolsCardMedia({
  mediaClass,
  alt,
  poster,
  videoWebm,
  videoMp4,
  videoWebmDark,
  videoMp4Dark,
}: ToolsCardMediaProps) {
  const motionAllowed = useMotionAllowed()
  const wrapRef = useRef<HTMLDivElement>(null)
  const hasVideo = Boolean(videoWebm || videoMp4)

  useEffect(() => {
    const root = wrapRef.current
    if (!root || !hasVideo || !motionAllowed) return
    const videos = root.querySelectorAll<HTMLVideoElement>('.tools-card__video')

    let inView = false
    const sync = () => {
      videos.forEach((video) => {
        if (inView && !document.hidden) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      })
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio > 0.15
        sync()
      },
      { threshold: [0, 0.15, 0.4] },
    )
    observer.observe(root)
    document.addEventListener('visibilitychange', sync)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      videos.forEach((video) => video.pause())
    }
  }, [hasVideo, motionAllowed])

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
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden="true"
      >
        {videoWebm ? <source src={videoWebm} type="video/webm" /> : null}
        {videoMp4 ? <source src={videoMp4} type="video/mp4" /> : null}
      </video>
      {hasDark ? (
        <video
          className="tools-card__video tools-card__video--dark"
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden="true"
        >
          {videoWebmDark ? <source src={videoWebmDark} type="video/webm" /> : null}
          {videoMp4Dark ? <source src={videoMp4Dark} type="video/mp4" /> : null}
        </video>
      ) : null}
    </div>
  )
}
