'use client'

import React, { useState } from 'react'
import { ArrowUpRight, BatteryCharging, Gauge, LockKeyhole, Moon, Snowflake, Sun } from 'lucide-react'
import { carArt } from './specimens'

export function VehiclePlate({lightRef, darkRef, onVehicle}:{
  lightRef:string; darkRef:string; onVehicle:()=>void
}){
  const [night,setNight]=useState(false)
  return <div className="vp-wrap">
    <section className="vp-board ms-theme" data-night={night} aria-label="Redesigned vehicle status specimen">
      <header className="vp-head">
        <div><small>SHOWCASE　/　01</small><h3>Vehicle status</h3></div>
        <div className="vp-mode" role="group" aria-label="Vehicle preview theme">
          <button type="button" aria-pressed={!night} onClick={()=>setNight(false)} aria-label="Light vehicle preview"><Sun size={16}/></button>
          <button type="button" aria-pressed={night} onClick={()=>setNight(true)} aria-label="Dark vehicle preview"><Moon size={16}/></button>
        </div>
      </header>
      <div className="vp-scene">
        <div className="vp-status"><i/>All good.</div>
        <img src={carArt} alt="Blue-gray BMW iX3 in front three-quarter view"/>
      </div>
      <div className="vp-readings">
        <div><small><BatteryCharging size={15}/>Battery</small><strong>58<span>%</span></strong></div>
        <div><small><Gauge size={15}/>Est. range</small><strong>261<span>mi</span></strong></div>
      </div>
      <nav className="vp-actions" aria-label="Explore remote actions">
        <a href="#screens" onClick={onVehicle}><LockKeyhole size={16}/>Locks<ArrowUpRight size={14}/></a>
        <a href="#climate"><Snowflake size={16}/>Climate<ArrowUpRight size={14}/></a>
      </nav>
    </section>
    <details className="vp-sources"><summary>Original BMW references</summary>
      <div><figure><img src={lightRef} alt="Supplied BMW light vehicle status reference"/><figcaption>Light</figcaption></figure>
      <figure><img src={darkRef} alt="Supplied BMW dark vehicle status reference"/><figcaption>Dark</figcaption></figure></div>
    </details>
  </div>
}
