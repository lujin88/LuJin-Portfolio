'use client'
import {useState} from 'react'
import {ClimateCard} from '../../ClimateControls'
import {Glyph} from '../../RebuiltComponents'
import './concepts.css'

const rules = [
  {model:'iX3',market:'A',drive:'Electric',cell:'Climate',command:'Remote climate'},
  {model:'320i',market:'A',drive:'Petrol',cell:'Engine start',command:'Remote engine start'},
  {model:'320d',market:'C',drive:'Diesel',cell:'Hidden',command:'Entry omitted'},
  {model:'530i',market:'B',drive:'Petrol',cell:'Check',command:'Remote engine start'},
]
type Variation = 'driver'|'matrix'|'review'
type Frame = 'Off'|'Confirm'|'Connecting'|'Running'|'Component issue'
const directions = {driver:'Driver view',matrix:'Rule matrix',review:'Review desk'}
export function Concept({variation}:{variation:Variation}) {
  const [idx,setIdx]=useState(variation==='driver'?0:3)
  const [frame,setFrame]=useState<Frame>('Off')
  const [dark,setDark]=useState(variation!=='matrix')
  const [approved,setApproved]=useState(false)
  const r=rules[idx], hidden=r.cell==='Hidden',pending=idx===3&&!approved
  const select=(i:number)=>{setIdx(i);setFrame('Off')}
  const heading=variation==='driver'?'What the driver sees':variation==='matrix'?'Build from the matrix':'Review the exception'
  const modelPicker=<div className="cv-picker" aria-label="Select vehicle" role="group">{rules.map((m,i)=><button type="button" key={m.model} aria-pressed={i===idx} onClick={()=>select(i)}>{m.model}</button>)}</div>
  const phone=<div className="cv-deviceArea"><div className="cv-device" data-dark={dark}>
    <div className="cv-os">9:41 <i/> ▰</div>
    <div className="cv-vehicle"><Glyph name="vehicle"/>BMW {r.model}</div>
    <h3>Remote Services</h3>
    <div className="cv-controls"><Glyph name="vehicle"/><b>Controls</b><small>Remote access</small></div>
    {!hidden&&<div className="cv-request">
      <div className="mp-climate-controls"><ClimateCard state={frame==='Confirm'?'Off':frame} pending={frame==='Connecting'}/></div>
      {frame==='Off'?<button onClick={()=>setFrame(r.drive==='Electric'?'Connecting':'Confirm')}>{r.command}</button>:frame==='Confirm'?<><p>The engine will run for 15 minutes.</p><button onClick={()=>setFrame('Connecting')}>Confirm</button></>:<><p>{frame==='Connecting'?'Waiting for the car.':frame==='Running'?'Confirmed by vehicle.':'The car reported a component issue.'}</p>{frame!=='Connecting'&&<button onClick={()=>setFrame('Off')}>Reset preview</button>}</>}
    </div>}<div className="cv-home"/></div>
    <div className="cv-tools"><button onClick={()=>setDark(!dark)}>{dark?'Light':'Dark'} preview</button>{frame==='Connecting'&&<><button onClick={()=>setFrame('Running')}>Simulate reply</button><button onClick={()=>setFrame('Component issue')}>Simulate fault</button></>}</div></div>
  const review=<div className="cv-signoff"><small>Team review</small><strong>{pending?'Error wording': 'Approved'}</strong><p>{pending?'Check the fault message for Market B.':'This example rule has been reviewed.'}</p>{pending&&<button onClick={()=>setApproved(true)}>Approve wording</button>}</div>
  const trace=<ol className="cv-trace">
    <li><small>2020 · Excel</small><b>{r.cell}</b></li><li><small>2026 · Rule output</small><b>{r.command}</b></li><li><small>Team review</small><b>{pending?'Wording pending':'Approved'}</b></li></ol>
  const matrix=<div className="cv-matrix" role="group" aria-label="Model and market rules"><div className="cv-row cv-head"><span>Vehicle</span><span>Market</span><span>Excel cell</span></div>{rules.map((m,i)=><button className="cv-row" aria-pressed={i===idx} key={m.model} onClick={()=>select(i)}><b>{m.model}<small>{m.drive}</small></b><span>{m.market}</span><span>{m.cell}</span></button>)}</div>
  return <main className={'cv-page cv-'+variation} lang="en"><div className="cv-wrap">
    <nav><a href="/bmw-design-system#now">← BMW Design System</a><span>2026 concept</span></nav>
    <header className="cv-title"><small>{directions[variation]}</small><h1>{heading}</h1><p>{variation==='driver'?'Switch vehicles to see which controls the same rule allows.':variation==='matrix'?'Select an Excel row to see the component it would generate.':'An agent prepares the states. The team decides what is ready.'}</p></header>
    {variation==='driver'?<>
      <section className="cv-scene" data-electric={r.drive==='Electric'}><div className="cv-driver-copy"><small>Vehicle preview</small>{modelPicker}<h2>{r.model}</h2><p>{r.drive} · Market {r.market}</p><strong>{r.command}</strong></div>{phone}</section>
      <section className="cv-lower"><div><small>Rule history</small><h2>Behind this control</h2></div>{trace}{pending&&review}</section></>:
    variation==='matrix'?<section className="cv-workbench"><div><h2>Model × market</h2>{matrix}<div className="cv-binding"><small>Generated binding</small><code>{hidden?'climate.visible = false':r.drive==='Electric'?'climate.command = electricClimate':'climate.command = engineStart'}</code></div>{review}</div><div className="cv-proof"><small>Component proof · Market {r.market}</small>{phone}</div></section>:
    <section className="cv-desk"><aside><small>Rule queue</small>{[3,0,1,2].map(i=><button key={i} aria-pressed={idx===i} onClick={()=>select(i)}><strong>{rules[i].model}</strong><span>{i===3&&!approved?'Needs review':'Approved'}</span></button>)}</aside>
      <article className="cv-paper"><small>Market {r.market} / {r.drive}</small><h2>{pending?'Market wording needs a decision.':'Rule approved.'}</h2><p>{r.model} · {r.command}</p>
      <div className="cv-evidence"><small>2020 · Source cell</small><b>{r.cell}</b><small>2026 · Generated result</small><b>{hidden?'Climate omitted':'Light and dark states'}</b></div>
      {pending&&<blockquote>“The car reported a component issue.”</blockquote>}{review}</article><div className="cv-context"><small>Driver context</small>{phone}</div></section>}
  </div></main>
}
