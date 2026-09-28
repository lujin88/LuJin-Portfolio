import type { Metadata, Viewport } from 'next'

import { HtmlChrome } from '../../html-chrome'
import { CHAPTERS } from './chapters'

const MIST = '#587894'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Way of Work',
  },
  description:
    'A more human way to build. From curiosity to impact. A structured, iterative process for complex products.',
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
      <style>{`html,body{background-color:${MIST} !important}`}</style>
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
