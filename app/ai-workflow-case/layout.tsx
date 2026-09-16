import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'

export const metadata: Metadata = {
  title: 'AI Design Workflow',
}

export default function AiWorkflowLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <HtmlChrome activeHref="/lab">{children}</HtmlChrome>
}
