import { HtmlIsland } from '../html-island'
import { readPublicHtmlPage } from '../read-public-html'

export default async function LabPage() {
  const { head, body } = await readPublicHtmlPage('lab.html')
  return <HtmlIsland head={head} body={body} />
}
