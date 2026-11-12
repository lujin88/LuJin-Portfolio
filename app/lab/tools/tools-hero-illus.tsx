'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { mountEnsembleMotion } from '../way-of-work/ensemble-motion'
import { Scene } from '../way-of-work/field-notes'
import '../way-of-work/field-notes.css'

/** HIW Step 2 (team / judgement scene), same mask+multiply as way-of-work — PM #7848 / Lu #7841 */
const TOOLS_HERO_SCENE = 2

export function ToolsHeroIllus() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const svg = wrapRef.current?.querySelector('svg.ww-drawing')
    if (svg instanceof SVGSVGElement) {
      svg.dataset.toolsParallax = '0.22'
    }
  }, [])

  useEffect(() => {
    const root = wrapRef.current
    if (!root) return
    return mountEnsembleMotion(root, null)
  }, [])

  return (
    <div className="tools-hero__illus-wrap" ref={wrapRef}>
      <Scene index={TOOLS_HERO_SCENE} heroArt />
    </div>
  )
}
