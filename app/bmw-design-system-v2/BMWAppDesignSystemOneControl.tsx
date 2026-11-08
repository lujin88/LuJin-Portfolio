'use client'
import React, { useState } from 'react'
import { ClimateTiles } from '../bmw-design-system/RebuiltComponents'
import { Stage } from './stageshow/stage'
import './one-control.css'

const profiles = [
  { name: 'Electric', equipment: 'Electric climate', market: 'Permitted', action: 'Remote climate' },
  { name: 'Petrol', equipment: 'Engine start', market: 'Permitted', action: 'Remote engine start' },
  { name: 'Restricted', equipment: 'Engine start', market: 'Restricted', action: 'Entry omitted' }
]
const states = [
  ['Available', 'Available for this vehicle and market.'],
  ['Confirm', 'Show the run time before confirmation.'],
  ['Connecting', 'Request sent. Waiting for the car.'],
  ['Running', 'The car confirmed it started.'],
  ['Error', 'Climate could not start.']
]
function SignalStudy({step}:{step:number}) {
  const messages = ['Control available', 'Confirm run time', 'Awaiting vehicle reply', 'Vehicle confirmed', 'Start unsuccessful']
  return <figure className="oc-signal" data-step={step} aria-label="Remote climate request">
    <div className="oc-signal-path" aria-hidden="true">
      <span className="oc-endpoint"><svg viewBox="0 0 32 32"><rect x="8" y="2" width="16" height="28" rx="4"/><path d="M14 26h4"/></svg></span>
      <i className="oc-first-link"/>
      <span className="oc-endpoint"><svg viewBox="0 0 32 32"><rect x="3" y="5" width="26" height="9" rx="3"/><rect x="3" y="18" width="26" height="9" rx="3"/><path d="M8 10h2m-2 13h2"/></svg></span>
      <i className="oc-last-link"/>
      <img src="/assets/images/bmw-system/bmw-ix3.png" alt=""/>
    </div>
    <div className="oc-signal-labels"><span>App</span><span>Server</span><span>Vehicle</span></div>
    <figcaption aria-live="polite"><i aria-hidden="true"/>{messages[step]}</figcaption>
  </figure>
}
function ComponentStudy({step,setStep}:{step:number;setStep:(step:number)=>void}) {
  const [theme, setTheme] = useState('Light')
  return <figure className="oc-study">
    <div className="oc-tools"><b>Climate control</b><div role="group" aria-label="Specimen appearance">
      {['Light','Dark'].map(t => <button type="button" key={t} aria-pressed={t===theme} onClick={()=>setTheme(t)}>{t}</button>)}
    </div></div>
    <div className="oc-sample oc-scene" data-theme={theme}>
      <Stage specimen width={520} height={185} compact={{below:465,width:358,height:140}} theme={theme==='Dark'?'dark':'light'} fidelity="realistic">
        {() => <div className="oc-shot">
          <ClimateTiles state={step===0?'Off':states[step][0]}/>
        </div>}
      </Stage>
    </div>
    <figcaption className="oc-states">
      <div role="group" aria-label="Inspect request state">{states.map(([name],i)=><button key={name} type="button" aria-pressed={i===step} onClick={()=>setStep(i)}>{name}</button>)}</div>

      <details className="oc-evidence"><summary>View original disclosure</summary>
        <img src="/assets/images/bmw-system/engine-disclosure.png" alt="My BMW App disclaimer explaining that Remote Engine Start runs for 15 minutes and must be enabled in the car" loading="lazy"/>
      </details>
    </figcaption>
  </figure>
}
function RuleModel() {
  const [open,setOpen]=useState<number|null>(3)
  const [approved,setApproved]=useState(false)
  const [theme,setTheme]=useState('Dark')
  const rows=[...profiles,{equipment:'New configuration',market:'Permitted',action:'Remote engine start'}]
  return <figure className="oc-review"><div className="oc-review-card">
    <div className="oc-review-title"><b>Model × market</b><small>Concept · agent preview</small></div>
    <div className="oc-review-grid oc-review-head">{['Equipment','Market','Control','Status'].map(c=><span key={c}>{c}</span>)}</div>
    {rows.map((r,i)=>{
      const pending=i===3&&!approved, omitted=r.market==='Restricted'
      return <div key={i}>
        <button type="button" className="oc-review-grid oc-review-row" data-new={i===3} aria-expanded={open===i} aria-controls={'review-panel-'+i} onClick={()=>setOpen(open===i?null:i)}>
          <b>{r.equipment}</b><span>{r.market}</span><span>{r.action}</span><strong data-pending={pending}>{pending?'● Ready for review':'✓ Approved'}</strong>
        </button>
        <div id={'review-panel-'+i} hidden={open!==i} className="oc-review-panel">
          <div className="oc-tools"><b>{omitted?'No states generated':'5 states generated · '+r.action}</b>
          {!omitted&&<div role="group" aria-label="Specimen appearance">{['Light','Dark'].map(t=><button key={t} type="button" aria-pressed={t===theme} onClick={()=>setTheme(t)}>{t}</button>)}</div>}</div>
          {omitted?<div className="oc-review-empty">No control generated · entry omitted</div>:<div className="oc-review-tiles oc-sample" data-theme={theme}>{states.map(([state],j)=><div key={state}><ClimateTiles state={j===0?'Off':state}/><small>{state}</small></div>)}</div>}
          <div className="oc-review-foot"><span aria-live="polite" data-pending={pending}>{pending?'⚠ Error wording not reviewed for this market.':'Approved by the team.'}</span><button type="button" disabled={!pending} onClick={()=>setApproved(true)}>{pending?'Approve rule':'Approved'}</button></div>
        </div>
      </div>
    })}
    </div><figcaption>Same table as 2020. The row that used to say ‘Manual check’ now arrives with its states generated.</figcaption></figure>
}
export function BMWAppDesignSystemOneControl() {
  const [step,setStep]=useState(2)
  return <main className="one-control" lang="en" id="top">
    <header className="oc-hero">
      <img src="/assets/images/bmw-system/ix3-landscape.webp" alt="BMW overlooking the Alps at sunset" fetchPriority="high"/>
      <div><span>BMW App Design System · 2020 · Futurice</span>
      <h1>One button<br/>for the driver.</h1>
      <p>Every model’s rules behind it.</p></div>
    </header>
    <div className="oc-role"><strong>Lu Jin <span>/ Design Lead</span></strong><p>I led six designers and the BMW app design system.</p></div>
    <section className="oc-built" id="built">
      <div className="oc-section-intro"><span className="oc-kicker">2020 · Climate control</span><h2>One control,<br/>three rules.</h2>
      <SignalStudy step={step}/>
      <details className="oc-evidence"><summary>Design rules</summary>
        <ul><li>Omit engine start in restricted markets.</li><li>Show run time before confirmation.</li><li>Show Running only after the vehicle replies.</li></ul>
      </details></div><ComponentStudy step={step} setStep={setStep}/>
    </section>
    <section className="oc-cost" id="cost">
      <div><h2>Every new model<br/>meant an Excel check.</h2></div>
      <figure className="oc-matrix"><figcaption>Model × market <span>Example configurations</span></figcaption>
        <table><thead><tr><th>Equipment</th><th>Market</th><th>Control</th></tr></thead><tbody>
          {profiles.map(p=><tr key={p.name}><td>{p.equipment}</td><td>{p.market}</td><td>{p.action}</td></tr>)}
          <tr><td>New configuration</td><td>Unverified</td><td>Manual check</td></tr>
        </tbody></table>
      </figure>
    </section>
    <section className="oc-future" id="now">
      <div className="oc-future-copy"><span className="oc-kicker">2026 · Proposed</span><h2>Review the rule once.</h2>
        <p>I’d use an agent to flag affected models and preview their states in both themes. The team would approve the rule before it ships.</p>
        <details className="oc-review-notes"><summary>What I’d test</summary>
          <p>Generate only reachable states. Flag missing cases, timeouts and error wording for review.</p>
          <p>Try a warning when recent signal data is available. A missing reply alone can’t explain why a car is unreachable.</p>
        </details>
      </div>
      <RuleModel/>
    </section>
    <footer><span>Lu Jin / Design Lead</span><a href="#top">Back to top ↑</a></footer>
  </main>
}
