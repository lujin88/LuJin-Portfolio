import type { Metadata, Viewport } from 'next'
import { SiteHeader } from '@header/components/site-header'
import { SiteFooter } from '@eon/components/site-footer'
import { HtmlTheme } from '../html-theme'
import { socialMetadata } from '../seo'
import '@eon/app/globals.css'

const TITLE = 'Lu Jin — E.ON Solar'
const DESCRIPTION =
  'Case study: redesigning a high-friction solar calculator journey to turn existing traffic into qualified leads.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/EON', image: '/og/eon-solar.jpg' }),
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#07151f',
}

export default function EonLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HtmlTheme className="light" colorScheme="light" />
      <div className="site-chrome">
        <SiteHeader activeHref="/EON" />
      </div>
      <div id="site-content" tabIndex={-1} className="pt-20 font-sans md:pt-24">
        {children}
      </div>
      <div className="site-chrome">
        <SiteFooter variant="light" />
      </div>
    </>
  )
}
