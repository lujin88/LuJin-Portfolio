'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@eon/lib/motion/hooks'
import { ChallengeWomanLaptopHandOverlay } from '@eon/components/challenge/challenge-woman-laptop-hand-overlay'

const BAKED = '/assets/images/eon/eon-challenge-woman-laptop.webp'
const CLEAN = '/assets/images/eon/eon-challenge-woman-laptop-clean.webp'
const MP4 = '/assets/videos/eon/challenge-woman-laptop-loop-5s.mp4'
const WEBM = '/assets/videos/eon/challenge-woman-laptop-loop-5s.webm'

function isPlayFailure(err: unknown) {
  return err instanceof DOMException && (err.name === 'NotAllowedError' || err.name === 'NotSupportedError')
}

export function ChallengeWomanLaptopLoop({ alt }: { alt: string }) {
  const reduced = usePrefersReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (reduced || failed) return
    const video = videoRef.current
    if (!video) return

    const sync = () => {
      if (document.hidden) {
        video.pause()
        return
      }
      void video.play().catch((err) => {
        if (isPlayFailure(err)) setFailed(true)
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries.some((e) => e.isIntersecting && e.intersectionRatio > 0)
        if (!inView) {
          video.pause()
          return
        }
        sync()
      },
      { threshold: 0.2 },
    )
    observer.observe(video)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      video.pause()
    }
  }, [reduced, failed])

  if (reduced || failed) {
    return (
      <Image
        src={BAKED}
        alt={alt}
        width={1400}
        height={788}
        priority
        className="h-auto w-full object-cover"
      />
    )
  }

  return (
    <div className="relative" role="img" aria-label={alt}>
      <video
        ref={videoRef}
        className="h-auto w-full object-cover"
        poster={CLEAN}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src={WEBM} type="video/webm" />
        <source src={MP4} type="video/mp4" onError={() => setFailed(true)} />
      </video>
      <ChallengeWomanLaptopHandOverlay className="absolute inset-0 z-10" />
    </div>
  )
}