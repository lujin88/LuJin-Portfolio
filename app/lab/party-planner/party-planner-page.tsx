import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { SiteClosing } from '../../components/site-closing'
import { PartyPlannerScripts } from './party-planner-scripts'

const body = readFileSync(join(process.cwd(), 'app/lab/party-planner/gratula-b-body.html'), 'utf8')

export function PartyPlannerPage() {
  return (
    <>
      <main>
        <div className="gb direction-bright" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: body }} />
        <SiteClosing className="pp-site-closing" />
      </main>
      <PartyPlannerScripts />
    </>
  )
}
