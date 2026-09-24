'use client'

import { useLayoutEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@eon/lib/utils'
import { prefersReducedMotion, useInViewOnce } from '@eon/lib/motion/hooks'

export function KineticLines({
  lines,
  className,
  as: Comp = 'h2',
}: {
  lines: ReactNode[]
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  const { ref, inView } = useInViewOnce<HTMLHeadingElement>()
  const [enhance, setEnhance] = useState(false)

  useLayoutEffect(() => {
    if (!prefersReducedMotion()) setEnhance(true)
  }, [])

  return (
    <Comp ref={ref} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          className={cn(
            'sc-kinetic-line',
            (!enhance || inView) && 'is-in',
          )}
          style={{ '--sc-delay': `${index * 70}ms` } as CSSProperties}
        >
          <span className="sc-kinetic-line__i">{line}</span>
        </span>
      ))}
    </Comp>
  )
}
