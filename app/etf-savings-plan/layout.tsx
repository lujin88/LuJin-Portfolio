import type { Metadata, Viewport } from 'next'
import { HtmlChrome } from '../html-chrome'
import { socialMetadata } from '../seo'

const TITLE = 'Lu — ETF Savings Plan'
const DESCRIPTION =
  'Designing a Swiss ETF savings plan around starting, staying invested and managing change. Explore the interactive prototype.'

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
      {/* ETF only (pm #5097): the header shows the chapter colour under it instead of a grey-white
          band. Child 2 is the header's gradient scrim, child 3 its blurred glass (site-header.tsx).
          The scrim is dropped and the glass stays on as a light warm-white tint with blur. With the
          phone menu open the bar turns solid so it matches the menu panel below it. */}
      <style>{`[data-site-header][data-header-tone="paper"]{--header-scrim:#fffdfb;--header-glass:#fffdfb;--header-menu:#fff;--header-menu-item:#e8e8ea}
[data-site-header][data-header-tone="paper"]>div[aria-hidden="true"]:nth-child(2){display:none}
[data-site-header][data-header-tone="paper"]>div[aria-hidden="true"]:nth-child(3){opacity:1;background:rgb(255 253 251 / .3);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
[data-site-header][data-header-tone="paper"]:has(#mobile-nav:not([inert]))>div[aria-hidden="true"]:nth-child(3){background:#fffdfb;-webkit-mask-image:none;mask-image:none;height:4rem}`}</style>
      {children}
    </HtmlChrome>
  )
}
