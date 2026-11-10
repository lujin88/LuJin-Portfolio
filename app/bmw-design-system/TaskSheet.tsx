import React,{useState} from 'react'
import {ChevronLeft} from 'lucide-react'

export type ServiceRequest={date:string;time:string}
type Props={
  title:string
  locked:boolean
  target:number
  request:ServiceRequest|null
  saveRequest:(value:ServiceRequest)=>void
  sent:string
  back:()=>void
  open:(page:string)=>void
  map:()=>void
}
function ServiceForm({request,saveRequest}:{request:Props['request'];saveRequest:Props['saveRequest']}){
  const [editing,setEditing]=useState(!request)
  const [time,setTime]=useState(request?.time||'11:30')
  if(request&&!editing)return <div aria-live="polite"><small>DEMO REQUEST</small><h4>Awaiting retailer confirmation</h4><p>{request.date} · {request.time}</p><button className="lv-primary" onClick={()=>setEditing(true)}>Change request</button></div>
  return <form onSubmit={e=>{e.preventDefault();const date=new FormData(e.currentTarget).get('date');if(typeof date==='string'&&date){saveRequest({date,time});setEditing(false)}}}>
    <label>Requested date<input aria-label="Requested date" name="date" type="date" required defaultValue={request?.date||''}/></label>
    <fieldset><legend>Demo time slots</legend>{['11:30','13:00','14:00'].map(slot=><button type="button" aria-pressed={time===slot} key={slot} onClick={()=>setTime(slot)}>{slot}</button>)}</fieldset>
    <button className="lv-primary" type="submit">Save demo request</button></form>
}
export function TaskSheet({title,locked,target,request,saveRequest,sent,back,open,map}:Props){
  const guides:Record<string,[string,string,()=>void]>={
    'Charging Basics':['Check the target and current charge before your next drive.','View charge settings',()=>open('State of charge')],
    Charging:['Find an available connector before you arrive.','Find a charging station',map],
    'Home charging':['Set how much charge you need for the next trip.','Set charge target',()=>open('State of charge')],
    Driving:['Check your vehicle before departure.','Check vehicle status',()=>open('Status')],
  }
  const isService=title==='View Appointment'||title==='Service and maintenance'
  const systemPage=title==='Garage'||title==='Notifications'
  if(!isService&&title!=='Status'&&!systemPage&&!guides[title])return null
  return <section className="lv-sheet bm-task-sheet"><button className="lv-back" onClick={back}><ChevronLeft size={18}/> Back</button><h3>{isService?'Service appointment':title}</h3>
    {title==='Garage'?<><small>YOUR BMWS</small><button className="bm-list" onClick={()=>open('Status')}>iX3 50 xDrive · Active</button></>:
    title==='Notifications'?<>{sent&&<button className="bm-list" onClick={map}>Destination sent · {sent}</button>}{request&&<button className="bm-list" onClick={()=>open('View Appointment')}>Service request · {request.date}</button>}{!sent&&!request&&<p>No new vehicle notifications.</p>}</>:
    isService?<ServiceForm request={request} saveRequest={saveRequest}/>:title==='Status'?<><dl><dt>Doors</dt><dd>{locked?'Locked':'Unlocked'}</dd><dt>State of charge</dt><dd>58%</dd><dt>Charge target</dt><dd>{target}%</dd></dl><button className="lv-primary" onClick={()=>open('Controls')}>Open remote controls</button></>:
    <><p>{guides[title][0]}</p><button className="lv-primary" onClick={guides[title][2]}>{guides[title][1]}</button></>}
  </section>
}
