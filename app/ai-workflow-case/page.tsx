import { HtmlIsland } from '../html-island'
import { readPublicHtmlPage } from '../read-public-html'

export default async function AiWorkflowCasePage() {
  const { head, body } = await readPublicHtmlPage('ai-workflow-case.html')
  return <HtmlIsland head={head} body={body} />
}
