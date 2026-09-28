import type { Metadata } from 'next'

import { HtmlChrome } from '../../html-chrome'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Way of Work',
  },
  description:
    'A more human way to build. From curiosity to impact. A structured, iterative process for complex products.',
}

export default function WayOfWorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome activeHref="/lab/way-of-work">
      <link rel="stylesheet" href="/styles/shell-components.css" />
      <link rel="preload" as="image" href="/assets/images/lab/way-of-work/01.jpg" />
      {children}
    </HtmlChrome>
  )
}
