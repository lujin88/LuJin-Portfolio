import { HtmlIsland } from '../html-island'
import { readPublicHtmlPage } from '../read-public-html'

export default async function WipPage() {
  const { head, body } = await readPublicHtmlPage('wip.html')
  return <HtmlIsland head={head} body={body} />
}
