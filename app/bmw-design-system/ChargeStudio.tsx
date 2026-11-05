'use client'

import React, {useState} from 'react'
import {Fan, Minus, Plus, SlidersHorizontal} from 'lucide-react'
import {RemoteAction, type ClimateState} from './RemoteAction'

import {scenarios, climateAvailability} from './ClimateRules'

export function ClimateStudio(){
  const [condition, setCondition] = useState(0)
  const [state, setState] = useState<ClimateState>('ready')
  const [target, setTarget] = useState(21)

  function changeCondition(next:number){
    setCondition(next)
    setState(climateAvailability(scenarios[next].inputs))
  }

  return <section id="climate" className="cc-unit" aria-label="Remote climate simulation">
    <header className="cc-head"><h2>Cabin climate</h2><small>DEMO</small></header>
    <RemoteAction state={state} onRequest={()=>setState('pending')} actionIcon={<Fan size={20} aria-hidden="true"/>}>
      <div className="cc-setting">
        <small>Target temperature</small>
        <div className="cc-temperature"><output aria-label="Target temperature">{target}<span>°C</span></output>
          <div className="cc-step">
            <button type="button" disabled={target===16} aria-label="Decrease target temperature" onClick={()=>setTarget(target-1)}><Minus size={15}/></button>
            <button type="button" disabled={target===28} aria-label="Increase target temperature" onClick={()=>setTarget(target+1)}><Plus size={15}/></button>
          </div>
        </div>
      </div>
    </RemoteAction>
    <footer className="cc-tools"><label><SlidersHorizontal size={13} aria-hidden="true"/> Demo condition
      <select value={condition} onChange={e=>changeCondition(Number(e.target.value))}>
        {scenarios.map((scenario,i)=><option key={scenario.label} value={i}>{scenario.label}</option>)}
      </select>
    </label>{state==='pending'&&<button type="button" onClick={()=>setState('running')}>Confirm reply ↗</button>}</footer>
  </section>
}
