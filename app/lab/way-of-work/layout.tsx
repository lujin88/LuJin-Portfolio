import type { Metadata, Viewport } from 'next'

import { HtmlChrome } from '../../html-chrome'
import { socialMetadata } from '../../seo'
import { CHAPTERS } from './chapters'

const MIST = '#587894'

const TITLE = 'Lu Jin — Way of Work'
const DESCRIPTION =
  'A more human way to build. From curiosity to impact. A structured, iterative process for complex products.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/lab/way-of-work' }),
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: MIST,
}

export default function WayOfWorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome activeHref="/lab/way-of-work" backgroundColor={MIST}>
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {CHAPTERS.map((chapter) => (
        <link
          key={chapter.still}
          rel="preload"
          as="image"
          href={chapter.still}
          fetchPriority={chapter.id === 'hero' ? 'high' : 'low'}
        />
      ))}
      {children}
    </HtmlChrome>
  )
}
