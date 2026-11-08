import React from 'react'
import './rule-visuals.css'

const sample = [
  ['2','320i','Petrol','Engine start'],
  ['3','320d','Diesel','Hidden'],
  ['4','330e','Plug-in hybrid','Climate'],
  ['5','530i','Petrol','Check'],
]

export function SheetFocus() {
  return <div className="rv-sheet">
    <div className="rv-file"><span className="rv-gridmark" aria-hidden="true">▦</span><strong>Remote start matrix</strong><small>MY2020</small></div>
    <div className="rv-formula"><b>E5</b><i aria-hidden="true">ƒx</i><span>Check</span></div>
    <table aria-label="Excerpt from the illustrative 2020 spreadsheet"><thead>
      <tr><td/><th>B</th><th>C</th><th>E</th></tr>
      <tr><td>1</td><th>Model</th><th>Powertrain</th><th>Market B</th></tr>
    </thead><tbody>{sample.map(([n,model,type,value])=><tr key={n} data-selected={n==='5'}><th scope="row">{n}</th><td>{model}</td><td>{type}</td><td><span>{value}</span></td></tr>)}</tbody></table>
  </div>
}

function CommandMark({command}:{command:string}){
  return <svg className="rv-mark" viewBox="0 0 136 74" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
      <path d="M10 46l4-9 21-5 13-12q4-4 11-4h21q6 0 11 4l13 11 14 4q6 1 7 6l1 8-4 2h-8m-17 0H42m-18 0H12z"/>
      <path d="m42 31 10-10h12v10zm28-10h10l14 10H70zm-53 17 12-2m84 1 8 2"/>
      <circle cx="33" cy="49" r="8"/><circle cx="105" cy="49" r="8"/>
    </g>
    <g transform="translate(34 67)" stroke={command==='Hidden'?'#7c91a3':'#b8d9ef'} strokeWidth="2" strokeLinecap="round">
      {command==='Hidden'?<path d="M0 0h66" strokeDasharray="3 6"/>:command==='Remote climate'?<path d="M0 0h18q3-10 6 0t6 0t6 0t6 0h24"/>:<path d="M0 0h15l5-5 4 6 5-13 5 13 5-7 4 6h23"/>}
    </g>
  </svg>
}
export function RuleOutput({cell,command}:{cell:string;command:string}){
  return <div className="rv-output" aria-live="polite">
    <div className="rv-source"><small>2020 · Excel cell</small><b data-check={cell==='Check'}>{cell}</b></div>
    <span className="rv-arrow" aria-hidden="true">→</span>
    <div className="rv-command"><small>2026 · Proposed command</small><strong>{command==='Hidden'?'Entry omitted':command}</strong><span>{command==='Hidden'?'No states generated':'5 states · Light and Dark'}</span></div>
    <CommandMark command={command}/>
  </div>
}
