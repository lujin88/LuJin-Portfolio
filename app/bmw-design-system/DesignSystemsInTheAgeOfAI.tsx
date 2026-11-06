'use client'
import React from 'react'
import {Cover, Decisions, Inventory} from './AppEvidence'
import './case.css'

import { FutureReview } from './ReviewFigure'
export function DesignSystemsInTheAgeOfAI() {
  return <main className="ev-book" id="top" lang="en">
    <Cover/>
    <nav aria-label="Case study chapters"><a href="#decision">Design decision</a><a href="#components">Component library</a><a href="#handoff">2026 perspective</a></nav>
    <Decisions/><Inventory/><FutureReview/>
    <footer><small>JIN LU　/　DESIGN LEAD</small><a href="#top">Back to top ↑</a></footer>
  </main>
}
