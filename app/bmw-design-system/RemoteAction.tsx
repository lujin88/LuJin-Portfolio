'use client'

import React, { useId } from 'react'
import { Snowflake } from 'lucide-react'

export const states = ['ready','empty','loading','pending','running','error','engine','power','long'] as const
export type ClimateState = typeof states[number]
export type Language = 'en' | 'de'
type Copy = readonly [string,string,string]
const en:Record<ClimateState,Copy> = {
  ready:['Ready','Start climate',''],
  empty:['No vehicle selected','Start climate','Select a vehicle to see its climate controls.'],
  loading:['Checking availability…','Start climate','Waiting for the vehicle status.'],
  pending:['Request sent','Start climate','Waiting for the vehicle to confirm.'],
  running:['Climate on','Start climate','Confirmed by the vehicle.'],
  error:['Could not send request','Retry','Connection interrupted. Try sending the request again.'],
  engine:['Unavailable','Start climate','Climate needs the engine. Remote engine start is off.'],
  power:['Unavailable','Start climate','The vehicle has no power for cabin climate.'],
  long:['Remote climate temporarily unavailable','Start climate','The vehicle needs engine power to cool the cabin, but remote engine start is disabled in the current configuration.'],
}
const de:Record<ClimateState,Copy> = {
  ready:['Bereit','Klimatisierung starten',''],
  empty:['Kein Fahrzeug ausgewählt','Klimatisierung starten','Wähle ein Fahrzeug aus, um die Klimatisierung anzuzeigen.'],
  loading:['Verfügbarkeit wird geprüft…','Klimatisierung starten','Der Fahrzeugstatus wird abgerufen.'],
  pending:['Anfrage gesendet','Klimatisierung starten','Die Bestätigung des Fahrzeugs steht noch aus.'],
  running:['Klimatisierung aktiv','Klimatisierung starten','Vom Fahrzeug bestätigt.'],
  error:['Anfrage fehlgeschlagen','Erneut versuchen','Verbindung unterbrochen. Sende die Anfrage erneut.'],
  engine:['Nicht verfügbar','Klimatisierung starten','Die Klimatisierung benötigt den Motor. Der Motorfernstart ist deaktiviert.'],
  power:['Nicht verfügbar','Klimatisierung starten','Für die Klimatisierung steht keine Energie zur Verfügung.'],
  long:['Fernklimatisierung vorübergehend nicht verfügbar','Klimatisierung starten','Das Fahrzeug benötigt Motorleistung zur Innenraumkühlung. Der Motorfernstart ist in der aktuellen Fahrzeugkonfiguration deaktiviert.'],
}

export function RemoteAction({state,language='en',dark=false,onRequest,children,actionIcon}:{
  state:ClimateState;language?:Language;dark?:boolean;onRequest:()=>void;children?:React.ReactNode;actionIcon?:React.ReactNode
}){
  const id=useId()
  const german=language==='de'
  const [status,label,reason]=(german?de:en)[state]
  const canSend=state==='ready'||state==='error'
  const hasHelp=['engine','power','long','error','empty'].includes(state)
  return <div lang={language} className="rx-control ms-theme" data-night={dark}>
    <small>{german?'INNENRAUMKLIMA':'CABIN CLIMATE'}</small>
    {children}
    <div className="rx-line">
      <div role="status" aria-live="polite" aria-atomic="true"><b>{status}</b>{reason&&<p id={id}>{reason}</p>}</div>
      <button className="rx-action" aria-disabled={!canSend} aria-describedby={reason?id:undefined}
        onClick={()=>{if(canSend)onRequest()}}>{actionIcon ?? <Snowflake aria-hidden="true" size={16}/>}<span>{label}</span></button>
    </div>
    {hasHelp&&<details key={state+language}><summary>{german?'Hilfe':'Help'}</summary>
      <p>{state==='error'?(german?'Prüfe die Verbindung und versuche es erneut.':'Check the connection before retrying.'):
        state==='empty'?(german?'Öffne die Fahrzeugauswahl.':'Open the vehicle selector.'):
        state==='power'?(german?'Prüfe den Energiestatus am Fahrzeug.':'Check the power status at the vehicle.'):
        (german?'Prüfe die Fernstart-Einstellungen des Fahrzeugs.':'Check the vehicle’s remote start settings.')}</p></details>}
  </div>
}
