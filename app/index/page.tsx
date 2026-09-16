import { HtmlIsland } from '../html-island'
import { readPublicHtmlPage } from '../read-public-html'

// Intentionally hidden on Index for now. Set to true to restore the experiments
// section (Design System + AI Design Workflow). Markup stays in public/home.html.
const showExperimentsSection = false

function withExperimentsSection(body: string) {
  if (showExperimentsSection) return body
  return body.replace(/<section\s+id="lab"[\s\S]*?<\/section>/, '')
}

export default async function IndexPage() {
  const { head, body } = await readPublicHtmlPage('home.html')
  return <HtmlIsland head={head} body={withExperimentsSection(body)} />
}
