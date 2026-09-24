'use client'

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode, type Ref } from 'react'
import { watchState } from '@/lib/observe-once'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
  /** Opacity only. Use when the element itself is a 3D perspective box. */
  fadeOnly?: boolean
}

/**
 * Same reveal as Index `.reveal`: fade + 28px rise, 800ms, once,
 * when 15% of the block is in view.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  as: Comp = 'div',
  fadeOnly = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    return watchState(node, setVisible, 0.15)
  }, [])

  const style: CSSProperties | undefined = delay
    ? { transitionDelay: `${delay}ms` }
    : undefined
  const classNameValue = [
    'ca-scroll-reveal',
    fadeOnly ? 'ca-scroll-reveal--fade' : '',
    visible ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const nodeRef = ref as Ref<HTMLElement>

  if (Comp === 'li') {
    return (
      <li ref={nodeRef as Ref<HTMLLIElement>} className={classNameValue} style={style}>
        {children}
      </li>
    )
  }

  if (Comp === 'header') {
    return (
      <header ref={nodeRef as Ref<HTMLElement>} className={classNameValue} style={style}>
        {children}
      </header>
    )
  }

  return (
    <div ref={nodeRef as Ref<HTMLDivElement>} className={classNameValue} style={style}>
      {children}
    </div>
  )
}
