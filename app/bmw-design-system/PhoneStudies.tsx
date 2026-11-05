import { Battery, Bell, Signal, Wifi, MapPin, Lightbulb, ShoppingBag, UserRound, ChevronUp, ChevronRight, Camera, BatteryCharging, Map as MapIcon, Globe } from 'lucide-react'
import { ClimateTiles, Glyph, RemoteActionRow, StatusTiles } from './RebuiltComponents'
import './phone-studies.css'

const assets='/assets/images/bmw-system/'
const vehicles={home:assets+'bmw-ix3.png',actions:assets+'i4-services-car.webp',charge:assets+'i4-art.webp'}
function Disclosure({excerpt=false}:{excerpt?:boolean}){
  return <div className="ps-disclosure">{!excerpt&&<div className="ps-sheetbar"><span>Close</span>Disclaimer</div>}
    <strong>Remote Engine Start</strong><p>If active in your car,<br/>the engine will run for 15 min.</p><div className="ps-fan-symbol"><Glyph name="fan"/></div>
    {!excerpt&&<div className="ps-legal"><b>Detailed Information</b>
      <p>The engine will automatically stop after 15 minutes. You can stop the running engine from the app or from the key if you are in range of your vehicle. The climatize timer can only be executed once and climatize now twice, prior to your next drive.</p>
      <p>The use of Remote Engine Start is governed by various laws. The use of this function might be unlawful. Please check state and local laws before use.</p>
      <b>Engine Start Climatization has to be enabled in the vehicle.</b><p>My Vehicle › Settings › Climate › Auxiliary climate control/ventilation › Remote Engine Start › Engine start for climate control.</p></div>}
    <span className="ps-confirm">Confirm</span>
  </div>
}
function Wallbox() {
  return <svg className="ps-wallbox" viewBox="0 0 376 128" aria-label="Charging cable connected to the wallbox" role="img">
    <path d="M221 81 C239 88 251 92 272 91 S300 92 288 83 Q277 76 277 63 V38" fill="none" stroke="#3682bd" strokeWidth="1.5"/>
    <path d="M268 14 Q270 11 281 12 Q288 12 287 20 L284 40 Q282 46 276 46 Q271 46 269 39 L266 22 Q265 17 268 14Z" fill="#363a38" stroke="#999c92"/>
    <path d="M269 17 Q275 14 285 17 L284 23 H269Z" fill="#191d1e"/><ellipse cx="277" cy="32" rx="4" ry="5" fill="#151819"/>
  </svg>
}

function RemoteServices() {
  return <div className="ps-services"><RemoteActionRow/>
    <div className="ps-services-heading">Remote Services <ChevronUp/></div>
    <div className="ps-service-tiles">
      <div><span><Camera/><ChevronRight/></span><b>Remote Camera</b><small>Remote 3D View</small></div>
      <div><span><BatteryCharging/><ChevronRight/></span><b>Battery preconditioning</b><small>Off</small></div>
    </div>
  </div>
}

function VehicleScreen({type}:{type:'home'|'actions'|'charge'}) {
  const home=type==='home', charge=type==='charge', services=type==='actions'
  return <><div className="ps-hero"><div className="ps-head"><Bell/><b>{home?'iX3 50 xDrive':charge?'i4 eDrive35':'i4 eDrive40'}</b><Glyph name="vehicle"/></div>
    {charge&&<><span className="ps-updated">Updated from vehicle 18/09/2026 06:16</span><small>Finished at 06:15</small></>}
    <strong className="ps-headline">{charge?<>100<sup>%</sup></>:<>ALL<br/>GOOD</>}</strong>
    {charge&&<Wallbox/>}
    <img className="ps-car" alt="" src={vehicles[type]}/>
    </div><div className="ps-content">
    {services?<><div className="ps-check"><Glyph name="lock"/><b>CHECK STATUS ›</b><span>Updated from vehicle 4/18/2025 13:22</span></div>
      <div className="ps-charge-reading"><div className="ps-charge-track"/><div><Battery/><span>State of charge</span><strong>72<small>% / </small>263<small> km</small></strong></div></div>
      <RemoteServices/></>:<>
      <RemoteActionRow/>
      <StatusTiles miles={home?261:204} status={home?'All good':'Update almost ready'} charge={home?'58%':'Fully charged'}/>
      <ClimateTiles/>{charge&&<div className="ps-finder">Where’s my BMW?<small>Parked</small></div>}</>}
    </div><div className="ps-nav" aria-hidden="true"><Glyph name="vehicle"/>{services?<><MapIcon/><Globe/></>:<><MapPin/><Lightbulb/></>}<ShoppingBag/><UserRound/></div></>
}
const screens = [
  ['home','Vehicle overview'],['actions','Remote actions'],['disclosure','Engine start confirmation'],['charge','Status and charge']
] as const
export function Archive(){
  return <section className="v7-archive"><span className="oc-kicker">The BMW app</span><div className="v7-phones" role="region" aria-label="BMW app screens" tabIndex={0}>{screens.map(([type,label])=><figure key={type}>
    <div className={'ps-device ps-'+type}><div className="ps-os" aria-hidden="true">9:41 <span><Signal/><Wifi/><Battery/></span></div>
    {type==='disclosure'?<Disclosure/>:<VehicleScreen type={type}/>}</div>
    <figcaption>{label}</figcaption></figure>)}</div></section>
}
export function StateStrip(){
  return <div className="v7-strip">{['Available','Confirm','Connecting','Error'].map(state=><figure key={state}><div className={'ps-excerpt state-'+state}>
    {state==='Confirm'?<Disclosure excerpt/>:state==='Error'?<div className="ps-issue"><strong>Component Issue</strong><p>Your vehicle cannot start the climate control functions due to an issue with a vehicle component. If the issue occurs regularly, contact your preferred service center.</p><span>OK</span></div>:<ClimateTiles state={state==='Available'?'Off':'Connecting'}/>}
    </div><figcaption>{state}</figcaption></figure>)}</div>
}
