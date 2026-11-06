import React from 'react'
import './climate-controls.css'

type Props = { state?: string; onOpen?: (label: string) => void }

function FanMark() {
  return <svg className="rb-glyph" viewBox="0 0 28 28" aria-hidden="true">
    {[0,90,180,270].map(angle => <path key={angle} transform={`rotate(${angle} 14 14)`}
      d="M12.8 11.5C10.3 8.4 10.2 4.7 12.8 2.6C15 .8 18.5 1.2 19.6 3.8C20.4 5.8 19.2 7.1 17.5 7.8C15.7 8.5 15.2 9.5 15.4 11.2"/>)}
    <circle cx="14" cy="14" r="1.8"/>
  </svg>
}

function VehicleMark() {
  return <svg className="rb-glyph" viewBox="0 0 28 28" aria-hidden="true">
    <path d="M3.3 12.9 5.5 7.3Q6.1 5.7 8 5.5Q14 4.7 20 5.5Q21.9 5.7 22.5 7.3L24.7 12.9M3.6 12.2Q14 10.6 24.4 12.2L25.5 15.2V21H2.5v-5.8zM3.7 21v2.3h3.1V21m14.4 0v2.3h3.1V21M2.8 11l-1.4-.6M25.2 11l1.4-.6M5.1 15l4 .6m13.8-.6-4 .6M11.6 16.4h4.8"/>
  </svg>
}

export function ClimateCard({ state = 'Off', pending = false }: { state?: string; pending?: boolean }) {
  return <div className="rb-tile">
    <b>Climate</b><span>{state}</span>
    <div className="rb-tile-bottom"><span className="ck-fan" data-pending={pending}><FanMark/></span></div>
  </div>
}

export function ClimateTiles({ state = 'Off', onOpen }: Props) {
  return <div className="rb-unit mp-climate-controls"><div className="rb-tiles rb-climate">
    {[{ title: 'Climate', value: state, mark: <FanMark/> }, { title: 'Controls', value: 'Remote access', mark: <VehicleMark/> }].map(({title,value,mark}) => {
      const contents = <><b>{title}</b><span>{value}</span><div className="rb-tile-bottom">{mark}</div></>
      return onOpen
        ? <button key={title} className="rb-tile" type="button" onClick={() => onOpen(title)}>{contents}</button>
        : <div key={title} className="rb-tile">{contents}</div>
    })}
  </div></div>
}
