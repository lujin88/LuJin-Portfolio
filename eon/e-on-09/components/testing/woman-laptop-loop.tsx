'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@eon/lib/utils'
import { usePrefersReducedMotion } from '@eon/lib/motion/hooks'

const POSTER = '/assets/images/eon/eon-08-woman.webp'
const MP4 = '/assets/videos/eon/woman-laptop-loop-5s.mp4'
const WEBM = '/assets/videos/eon/woman-laptop-loop-5s.webm'

export function WomanLaptopLoop({ alt }: { alt: string }) {
  const reduced = usePrefersReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
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
      void video.play().catch(() => setFailed(true))
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
        src={POSTER}
        alt={alt}
        width={1372}
        height={1148}
        className="h-[380px] w-full object-cover object-[48%_22%] md:h-[400px]"
      />
    )
  }

  return (
    <div className="relative h-[380px] w-full md:h-[400px]">
      <Image
        src={POSTER}
        alt=""
        aria-hidden
        width={1372}
        height={1148}
        className={cn(
          'h-full w-full object-cover object-[48%_22%]',
          playing && 'invisible',
        )}
      />
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-[48%_22%]"
        poster={POSTER}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        onPlaying={() => setPlaying(true)}
        onError={() => setFailed(true)}
      >
        <source src={WEBM} type="video/webm" />
        <source src={MP4} type="video/mp4" />
      </video>
    </div>
  )
}