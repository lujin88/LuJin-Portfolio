'use client'
import { useState } from 'react'
import { Glyph, RemoteActionRow, StatusTiles, RangeReading } from './RebuiltComponents'
import '../bmw-design-system-v2/one-control.css'
import './v7.css'
import { ClimateCard } from './ClimateControls'
import './climate-key.css'
import './rule-review.css'
import { Battery, Bell, Signal, Wifi } from 'lucide-react'
import { SheetFocus } from './RuleVisuals'
import { BMWProposedWorkflow } from './BMWProposedWorkflow'
import { Archive } from './PhoneStudies'

const assets = '/assets/images/bmw-system/'
const configurations = [
  {model:'iX3', equipment:'Electric', market:'Market A', cell:'Climate', command:'Remote climate'},
  {model:'320i', equipment:'Petrol', market:'Market A', cell:'Engine start', command:'Remote engine start'},
  {model:'320d', equipment:'Diesel', market:'Market C', cell:'Hidden', command:'Hidden'},
  {model:'530i', equipment:'Petrol', market:'Market B', cell:'Check', command:'Remote engine start'},
]

function RuleModel() {
  const [selection, setSelection] = useState(3)
  const [approved, setApproved] = useState(false)
  const [theme, setTheme] = useState('Dark')
  const [frame, setFrame] = useState<RequestFrame>('available')
  const rule = configurations[selection]
  const hidden = rule.command === 'Hidden'
  const pending = rule.cell === 'Check' && !approved
  const engine = rule.command === 'Remote engine start'
  const connect = () => setFrame(engine ? 'confirm' : 'connecting')

  return <figure className="rp-review">
    <figcaption><strong>Switch car</strong><span>2026 concept</span></figcaption>
    <div className="rp-cars" role="group" aria-label="Switch car">{configurations.map((car,i) =>
      <button key={car.model} type="button" aria-pressed={selection===i} onClick={() => {
        setSelection(i)
        setFrame('available')
      }}>{car.model}</button>)}</div>
    <div className="rp-spread">
      <div className="rp-phone" data-theme={theme} aria-label="Driver preview">
        <div className="rp-system" aria-hidden="true"><b>9:41</b><span/><div><Signal/><Wifi/><Battery/></div></div>
        <header><Bell/><b>BMW {rule.model}</b><Glyph name="vehicle"/></header>
        <div className="rp-display">
          <h3>Remote Services</h3>
          <div className="rp-control"><Glyph name="vehicle"/><b>Controls</b><small>Remote access</small></div>
          {!hidden && <div className="rp-driver" aria-live="polite">
            <div className="ck-specimen mp-climate-controls"><ClimateCard state={frameCopy[frame][0]} pending={frame==='connecting'}/></div>
            {frame==='available' ? <button type="button" onClick={connect}>{engine?'Remote engine start':'Start climate'}</button> :
              frame==='confirm' ? <><p>If enabled, the engine will run for 15 minutes.</p><button type="button" onClick={() => setFrame('connecting')}>Confirm</button></> :
              <><p>{frameCopy[frame][1]}</p>{frame!=='connecting' && <button type="button" onClick={()=>setFrame('available')}>Reset preview</button>}</>}
          </div>}
        </div><i className="rp-home" aria-hidden="true"/>
      </div>
      <div className="rp-inspector" aria-live="polite">
        <span className="rp-meta">{rule.equipment} · {rule.market}</span>
        <div><small>2020 · Manual lookup</small><p>Excel cell <b className="rp-cell">{rule.cell}</b></p></div>
        <div><small>2026 · Generated preview</small><h3>{hidden?'Entry omitted':rule.command}</h3>
          <p>{hidden?'The market rule hides Climate.':'The same Climate states, applied to this car in both themes.'}</p>
        </div>
        <div className="rp-themes" role="group" aria-label="Phone appearance">{['Light','Dark'].map(t=><button key={t} type="button" aria-pressed={theme===t} onClick={()=>setTheme(t)}>{t}</button>)}</div>
        {frame==='connecting' && <div className="rp-reply"><small>Simulate vehicle reply</small><div>{(['running','error'] as const).map(x=><button type="button" key={x} onClick={()=>setFrame(x)}>{x==='running'?'Success':'Error'}</button>)}</div></div>}
        <div className="rp-approval">{pending?<><p>Error wording needs market review.</p><button type="button" onClick={()=>setApproved(true)}>Approve rule</button></>:<b>✓ Approved</b>}</div>
      </div>
    </div>
  </figure>
}

function Spreadsheet(){return (<figure className="xls" aria-label="Illustrative spreadsheet">
        <div className="xls-bar"><span>remote-start-matrix_v14.xlsx</span><span>Sheet 2 of 9</span></div>
        <div className="v7-scroll" tabIndex={0} aria-label="Model and market matrix"><table>
          <thead><tr><th className="rn"></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th></tr>
          <tr className="hdr"><td className="rn">1</td><td>Series</td><td>Model</td><td>Powertrain</td><td>Market A</td><td>Market B</td><td>Market C</td></tr></thead>
          <tbody><tr><td className="rn">2</td><td>3 Series</td><td>320i</td><td>Petrol</td><td className="e">Engine start</td><td className="e">Engine start</td><td className="o">Hidden</td></tr><tr><td className="rn">3</td><td>3 Series</td><td>320d</td><td>Diesel</td><td className="e">Engine start</td><td className="o">Hidden</td><td className="o">Hidden</td></tr><tr><td className="rn">4</td><td>3 Series</td><td>330e</td><td>Plug-in hybrid</td><td className="c">Climate</td><td className="c">Climate</td><td className="c">Climate</td></tr><tr><td className="rn">5</td><td>5 Series</td><td>530i</td><td>Petrol</td><td className="e">Engine start</td><td className="k">Check</td><td className="o">Hidden</td></tr><tr><td className="rn">6</td><td>5 Series</td><td>530e</td><td>Plug-in hybrid</td><td className="c">Climate</td><td className="c">Climate</td><td className="k">Check</td></tr><tr><td className="rn">7</td><td>X3</td><td>X3 xDrive30i</td><td>Petrol</td><td className="e">Engine start</td><td className="e">Engine start</td><td className="o">Hidden</td></tr><tr><td className="rn">8</td><td>iX3</td><td>iX3</td><td>Electric</td><td className="c">Climate</td><td className="c">Climate</td><td className="c">Climate</td></tr><tr><td className="rn">9</td><td>X5</td><td>X5 xDrive45e</td><td>Plug-in hybrid</td><td className="c">Climate</td><td className="k">Check</td><td className="c">Climate</td></tr><tr><td className="rn">10</td><td>i3</td><td>i3 120Ah</td><td>Electric</td><td className="c">Climate</td><td className="c">Climate</td><td className="c">Climate</td></tr><tr><td className="rn">11</td><td>X5</td><td>X5 xDrive40i</td><td>Petrol</td><td className="e">Engine start</td><td className="e">Engine start</td><td className="o">Hidden</td></tr></tbody>
        </table></div>
        <div className="xls-tabs"><span>MY2019</span><span className="on">MY2020</span><span>MY2021 draft</span><span>Changes</span><span>Notes</span><span>…</span></div>
        <figcaption>Illustrative recreation · not the original spreadsheet · markets anonymised</figcaption>
      </figure>)}
type RequestFrame = 'available' | 'confirm' | 'connecting' | 'running' | 'error'

const frameCopy = {
  available: ['Off', 'Ready to start.'],
  confirm: ['Off', 'The engine will run for 15 minutes.'],
  connecting: ['Connecting', 'Waiting for the car.'],
  running: ['Running', 'The car confirmed that climate is on.'],
  error: ['Component issue', 'The car reported a component issue.'],
} as const

function ClimateKeyScreen() {
  const [theme, setTheme] = useState('Light')
  const [frame, setFrame] = useState<RequestFrame>('connecting')
  const [value, message] = frameCopy[frame]
  return <figure className="ck-frame" data-theme={theme} aria-label="Climate request preview">
    <div className="oc-tools"><b>Climate control</b><div role="group" aria-label="Climate appearance">
      {['Light', 'Dark'].map(mode => <button key={mode} type="button" aria-pressed={theme === mode} onClick={() => setTheme(mode)}>{mode}</button>)}
    </div></div>
    <div className="cf-body">
      <div className="ck-specimen mp-climate-controls"><ClimateCard state={value} pending={frame === 'connecting'}/></div>
      <div className="cf-response">
        <p aria-live="polite">{message}</p>
        {frame === 'connecting' && <div role="group" aria-label="Preview vehicle reply">
          <button type="button" onClick={() => setFrame('running')}>Preview success</button>
          <button type="button" onClick={() => setFrame('error')}>Preview error</button>
        </div>}
        {frame === 'available' && <button type="button" onClick={() => setFrame('confirm')}>Start climate</button>}
        {frame === 'confirm' && <button type="button" onClick={() => setFrame('connecting')}>Confirm</button>}
        {(frame === 'running' || frame === 'error') && <button type="button" onClick={() => setFrame('available')}>Replay request</button>}
      </div>
    </div>
  </figure>
}

export function BMWCase(){
 return <main className="one-control v7" id="top" lang="en">
  <header className="oc-hero"><div><span>BMW App Design System · 2020 · Futurice</span><h1>One button<br/>for the driver.</h1><p>Every model’s rules behind it.</p></div></header>
  <div className="oc-role"><strong>Lu Jin <span>/ Design Lead</span></strong><p>I led six designers and the BMW app design system.</p></div>
  <Archive/>
  <section id="built" className="v7-block"><div className="v7-split"><div><span className="oc-kicker">01 · 2020 · Climate control</span><h2>One control,<br/>three rules.</h2>
    <ol className="oc-rules"><li>Hide Climate if it’s unavailable for the driver’s vehicle or market.</li><li>Show the run time before confirmation.</li><li>Show “Running” only after the car replies.</li></ol></div><ClimateKeyScreen/></div>
    <details className="v7-secondary"><summary>Explore the component library</summary><div className="v7-library">
    {[[<RemoteActionRow key="a"/>,'Remote actions','Five actions in a fixed order.'],[<StatusTiles key="b"/>,'Status and charge','Range and unit take priority.'],[<RangeReading key="c"/>,'Combined range','Pair each distance with miles or kilometres.']].map(([view,title,body])=><article key={String(title)}><div>{view}</div><h3>{title}</h3><p>{body}</p></article>)}</div></details>
  </section>
  <section className="v7-block v7-cost v7-split" id="cost"><div><span className="oc-kicker">02 · 2020 · The cost</span><h2>Every new model meant an Excel check.</h2><p>Which command each car got lived in spreadsheets. Every new model added rows. Someone checked each yellow cell by hand.</p></div><div><SheetFocus/><details className="rv-full"><summary>View illustrative spreadsheet</summary><Spreadsheet/></details></div></section>
  <section className="v7-block v7-night" id="now">
    <div className="v7-split">
      <div>
        <span className="oc-kicker">03 · 2026 · Proposed</span>
        <h2>From checking cells<br/>to reviewing rules.</h2>
        <p>In 2020, we checked each new model by hand. I’d now use an agent to apply the model and market rule, generate the states, and flag the wording the team needs to review.</p>
        <div className="oc-review-notes"><h3>What I’d test next</h3><p>Could recent signal data help us warn drivers before sending? A missing reply alone can’t explain why a car is unreachable.</p></div>
      </div>
      <RuleModel/>
    </div>
    <BMWProposedWorkflow/>
  </section>
 </main>
}
