'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@eon/lib/utils'
import { useElementProgress, usePrefersReducedMotion } from '@eon/lib/motion/hooks'

export function ChallengePhotoReveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const progress = useElementProgress(ref, { latch: true })
  const settled = reduced || progress >= 0.999

  return (
    <div
      ref={ref}
      className={cn('sc-challenge-photo relative overflow-hidden rounded-[28px]', className)}
      style={
        settled
          ? undefined
          : {
              opacity: 0.28 + progress * 0.72,
              transform: `translate3d(0, ${(1 - progress) * 16}px, 0)`,
              clipPath: `inset(0 0 ${((1 - progress) * 100).toFixed(2)}% 0)`,
            }
      }
    >
      {children}
    </div>
  )
}
