import { CarFront, Braces, Check, Fan, Flag } from 'lucide-react'
import './proposed-workflow.css'

const stages = [
  ['Define the rule', 'Map the model and market to an allowed command.'],
  ['Generate the states', 'Apply the rule to the light and dark Climate variants.'],
  ['Bind the component', 'Use the vehicle reply to set the component state.'],
  ['Review the exception', 'The team checks flagged error wording before approval.'],
] as const

function Artifact({step}:{step:number}) {
  if(step===0) return <div className="wa-sheet"><header>Model × market</header>
    <div><span>Model</span><b>530i</b></div><div><span>Market</span><b>B</b></div>
    <footer>Remote engine start</footer></div>
  if(step===1) return <div className="wa-variants">{['Light','Dark'].map(theme=><div key={theme} data-mode={theme}><b>Climate</b><span>Connecting</span><Fan strokeWidth={1.3}/></div>)}</div>
  if(step===2) return <div className="wa-code"><header><Braces/>ClimateControl</header><code>command=<em>&#123;rule.command&#125;</em><br/>state=<em>&#123;vehicle.state&#125;</em></code></div>
  return <div className="wa-proof"><header>Coverage check</header><div><Check/>Both themes</div><footer><Flag/>Error wording</footer></div>
}

export function BMWProposedWorkflow() {
  return <section id="proposed-workflow" className="wa-workflow" aria-labelledby="wa-title">
    <header className="wa-intro"><div><span>Proposed workflow</span><h3 id="wa-title">From rule to review</h3></div>
      <p><CarFront size={17} aria-hidden="true"/>530i · Market B</p></header>
    <ol>{stages.map(([name,body],i)=><li key={name}>
      <div className="wa-art" aria-hidden="true"><Artifact step={i}/></div>
      <div className="wa-copy"><span>0{i+1}</span><h4>{name}</h4><p>{body}</p></div>
    </li>)}</ol>
  </section>
}
