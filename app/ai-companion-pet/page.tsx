import { HtmlIsland } from '../html-island'
import { readPublicHtmlPage } from '../read-public-html'

export default async function CompanionPetPage() {
  const { head, body } = await readPublicHtmlPage('ai-pet-case.html')
  return <HtmlIsland head={head} body={body} />
}
