'use client'
import React, { useState } from 'react'
import { ShieldCheck, BatteryMedium } from 'lucide-react'
import { Glyph, ClimateTiles, StatusTiles, RemoteActionRow, RangeReading, ServiceTiles } from './RebuiltComponents'
import './live.css'
import './refined.css'
export function DecisionDemo() {
  return <section className="ev-section choice-layout" id="baseline">
    <div className="choice-intro"><small>THEN　/　THE BMW APP</small>
      <h2 id="decision">Building the remote start control.</h2>
      <p>We checked each model and market in Excel. I led the team in turning those decisions into one set of component rules for light and dark mode.</p>
    </div>
    <div className="decision-sequence">
      <div><h3>What should drivers see?</h3><p>We left the control out where engine start wasn’t permitted. Where it was available, we showed the run time before confirmation and kept technical detail in Help.</p></div>
      <div><h3>What does “Connecting” mean?</h3><p>The server could receive a request while the car was out of reach. Until the car replied, the control stayed on Connecting. We couldn’t tell the driver the engine had started.</p></div>
    </div>
  </section>
}
const families = [
  { name: 'Climate and controls', modes: ['Light', 'Dark'], rule: 'Climate shows its current state. Controls names the destination.' },
  { name: 'Status and charge', modes: ['Light', 'Dark'], rule: 'Keep vehicle status and charge side by side. Give the range and its unit the strongest emphasis.' },
  { name: 'Remote actions', modes: ['Dark'], rule: 'Keep the five actions in a fixed order, from lock to climate.' },
  { name: 'Combined range', modes: ['Dark'], rule: 'Pair the range with its unit so the reading works in miles or kilometres.' },
  { name: 'Service tiles', modes: ['Light'], rule: 'Place the service name above its message or expiry notice.' },
] as const

function LightStatusTiles({open}: {open:(part:string)=>void}) {
  return <div className="rb-unit"><div className="rb-tiles">
    <div className="rb-tile"><b>Status</b><span>All good</span>
      <div className="rb-tile-bottom"><Glyph name="lock"/><ShieldCheck size={17}/></div></div>
    <button className="rb-tile" onClick={() => open('State of charge')}><b>State of charge</b><span>58%</span>
      <div className="rb-tile-bottom"><BatteryMedium size={18}/><strong>261<small>mi</small></strong></div></button>
  </div></div>
}

const anatomy:Record<string,string> = {

  'Combined range':'The number and unit stay together.',
  'View Appointment':'A new message appears under the service name.',
  'Connected Drive Upgrades':'An expiry notice appears under the upgrade name.',
  Lock:'Request a lock. Wait for the vehicle to report its state.',
  Unlock:'Request an unlock. Wait for the vehicle to report its state.',
  Lights:'Request a light flash.', Horn:'Request a horn signal.'
}

function InteractivePanel({family,mode}: {family:string;mode:string}) {
  const light = mode === 'Light'
  const [page,setPage] = useState('Specimen')
  const [full,setFull] = useState(false)
  const [faulted,setFaulted] = useState(false)
  function open(part:string) {
    setPage(part)
    setFaulted(false)
  }
  const status = light ? <LightStatusTiles open={open}/> :
    <StatusTiles onOpen={open} status={full?'Update almost ready':'All good'}
      charge={full?'Fully charged':'Charging…'} miles={full?204:216}/>
  function sample(){
    switch(family) {
      case 'Climate and controls': return <ClimateTiles onOpen={open}/>
      case 'Status and charge': return status
      case 'Remote actions': return <RemoteActionRow onSelect={open}/>
      case 'Combined range': return <RangeReading onOpen={open}/>
      default: return <ServiceTiles onOpen={open}/>
    }
  }
  let body
  if(page==='Specimen') body=sample()
  else if(page==='State of charge') body=<div className="part-focus">
    <b>{light?'State of charge':full?'Fully charged':'Charging…'}</b>
    <strong>{light?'58':full?'100':'79'}% <span>/ {light?'261':full?'204':'216'} mi</span></strong>
    {!light && <div className="part-variants" aria-label="Charge state">{['Charging','Fully charged'].map((v,i)=><button key={v} aria-pressed={full===Boolean(i)} onClick={()=>setFull(Boolean(i))}>{v}</button>)}</div>}
  </div>
  else if(page==='Controls') body=<div className="part-focus"><b>Remote actions</b><RemoteActionRow onSelect={open}/></div>
  else if(page==='Climate') body=<div className="part-focus">
    <b>{faulted?'Component Issue':'Climate'}</b>
    <p>{faulted?'Your vehicle cannot start the climate control functions due to an issue with a vehicle component.':'Off'}</p>
    <button className="part-link" onClick={()=>setFaulted(!faulted)}>{faulted?'Show resting state':'Inspect fault message'}</button>
  </div>
  else body=<div className="part-focus"><b>{page}</b><p>{anatomy[page]}</p></div>
  return <figure aria-label={mode+' mode: '+family} className={'atlas-panel atlas-'+mode.toLowerCase()}>
    <div className="atlas-unit" aria-live="polite">
      {page!=='Specimen' && <button className="sample-back" onClick={()=>open('Specimen')}>← Back to tiles</button>}
      {body}
    </div>
  </figure>
}
export function ComponentLab() {
  return <section className="ev-section library-stream" id="components">
    <header id="screens"><h2>Vehicle components.</h2><div className="theme-key"><span>Light mode</span><span>Dark mode</span></div></header>
    {[1, 0, 2, 3, 4].map(index => {
      const family = families[index]
      return <article key={family.name} className="stream-entry">
        <div className="stream-copy">
          <h3>{family.name}</h3><p>{family.rule}</p>
        </div>
        <div className="stream-samples">
          {family.modes.map(mode => <InteractivePanel key={mode} family={family.name} mode={mode}/>)}
        </div>
      </article>
    })}
  </section>
}
