'use client'

import React, {useState} from 'react'
import {RemoteAction} from './RemoteAction'

export type Capability = { requiresEngine: boolean; engineStartAllowed: boolean; hasPower: boolean }

// Showcase policy. Both the hero and the extension example use this decision order.
export function climateAvailability(cap:Capability):'power'|'engine'|'ready' {
  if (!cap.hasPower) return 'power'
  if (cap.requiresEngine && !cap.engineStartAllowed) return 'engine'
  return 'ready'
}

export const scenarios = [
  {label:'Ready', inputs:{hasPower:true, requiresEngine:false, engineStartAllowed:false}},
  {label:'Engine restricted', inputs:{hasPower:true, requiresEngine:true, engineStartAllowed:false}},
  {label:'No power', inputs:{hasPower:false, requiresEngine:false, engineStartAllowed:false}},
] as const

export function ScaleExample(){
  const [inputs,setInputs]=useState<Capability>({requiresEngine:true,engineStartAllowed:false,hasPower:true})
  const [request,setRequest]=useState<'idle'|'pending'|'running'>('idle')
  const eligibility=climateAvailability(inputs)
  function change(key:keyof Capability){
    setInputs({...inputs,[key]:!inputs[key]})
    setRequest('idle')
  }
  return <article className="scale-example">
    <div><small>PROPOSED WORKFLOW　/　SIMULATED PROFILE</small><h3>Add a vehicle profile</h3>
      <fieldset><legend>Capability inputs</legend>
      {([['requiresEngine','Climate requires engine'],['engineStartAllowed','Remote engine start permitted'],['hasPower','Power available']] as const).map(([key,label])=>
        <label key={key}><input type="checkbox" checked={inputs[key]} onChange={()=>change(key)}/>{label}</label>)}
      </fieldset>
    </div>
    <div className="scale-result"><small>SHARED COMPONENT</small>
      <RemoteAction state={eligibility==='ready'&&request!=='idle'?request:eligibility} onRequest={()=>setRequest('pending')}/>
      {request==='pending'&&<button onClick={()=>setRequest('running')}>Simulate vehicle reply ↗</button>}
    </div>
  </article>
}
