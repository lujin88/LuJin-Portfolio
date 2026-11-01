import type { Metadata, Viewport } from 'next'

import { HtmlChrome } from '../../html-chrome'
import { socialMetadata } from '../../seo'

const PAPER = '#fdfcf9'

const TITLE = 'Lu — Human × AI'
const DESCRIPTION =
  'A human-led design practice powered by AI. Human judgment. AI execution.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/lab/way-of-work' }),
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: PAPER,
}

export default function WayOfWorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome
      activeHref="/lab/way-of-work"
      theme="light"
      colorScheme="light"
      backgroundColor={PAPER}
    >
      <style>{`[data-site-header][data-header-tone="paper"]{--header-scrim:#e8e1d4;--header-glass:#f4efe6;--header-menu:#fff;--header-menu-item:#f3f0e8}`}</style>
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {children}
    </HtmlChrome>
  )
}
