'use client'
import React from 'react'
import { BatteryMedium } from 'lucide-react'
import {iconGeometry} from './IconGeometry'
import './rebuilt.css'

type GlyphName=keyof typeof iconGeometry
export function Glyph({name}:{name:GlyphName}){
  const {viewBox,path}=iconGeometry[name]
  return <svg className={'rb-glyph rb-icon-'+name} viewBox={viewBox} aria-hidden="true"><path d={path} fill="currentColor" fillRule="evenodd"/></svg>
}
const slots=[['lock','Lock'],['unlock','Unlock'],['lights','Lights'],['horn','Horn'],['fan','Climate']] as const

export function RemoteActionRow({onSelect}:{onSelect?:(action:string)=>void}){
  return <div className="rb-unit"><div className="rb-remote">{slots.map(([glyph,label])=>onSelect
    ? <button type="button" key={glyph} aria-label={label} onClick={()=>onSelect(label)}><Glyph name={glyph}/></button>
    : <span key={glyph} role="img" aria-label={label}><Glyph name={glyph}/></span>)}</div></div>
}
type TileAction = {onOpen?:(label:string)=>void}
function Tile({label,onOpen,children,className}:{label:string;children:React.ReactNode;className?:string}&TileAction){
  return onOpen ? <button className={className} onClick={()=>onOpen(label)}>{children}</button> : <div className={className}>{children}</div>
}
export function RangeReading({value=195,unit='km',onOpen}:{value?:number;unit?:string}&TileAction){
  return <div className="rb-unit"><Tile label="Combined range" className="rb-range" onOpen={onOpen}><span className="rb-range-data"><Glyph name="range"/><span>Combined Range</span><strong>{value}<small>{unit}</small></strong></span></Tile></div>
}
export function StatusTiles({miles=204,status='Update almost ready',charge='Fully charged',onOpen}:{miles?:number;status?:string;charge?:string}&TileAction){
  return <div className="rb-unit"><div className="rb-tiles">
    <Tile label="Status" className="rb-tile"><b>Status</b><span>{status}</span><div className="rb-tile-bottom"><Glyph name="lock"/></div></Tile>
    <Tile label="State of charge" className="rb-tile" onOpen={onOpen}><b>State of charge</b><span>{charge}</span><div className="rb-tile-bottom"><BatteryMedium className="rb-glyph rb-charge-battery" aria-hidden="true"/><strong>{miles}<small>mi</small></strong></div></Tile>
  </div></div>
}
export { ClimateTiles } from './ClimateControls'

export function ServiceTiles({onOpen}:TileAction){return <div className="rb-unit"><div className="rb-services"><Tile label="View Appointment" onOpen={onOpen}><Glyph name="appointment"/><b>View Appointment</b><span>New message</span></Tile><Tile label="Connected Drive Upgrades" onOpen={onOpen}><Glyph name="upgrade"/><b>Connected Drive Upgrades</b><span>1 service expiring</span></Tile></div></div>}
