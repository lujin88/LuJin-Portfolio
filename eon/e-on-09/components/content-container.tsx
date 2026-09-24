import type { ReactNode } from 'react'
import { cn } from '@eon/lib/utils'

/**
 * Shared horizontal content grid for every case-study section.
 * Lives inside a full-width section so backgrounds and decorative
 * overflow stay unconstrained.
 */
export function ContentContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('content-container', className)}>{children}</div>
}

