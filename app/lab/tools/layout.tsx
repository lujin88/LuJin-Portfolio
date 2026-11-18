import type { Metadata, Viewport } from 'next'

import { HtmlChrome } from '../../html-chrome'
import { socialMetadata } from '../../seo'

const PAPER = '#f5f1e4'

const TITLE = 'Tools — Lu Jin'
const DESCRIPTION = 'Agent Monitor, Scranton, and Pixel Office — how Lu works with agents.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/lab/tools' }),
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: PAPER,
}

export default function ToolsLayout({
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
      <style>{`:root body{min-width:0}`}</style>
      <style>{`[data-site-header][data-header-tone="paper"]{--header-scrim:${PAPER};--header-glass:${PAPER};--header-menu:#fff;--header-menu-item:#e8e8ea}`}</style>
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {children}
    </HtmlChrome>
  )
}
