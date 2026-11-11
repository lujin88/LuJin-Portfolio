'use client'
import { useEffect, useRef, useState } from 'react'

// Lu #4506: the scene fills the opening screen, the truck drives in and parks, then the
// note pops up. Plays once. Reduced motion, or a blocked autoplay, shows the parked frame.
// Files: video #4685 (picked by video, not by Lu yet), EASE_1109 cuts at 24fps (PM #4805); audio stripped (-an).
const A = '/assets/man-fleet-uptime/truck-arrive'
const PHONE = '(max-width: 600px)'

type Phase = 'idle' | 'playing' | 'ended' | 'still'

// Where the leader ends on the parked truck, in clip pixels: [x, y, clip width, clip height].
// Desktop: trailer front top edge (visual #4741). Phone: front truck's box top (visual #4824).
const DESK = [1440, 620, 1920, 1080]
const MOBILE = [300, 1110, 1080, 1920]

// Desktop: the note sits 36px above the anchor, leader 28px in from its left (visual #4741).
// Phone: left 24px, top 49% of the screen, leader from 56px in (visual #4824). --lx in case.css.
// The anchor must stay at least 24px below the note. If the note then runs into the text
// (16px gap), it moves below the text when that still leaves a leader, else right of it.
// The leader runs from the note's bottom edge to the anchor; it is dropped under 12px.
function place(frame: HTMLElement, note: HTMLElement) {
  const cover = frame.closest('.mc-cover')!
  const phone = matchMedia(PHONE).matches
  const [ax, ay, cw, ch] = phone ? MOBILE : DESK
  const f = frame.getBoundingClientRect(), c = cover.getBoundingClientRect()
  const t = cover.querySelector('.mc-cover-inner')!.getBoundingClientRect()
  const tx = ax * f.width / cw, ty = ay * f.height / ch
  const w = note.offsetWidth, h = note.offsetHeight, lx = parseFloat(getComputedStyle(note).getPropertyValue('--lx'))
  let left = phone ? c.left - f.left + 24 : tx - lx
  let top = Math.min(phone ? c.top - f.top + c.height * .49 : ty - 36 - h, ty - h - 24)
  left = Math.min(left, c.right - f.left - w - 16)
  const textRight = t.right - f.left + 16, textBottom = t.bottom - f.top + 16
  if (left < textRight && top < textBottom) {
    if (ty - (textBottom + h) >= 12 || textRight + w > c.right - f.left - 16) top = textBottom
    else left = textRight
  }
  const dx = tx - (left + lx), dy = ty - (top + h)
  note.style.left = `${left}px`
  note.style.top = `${top}px`
  note.style.setProperty('--len', dy < 12 ? '0px' : `${Math.hypot(dx, dy)}px`)
  note.style.setProperty('--ang', `${-Math.atan2(dx, dy) * 180 / Math.PI}deg`)
}

export function TruckArrival() {
  const video = useRef<HTMLVideoElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const note = useRef<HTMLParagraphElement>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  useEffect(() => {
    const f = frame.current!, n = note.current!, run = () => place(f, n)
    const ro = new ResizeObserver(run)
    ro.observe(f.closest('.mc-cover')!)
    ro.observe(n)
    document.fonts?.ready.then(run)
    return () => ro.disconnect()
  }, [])
  useEffect(() => {
    const v = video.current!
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setPhase('still'); return }
    v.load()
    v.play().catch(() => setPhase('still'))
  }, [])
  return <div className="mc-arrival" data-phase={phase}>
    <div className="mc-arrival-frame" ref={frame}>
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
      <p className="mc-arrival-note" ref={note}><span>Driver cover needed</span> <strong>10:00 to Stuttgart.</strong></p>
    </div>
  </div>
}
