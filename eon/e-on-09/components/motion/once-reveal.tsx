'use client'

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode, type Ref } from 'react'
import { cn } from '@eon/lib/utils'
import { prefersReducedMotion } from '@eon/lib/motion/hooks'
import { watchState } from '@eon/lib/motion/observe-once'

type OnceRevealProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  fromY?: number
  fromOpacity?: number
  as?: ElementType
}

export function OnceReveal({
  children,
  className,
  style,
  delay = 0,
  fromY = 28,
  fromOpacity = 0,
  as: Comp = 'div',
}: OnceRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (prefersReducedMotion()) {
      setInView(true)
      return
    }
    return watchState(node, setInView, 0.15, '0px')
  }, [])

  const classNameValue = cn('sc-once', inView && 'is-in', className)
  const styleValue = {
    '--sc-delay': `${delay}ms`,
    '--sc-from-y': `${fromY}px`,
    '--sc-from-opacity': String(fromOpacity),
    '--sc-d-in': '800ms',
    ...style,
  } as CSSProperties
  const nodeRef = ref as Ref<HTMLElement>

  if (Comp === 'header') {
    return (
      <header ref={nodeRef} className={classNameValue} style={styleValue}>
        {children}
      </header>
    )
  }

  return (
    <div ref={nodeRef as Ref<HTMLDivElement>} className={classNameValue} style={styleValue}>
      {children}
    </div>
  )
}
