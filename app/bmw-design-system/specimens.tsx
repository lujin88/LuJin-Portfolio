'use client'

import React, { useId, useState } from 'react'
import { BatteryCharging, BookOpen, CarFront, ChevronRight, Gauge, Headphones, LockKeyhole, MapPin, PlugZap, Radio, Route, ShieldCheck, Snowflake, UnlockKeyhole, Wrench, Zap } from 'lucide-react'

export const carArt='/assets/images/bmw-system/i4-complete.png'
export const journeys=['Vehicle','Planner','Charging','Explore','Services']
const navIcons=[CarFront,Route,PlugZap,BookOpen,Wrench]
export const notes=[
 ['Vehicle overview','Lead with the confirmed vehicle state. Range and energy share one metric tile. A remote command has its own pending state.'],
 ['Trip planner','Draw the route and its stops from the same station list. A capacity label always includes the free and total connector counts.'],
 ['Charging session','Separate the measured charge from the adjustable target. A solid trace marks measured power. Dashes show the forecast.'],
 ['Owner guide','A feature tile and compact lesson rows use the same title, secondary text and disclosure arrow.'],
 ['Service centre','An appointment sits above service rows. A maintenance status belongs beside its service name.'],
]
export function Meter({value,label}:{value:number;label:string}){return <div className="ms-meter" role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}><i style={{width:value+'%'}}/></div>}
export function Tag({children,tone='good'}:{children:React.ReactNode;tone?:string}){return <span className={'ms-tag '+tone}><i/>{children}</span>}
function Row({icon:Icon,title,sub,onClick}:{icon:typeof CarFront;title:string;sub:string;onClick:()=>void}){return <button className="ms-row" onClick={onClick}><Icon size={19}/><span><b>{title}</b><small>{sub}</small></span><ChevronRight size={15}/></button>}
function Tile({icon:Icon,title,value}:{icon:typeof CarFront;title:string;value:string}){return <div className="ms-tile"><Icon size={17}/><small>{title}</small><b>{value}</b></div>}
const stops=[['Westpark','22 kW','2 / 2'],['City centre','150 kW','1 / 2'],['North garage','150 kW','0 / 2']]
function MapArt({selected}:{selected:number}){const patternId=useId();return <svg className="ms-map" viewBox="0 0 320 160" role="img" aria-label={'Route to '+stops[selected][0]}><defs><pattern id={patternId} width="47" height="38" patternUnits="userSpaceOnUse" patternTransform="rotate(-15)"><rect x="3" y="4" width="39" height="28" rx="3" fill="var(--mapBlock)"/></pattern></defs><rect width="320" height="160" fill="var(--tile)"/><rect width="320" height="160" fill={'url(#'+patternId+')'}/><path d="M-20 130Q90 103 129 121T340 89" stroke="var(--water)" strokeWidth="16" fill="none"/><path d="M20 146l51-14 20-50 82-19 21 13 67-24" stroke="var(--blue)" strokeWidth="4" fill="none"/>{[[91,82],[173,63],[261,52]].map(([x,y],i)=><g key={x}><circle cx={x} cy={y} r={selected===i?12:9} fill={selected===i?'var(--blue)':'var(--ink)'}/><text x={x} y={y+3.5} fill="var(--sheet)" textAnchor="middle" fontSize="10">{i+1}</text></g>)}</svg>}
function Curve(){return <svg className="ms-curve" viewBox="0 0 300 88" aria-label="Measured and forecast charging power" role="img"><path d="M3 18h292M3 46h292M3 76h292" stroke="var(--line)" fill="none"/><path d="M5 75l9-53 6-5h143v59H5z" fill="var(--blue)" opacity=".13"/><path d="M5 75l9-53 6-5h143" stroke="var(--blue)" strokeWidth="3" fill="none"/><path d="M163 17q36 0 62 29t69 23" stroke="var(--muted)" strokeWidth="2" strokeDasharray="4 4" fill="none"/></svg>}
export function useDemo(){
 const [lock,setLock]=useState<'locked'|'unlocked'>('locked')
 const [pending,setPending]=useState(false)
 const [target,setTarget]=useState(85),[stop,setStop]=useState(0),[detail,setDetail]=useState(''),[online,setOnline]=useState(true)
 const command=()=>{if(!online)return; if(pending)setLock(lock==='locked'?'unlocked':'locked'); setPending(!pending)}
 const connection=()=>{setPending(false);setOnline(!online)}
 return {lock,pending,command,target,setTarget,stop,setStop,detail,setDetail,online,connection}
}
type Demo=ReturnType<typeof useDemo>
export function Screen({tab,select,dark,demo}:{tab:number;select:(i:number)=>void;dark:boolean;demo:Demo}){
 const d=demo
 return <article className="ms-screen ms-theme" data-night={dark}><header><b>MY BMW</b><span>My vehicle</span></header><div className="ms-app">
 {tab===0&&<><h3>All good.</h3><div className="ms-vehicle"><img src={carArt} alt="Blue-gray BMW iX3"/></div><div className="ms-duo"><Tile icon={Gauge} title="Est. range" value="261 mi"/><Tile icon={BatteryCharging} title="Battery" value="58%"/></div><div className="ms-lock"><span><LockKeyhole size={15}/> {d.lock==='unlocked'?'Unlocked':'Locked'}</span><Tag tone={d.online?'good':'warn'}>{d.online?'Connected':'Offline'}</Tag></div><button className="ms-primary" disabled={!d.online} onClick={d.command}>{d.pending?'Simulate vehicle confirmation':d.lock==='locked'?'Unlock vehicle':'Lock vehicle'}</button><button className="ms-text" onClick={d.connection}>{d.online?'Simulate disconnection':'Reconnect vehicle'}</button>{d.pending&&<small role="status">Request sent · waiting for vehicle</small>}</>}
 {tab===1&&<><h3>Find a charger.</h3><MapArt selected={d.stop}/><div className="ms-between"><b>Munich</b><small>3 STATIONS</small></div>{stops.map(([n,kw,qty],i)=><button key={n} className="ms-stop" aria-pressed={i===d.stop} onClick={()=>d.setStop(i)}><MapPin size={16}/><span><b>{n}</b><small>{kw}</small></span><Tag tone={['good','warn','bad'][i]}>{qty} free</Tag></button>)}</>}
 {tab===2&&<><small>ACTIVE SESSION</small><h3>Charging.</h3><div className="ms-big">58<small>%</small></div><Meter value={58} label="Measured charge"/><div className="ms-between"><small>MEASURED</small><small>TARGET {d.target}%</small></div><label className="ms-target"><b>Charge target</b><span>{d.target}%</span><input aria-label="Charge target" type="range" min="60" max="100" step="5" value={d.target} onChange={e=>d.setTarget(+e.target.value)}/></label><details className="ms-session-more"><summary>Session details</summary><div className="ms-duo"><Tile icon={Zap} title="Power" value="150 kW"/><Tile icon={PlugZap} title="Delivered" value="19 kWh"/></div><Curve/></details><details className="ms-session-more"><summary>Help with charging</summary><p>Check the station display. For help, use the operator contact on the station.</p></details></>}
 {tab===3&&<><h3>Explore your BMW.</h3><div className="ms-editorial"><img src={carArt} alt="iX3 feature guide"/><b>Get to know your vehicle</b></div>{[['Charging basics','Set a target before plugging in.'],['Range in winter','Precondition the cabin while connected.']].map(([n,t],i)=><React.Fragment key={n}><Row icon={i?Snowflake:PlugZap} title={n} sub="Owner tutorial" onClick={()=>d.setDetail(d.detail===n?'':n)}/>{d.detail===n&&<p className="ms-answer">{t}</p>}</React.Fragment>)}</>}
 {tab===4&&<><h3>Service centre.</h3><div className="ms-appointment"><small>NEXT APPOINTMENT</small><b>18 November</b><span>10:00 · Vehicle inspection</span><Tag>Scheduled</Tag></div>{[['Service plan','Plan active','Routine inspection and maintenance are included.'],['ConnectedDrive','1 renewal due','Parking Assistant renews on 30 November.'],['Contact service','Service partner','BMW Service Munich · Weekdays 08:00–18:00.']].map(([n,sub,t],i)=><React.Fragment key={n}><Row icon={[ShieldCheck,Radio,Headphones][i]} title={n} sub={sub} onClick={()=>d.setDetail(d.detail===n?'':n)}/>{d.detail===n&&<p className="ms-answer">{t}</p>}</React.Fragment>)}</>}
 </div><nav aria-label={(dark?'Dark':'Light')+' app navigation'}>{journeys.map((name,i)=>{const Icon=navIcons[i];return <button key={name} aria-current={tab===i?'page':undefined} onClick={()=>select(i)}><Icon size={17}/>{name}</button>})}</nav></article>
}
export function Atlas({night}:{night:boolean}){
 const [active,choose]=useState(0),[count,setCount]=useState(2),[level,setLevel]=useState(85),[expanded,expand]=useState(false),[on,toggle]=useState(false)
 const entries=[
 ['01','Primary action',<button className="ms-primary" onClick={()=>toggle(!on)}>{on?<><UnlockKeyhole size={15}/>Unlocked</>:<><LockKeyhole size={15}/>Unlock demo</>}</button>],
 ['02','Availability badge',<button className="ms-tagbutton" onClick={()=>setCount((count+1)%3)}><Tag tone={['bad','warn','good'][count]}>{count}/2 available</Tag></button>],
 ['03','Metric tile',<Tile icon={Gauge} title="Est. range" value="261 mi"/>],
 ['04','Progress indicator',<div className="ms-fill"><b>58% measured</b><Meter label="Charge progress" value={58}/></div>],
 ['05','Target slider',<label className="ms-target"><b>Target</b><span>{level}%</span><input aria-label="Example target" type="range" min="60" max="100" step="5" value={level} onChange={e=>setLevel(+e.target.value)}/></label>],
 ['06','Disclosure row',<div className="ms-fill"><Row icon={BookOpen} title="Owner guide" sub="Charging basics" onClick={()=>expand(!expanded)}/>{expanded&&<small>Connect the cable before starting a session.</small>}</div>],
 ['07','Segmented control',<div className="ms-segments">{['Nearby','Saved'].map((t,i)=><button key={t} aria-pressed={active===i} onClick={()=>choose(i)}>{t}</button>)}</div>],
 ['08','Unavailable action',<button className="ms-primary" disabled>Vehicle offline</button>],
 ]
 return <div className="ms-atlas ms-theme" data-night={night}>{entries.map(([n,t,el])=><div key={String(n)}><header><small>C.{n}</small><b>{t}</b></header><div className="ms-sample">{el}</div></div>)}</div>
}
