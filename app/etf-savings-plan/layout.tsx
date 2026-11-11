import type { Metadata, Viewport } from 'next'
import { HtmlChrome } from '../html-chrome'
import { socialMetadata } from '../seo'

const TITLE = 'Lu Jin — ETF Savings Plan'
const DESCRIPTION =
  'A Swiss ETF savings plan designed for the months after you start: before the first payment, in a down month, and when you want to stop. Explore the interactive prototype.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/etf-savings-plan' }),
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fffdfb',
}

export default function EtfSavingsPlanLayout({ children }: { children: React.ReactNode }) {
  return (
    <HtmlChrome activeHref="/etf-savings-plan" theme="light" colorScheme="light" backgroundColor="#fffdfb">
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {/* ETF header (qa #5745, pm #5746): same two layers as every other paper page, the gradient
          scrim (.header-scrim-layer) and the 70% blurred glass (.header-glass-layer) from
          site-header.tsx. Only their colour follows this page's warm white. A lighter glass let the
          previous chapter's text show through the navigation, so it is not overridden here. */}
      <style>{`[data-site-header][data-header-tone="paper"]{--header-scrim:#fffdfb;--header-glass:#fffdfb;--header-menu:#fff;--header-menu-item:#e8e8ea}`}</style>
      {children}
    </HtmlChrome>
  )
}
