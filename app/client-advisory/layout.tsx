import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteHeader } from '@header/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HtmlTheme } from '../html-theme'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Client Advisory',
  },
  description:
    'Less searching. More advising. An AI-powered advisory case study by Lu, Lead Service Designer — surfacing what matters to each client, exactly when it matters.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#06101f',
}

export default function ClientAdvisoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HtmlTheme className="dark" colorScheme="dark" />
      <SiteHeader activeHref="/client-advisory" />
      <div id="site-content" className="font-sans">
        {children}
        <SiteFooter />
      </div>
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </>
  )
}
