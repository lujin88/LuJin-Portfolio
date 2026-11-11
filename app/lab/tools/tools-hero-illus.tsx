'use client'

import { useRef } from 'react'
import { Scene } from '../way-of-work/field-notes'
import '../way-of-work/field-notes.css'

/** HIW field-notes hero scene (worktable), same SVG mask/blend as /lab/way-of-work — PM #7819 / Lu #7816 */
const HIW_HERO = 0

export function ToolsHeroIllus() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  return (
    <div className="tools-hero__illus-wrap" ref={parallaxRef} data-tools-parallax="0.22">
      <Scene index={HIW_HERO} />
    </div>
  )
}
