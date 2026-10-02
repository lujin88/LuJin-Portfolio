'use client'

import { useEffect, useRef, useState } from 'react'

const CANVAS_WIDTH = 1440

export function PartyPlannerCanvas({ children }: { children: React.ReactNode }) {
  const pageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [pageHeight, setPageHeight] = useState(0)

  useEffect(() => {
    const page = pageRef.current
    if (!page) return

    const fit = () => {
      setScale(Math.min(1, window.innerWidth / CANVAS_WIDTH))
      setPageHeight(page.offsetHeight)
    }

    fit()
    window.addEventListener('resize', fit)
    const observer = new ResizeObserver(fit)
    observer.observe(page)

    return () => {
      window.removeEventListener('resize', fit)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      className="viewport"
      id="pp-viewport"
      style={scale < 1 && pageHeight ? { height: pageHeight * scale } : undefined}
    >
      <div
        ref={pageRef}
        className="page"
        id="pp-canvas"
        style={{
          transform: scale < 1 ? `scale(${scale})` : undefined,
          marginLeft: scale < 1 ? 0 : undefined,
        }}
      >
        {children}
      </div>
    </div>
  )
}
