import { SiteClosing } from '../../components/site-closing'
import { HtmlIsland } from '../../html-island'
import { readPublicHtmlPage } from '../../read-public-html'

export default async function AgentMonitorPage() {
  const { head, body } = await readPublicHtmlPage('agent-monitor.html')
  return (
    <>
      <HtmlIsland head={head} body={body} />
      <SiteClosing className="am-site-closing" />
    </>
  )
}
