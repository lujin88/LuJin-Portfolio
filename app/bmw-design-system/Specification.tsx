'use client'

import React, {useState} from 'react'
import {RemoteAction, states, type ClimateState, type Language} from './RemoteAction'

const names:Record<ClimateState,string>={ready:'Ready',empty:'Empty',loading:'Loading',pending:'Pending',running:'Confirmed',error:'Error / retry',engine:'Engine restricted',power:'No power',long:'Long text'}
export function Specification(){
 const [state,setState]=useState<ClimateState>('ready')
 const [language,setLanguage]=useState<Language>('en')
 return <section className="ms-section rx-spec" id="spec">
   <small>COMPONENT SPEC　/　REMOTE ACTION</small>
   <h2>One control, nine states.</h2>
   <div className="rx-controls">
     <label>State <select value={state} onChange={e=>setState(e.target.value as ClimateState)}>{states.map(s=><option value={s} key={s}>{names[s]}</option>)}</select></label>
     <label>Specimen language <select value={language} onChange={e=>setLanguage(e.target.value as Language)}><option value="en">English</option><option value="de">German</option></select></label>
   </div>
   <div className="rx-pair">{[false,true].map(dark=><article key={String(dark)}><small>{dark?'DARK':'LIGHT'} SPECIMEN</small><RemoteAction dark={dark} state={state} language={language} onRequest={()=>setState('pending')}/></article>)}</div>
   {state==='pending'&&<div className="rx-sim"><button onClick={()=>setState('running')}>Simulate confirmation</button><button onClick={()=>setState('error')}>Simulate failure</button></div>}
   <details className="rx-guidance"><summary>Usage &amp; accessibility</summary>
     <dl><dt>Anatomy</dt><dd>Status, one action, an optional reason and Help. Reuse the action across power sources. Put the constraint in the reason.</dd>
     <dt>Contrast</dt><dd>Target 4.5:1 for text and 3:1 for the focus ring against its surface. Secondary text measures 6.15:1 on the white canvas and 8.82:1 on the dark canvas. Explain unavailability in words. <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html">Contrast guidance ↗</a></dd>
     <dt>Keyboard</dt><dd>Tab to the action, then Help when present. Enter or Space activates it. An unavailable action stays focusable and announces its reason. A pending request cannot be sent twice.</dd>
     <dt>Touch &amp; reflow</dt><dd>44 × 44 px minimum targets. Let labels wrap and stack the button on narrow screens. Try Long text in German.</dd>
     <dt>Status</dt><dd>Announce changes politely without moving focus. Keep status text visible with reduced motion enabled.</dd></dl>
   </details>
 </section>
}

export function MotionGuide(){
 return <section className="ms-section rx-motion" id="motion"><small>MOTION SPEC　/　REMOTE ACTION</small><h2>Feedback at the point of input.</h2>
   <dl><dt>Pointer press</dt><dd>Scale to 0.98 on press. Release over 120 ms with cubic-bezier(0.23, 1, 0.32, 1).</dd>
     <dt>Status updates</dt><dd>0 ms. Show pending, failure and confirmation as soon as the state changes. The vehicle response controls timing.</dd>
     <dt>When to skip motion</dt><dd>Keyboard activation, repeated status updates and reduced-motion mode use no transform. Help opens immediately.</dd></dl>
 </section>
}
