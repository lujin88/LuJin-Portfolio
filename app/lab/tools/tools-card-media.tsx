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
}

export function ToolsCardMedia({
  mediaClass,
  alt,
  poster,
  videoWebm,
  videoMp4,
}: ToolsCardMediaProps) {
  const motionAllowed = useMotionAllowed()
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasVideo = Boolean(videoWebm || videoMp4)

  useEffect(() => {
    const video = videoRef.current
    const root = wrapRef.current
    if (!video || !root || !hasVideo || !motionAllowed) return

    let inView = false
    const sync = () => {
      if (inView && !document.hidden) {
        void video.play().catch(() => {})
      } else {
        video.pause()
      }
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
      video.pause()
    }
  }, [hasVideo, motionAllowed])

  if (!hasVideo || !motionAllowed) {
    return (
      <div className={`tools-card__media tools-card__media--${mediaClass}`} ref={wrapRef}>
        <img src={poster} alt={alt} loading="lazy" decoding="async" />
      </div>
    )
  }

  return (
    <div className={`tools-card__media tools-card__media--${mediaClass}`} ref={wrapRef}>
      <video
        ref={videoRef}
        className="tools-card__video"
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
    </div>
  )
}
