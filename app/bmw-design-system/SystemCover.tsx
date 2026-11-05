import React from 'react'
import './system-editorial.css'

export function SystemCover({ landscape }: { landscape: string }) {
  return <header className="ev-hero" id="cover">
    <img className="ev-hero-scene" src={landscape} alt="Portfolio artwork of a BMW overlooking the Alps at sunset"/>
    <div className="ev-intro">
      <small>JIN LU　/　DESIGN LEAD</small>
      <h1>BMW Mobility<br/>Design System.</h1>
      <p>I led six designers and the BMW app design system.</p>
    </div>
  </header>
}
