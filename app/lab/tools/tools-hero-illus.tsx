'use client'

import { useLayoutEffect, useRef } from 'react'
import { Scene } from '../way-of-work/field-notes'
import '../way-of-work/field-notes.css'

/** HIW field-notes hero scene (worktable), same SVG mask/blend as /lab/way-of-work — PM #7819 / Lu #7816 */
const HIW_HERO = 0

export function ToolsHeroIllus() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const svg = wrapRef.current?.querySelector('svg.ww-hero-art')
    if (svg instanceof SVGSVGElement) {
      svg.dataset.toolsParallax = '0.22'
    }
  }, [])

  return (
    <div className="tools-hero__illus-wrap" ref={wrapRef}>
      <Scene index={HIW_HERO} />
    </div>
  )
}
