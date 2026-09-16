'use client'

import { useRef, type PointerEvent, type ReactNode } from 'react'

const MAX_TILT_DEG = 6
const HOVER_SCALE = 1.03
const LAYER_SHIFT_PX = 6
const ENTER_TRANSITION = 'transform 140ms ease-out'
const LEAVE_TRANSITION = 'transform 550ms cubic-bezier(0.22, 1, 0.36, 1)'

type TiltCardProps = {
  className?: string
  children: ReactNode
}

export function TiltCard({ className, children }: TiltCardProps) {
  const cardRef = useRef<HTMLElement>(null)

  const setTilt = (rx: number, ry: number, scale: number, px: number, py: number) => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
    card.style.setProperty('--tilt-x', `${px}px`)
    card.style.setProperty('--tilt-y', `${py}px`)
  }

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    card.style.transition = ENTER_TRANSITION
    setTilt(-y * MAX_TILT_DEG * 2, x * MAX_TILT_DEG * 2, HOVER_SCALE, x * LAYER_SHIFT_PX, y * LAYER_SHIFT_PX)
  }

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return
    const card = cardRef.current
    if (!card) return

    card.style.transition = LEAVE_TRANSITION
    setTilt(0, 0, 1, 0, 0)
  }

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
      style={{ willChange: 'transform', ['--tilt-x' as string]: '0px', ['--tilt-y' as string]: '0px' }}
    >
      {children}
    </article>
  )
}
