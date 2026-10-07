import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'
import { socialMetadata } from '../seo'

const TITLE = 'Lu Jin — AI Design Workflow'
const DESCRIPTION =
  'A repeatable loop from a rough question to a working prototype — where the tools carry the volume and the designer keeps the direction.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/ai-workflow-case', image: '/og/ai-workflow-case.jpg' }),
}

export default function AiWorkflowLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <HtmlChrome activeHref="/lab">{children}</HtmlChrome>
}
