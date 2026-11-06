import type { Metadata, Viewport } from 'next'

import { HtmlChrome } from '../../html-chrome'

const PAPER = '#f5f1e4'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Human × AI',
  },
  description:
    'How Lu Jin works with AI agents: design judgement written as rules, reviewed by her before anything ships.',
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
      {/* Root layout sets body min-width:360px site-wide; this page's layout works down to 320px, so lift it here (:root raises specificity above the .min-w-[360px] utility). */}
      <style>{`:root body{min-width:0}`}</style>
      <style>{`[data-site-header][data-header-tone="paper"]{--header-scrim:#e8e1d4;--header-glass:#f4efe6;--header-menu:#fff;--header-menu-item:#e8e8ea}`}</style>
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {children}
    </HtmlChrome>
  )
}
