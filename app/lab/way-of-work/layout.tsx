import type { Metadata, Viewport } from 'next'

import { HtmlChrome } from '../../html-chrome'

const NIGHT = '#070b16'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — AI Design Process',
  },
  description:
    'A practical workspace for AI-assisted design. Prompts, checklists and templates in one place.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: NIGHT,
}

export default function WayOfWorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome activeHref="/lab/way-of-work" backgroundColor={NIGHT}>
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {children}
    </HtmlChrome>
  )
}
