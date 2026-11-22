import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import Script from 'next/script'

import { SiteClosing } from '../../components/site-closing'

const body = readFileSync(join(process.cwd(), 'app/lab/party-planner/gratula-b-body.html'), 'utf8')

export function PartyPlannerPage() {
  return (
    <>
      <main>
        <div className="gb direction-bright" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: body }} />
        <SiteClosing className="pp-site-closing" />
      </main>
      <Script src="/lab/party-planner/b/ribbon.js" strategy="afterInteractive" />
      <Script src="/lab/party-planner/b/stage.js" strategy="afterInteractive" />
    </>
  )
}
