import React,{useState} from 'react'
import {Bell,Settings,ChevronRight,Battery,Wifi,Signal} from 'lucide-react'

const explorePhoto='/assets/images/bmw-system/04.webp'
const servicesPhoto='/assets/images/bmw-system/05.webp'
export function ChromeStatus(){return <div aria-hidden="true" className="bm-status"><b>9:41</b><span><Signal/><Wifi/><Battery/></span></div>}
export function CarSide(){return <svg viewBox="0 0 30 20" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><path d="m2 12 2-3 7-1 5-4 6 .5 3 4 3 1v4h-3m-5 0H10m-5 0H2z"/><circle cx="7.5" cy="14" r="2.3"/><circle cx="22" cy="14" r="2.3"/></svg>}
export function StoreIcon(){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><path d="M4 15V3h16v14M8 4c0 6 8 6 8 0M2 19l2-2 5-1 4-3 5 1 2 2 2 1v3h-3m-5 0H8m-5 0H2z"/><circle cx="5.5" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg>}
export function AppHeader({title,onOpen}:{title:string;onOpen:(s:string)=>void}){return <div className="bm-toprow"><button aria-label="Notifications" onClick={()=>onOpen('Notifications')}><Bell/></button><b>{title}</b><button aria-label="Garage" onClick={()=>onOpen('Garage')}><CarSide/></button></div>}
export function LibraryHeader({type,onOpen}:{type:'Explore'|'Services';onOpen:(s:string)=>void}){
 return <><AppHeader title="" onOpen={onOpen}/><div className="bm-lib-head"><h3>{type==='Explore'?'EXPLORE':'SERVICES &'}<span>{type==='Explore'?'YOUR BMW':'STORES'}</span></h3></div></>
}
const crops={
 'Charging Basics':[explorePhoto,'82 459 218 81'],
 'Home charging':[explorePhoto,'316 459 74 81'],
 'Charging':[explorePhoto,'82 646 132 103'],
 'Driving':[explorePhoto,'232 646 131 103'],
 'Parking Assistant Professional':[servicesPhoto,'81 635 217 67'],
} as const
export function PhotoCard({title,onOpen}:{title:keyof typeof crops;onOpen:(s:string)=>void}){
 const [src,window]=crops[title]
 return <button className="bm-photocard" onClick={()=>onOpen(title)}><svg aria-hidden="true" viewBox={window} preserveAspectRatio="xMidYMid slice"><image href={src} width="460" height="996"/></svg><span>{title}<ChevronRight size={15}/></span></button>
}
export function Tutorials({onOpen}:{onOpen:(s:string)=>void}){return <div className="bm-tutorials"><PhotoCard title="Charging" onOpen={onOpen}/><PhotoCard title="Driving" onOpen={onOpen}/></div>}
export function ExplorePage({onOpen}:{onOpen:(s:string)=>void}){return <div className="bm-story"><LibraryHeader type="Explore" onOpen={onOpen}/><section><h4>Recommended for you</h4><div className="bm-carousel" aria-label="Recommendations"><PhotoCard title="Charging Basics" onOpen={onOpen}/><PhotoCard title="Home charging" onOpen={onOpen}/></div></section><section><h4>Tutorials</h4><Tutorials onOpen={onOpen}/></section><section><h4>BMW Community</h4><button className="bm-list" onClick={()=>onOpen('BMW Community')}>Share &amp; exchange experiences <ChevronRight/></button></section></div>}
export function ProfilePage({theme,onTheme,onOpen}:{theme:string;onTheme:(s:string)=>void;onOpen:(s:string)=>void}){
 const [settings,setSettings]=useState(false)
 return <div className="bm-profile"><div className="bm-profilehead"><button aria-label="Notifications" onClick={()=>onOpen('Notifications')}><Bell size={18}/></button><button aria-label="Profile settings" onClick={()=>setSettings(!settings)}><Settings size={20}/></button></div>
 {settings?<><h3>Settings</h3><h4>Preferences</h4><label>App Theme<select value={theme} onChange={e=>onTheme(e.target.value)}><option>Light</option><option>Dark</option></select></label><button className="bm-list" onClick={()=>setSettings(false)}>Back to profile <ChevronRight/></button></>:<><button className="bm-account" onClick={()=>onOpen('Profile data')}><i className="bm-account-mark" aria-hidden="true"/><b>Driver profile</b></button><h4>Settings</h4><button className="bm-theme-card" onClick={()=>setSettings(true)}><b>Featured app themes</b><small>Try out our latest app themes</small><span aria-hidden="true"><i/><i/><i/><i/></span></button><h4>3rd party services</h4><button className="bm-list" onClick={()=>onOpen('Financial Services')}>Financial Services <ChevronRight/></button></>}</div>
}
export function StreetMap(){const roads=['M-20 40L84 47 123 16 235 28 385 20','M-15 90L90 85 158 58 230 70 365 55','M-20 132L89 131 171 98 274 119 361 95','M-20 184L94 161 177 147 277 166 370 145','M-20 223L109 210 198 191 276 205 370 189','M30 -15L38 49 50 86 61 135 70 175 73 245','M76 -12L87 45 100 79 112 123 127 165 140 245','M140 -10L149 35 164 61 170 99 177 147 195 198 211 244','M205 -10L206 38 227 69 247 114 251 158 273 203 285 245','M287 -10L280 55 291 100 305 158 321 244']
 return <svg className="bm-streets" viewBox="0 0 350 230" preserveAspectRatio="none" aria-hidden="true"><rect width="350" height="230" fill="#e9edf0"/><path d="M0 115L67 100l18 38-49 32H0zM250 0h100v38l-63 8zM222 131l54-9 16 32-45 15z" fill="#cce4de"/><path d="M-20 220C66 176 48 128 122 94S218 88 235 28 310 7 360-15" fill="none" stroke="#b9dce8" strokeWidth="14"/>{roads.map(d=><path key={d} d={d} stroke="#cbd2de" strokeWidth="6" fill="none"/>)}{roads.map(d=><path key={d} d={d} stroke="#fff" strokeWidth="3.7" fill="none"/>)}<text x="32" y="182" fill="#72828e" fontSize="9">SCHWABING</text></svg>
}
