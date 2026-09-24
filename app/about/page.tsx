import { HtmlIsland } from '../html-island'
import { readPublicHtmlPage } from '../read-public-html'

export default async function AboutPage() {
  const { head, body } = await readPublicHtmlPage('about.html')
  return (
    <div id="about-page-root">
      <HtmlIsland head={head} body={body} />
    </div>
  )
}
