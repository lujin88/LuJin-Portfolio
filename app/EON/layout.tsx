import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteHeader } from '@header/components/site-header'
import { SiteFooter } from '@eon/components/site-footer'
import { HtmlTheme } from '../html-theme'
import '@eon/app/globals.css'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — E.ON Solar',
  },
  description:
    'Case study: redesigning a high-friction solar calculator journey to turn existing traffic into qualified leads.',
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
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </>
  )
}
