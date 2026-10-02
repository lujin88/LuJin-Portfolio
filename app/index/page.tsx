import { HtmlIsland } from '../html-island'
import { readPublicHtmlPage } from '../read-public-html'

export default async function IndexPage() {
  const { head, body } = await readPublicHtmlPage('home.html')
  return <HtmlIsland head={head} body={body} />
}
