import { HtmlChrome } from '../html-chrome'
import { HtmlIsland } from '../html-island'
import { readPublicHtmlPage } from '../read-public-html'

export default async function LabPage() {
  const { head, body } = await readPublicHtmlPage('lab.html')
  return (
    <HtmlChrome activeHref="/lab">
      <HtmlIsland head={head} body={body} />
    </HtmlChrome>
  )
}
