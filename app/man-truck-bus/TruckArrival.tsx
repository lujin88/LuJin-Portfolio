'use client'
import { useEffect, useRef, useState } from 'react'

// Lu #4506: the scene fills the opening screen, the truck drives in and parks, then the
// note pops up. Plays once. Reduced motion, or a blocked autoplay, shows the parked frame.
// Files: video #4685 (picked by video, not by Lu yet); audio stripped (-an).
const A = '/assets/man-fleet-uptime/truck-arrive'
const PHONE = '(max-width: 600px)'

type Phase = 'idle' | 'playing' | 'ended' | 'still'

export function TruckArrival() {
  const video = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  useEffect(() => {
    const v = video.current!
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setPhase('still'); return }
    v.load()
    v.play().catch(() => setPhase('still'))
  }, [])
  return <div className="mc-arrival" data-phase={phase}>
    <div className="mc-arrival-frame">
      <picture className="mc-arrival-first">
        <source media={PHONE} srcSet={`${A}-1080x1920-first.webp`} />
        <img src={`${A}-1920-first.webp`} alt="" width="1920" height="1080" />
      </picture>
      <picture className="mc-arrival-last">
        <source media={PHONE} srcSet={`${A}-1080x1920-last.webp`} />
        <img src={`${A}-1920-last.webp`} alt="" width="1920" height="1080" />
      </picture>
      <video ref={video} muted playsInline preload="none" aria-hidden="true" tabIndex={-1}
        onPlaying={() => setPhase('playing')} onEnded={() => setPhase('ended')}>
        <source media={PHONE} src={`${A}-1080x1920.mp4`} type="video/mp4" />
        <source src={`${A}-1920.mp4`} type="video/mp4" />
      </video>
      <p className="mc-arrival-note"><span>Driver cover needed</span> <strong>10:00 to Stuttgart.</strong></p>
    </div>
  </div>
}
