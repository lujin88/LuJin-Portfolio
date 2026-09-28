import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteHeader } from '@header/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HtmlTheme } from '../../html-theme'
import '@/app/globals.css'
import 'remixicon/fonts/remixicon.css'
import { findCaSession } from './sessions'

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#06101f',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const session = findCaSession(slug)
  const title = session ? `Lu — ${session.title}` : 'Lu — Client Advisory'
  return {
    title: { absolute: title },
    description:
      'A chapter of the Client Advisory case, opened from the Lab hub.',
  }
}

export default async function CaSessionLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <>
      <HtmlTheme className="dark" colorScheme="dark" />
      <SiteHeader activeHref={`/ca/${slug}`} />
      <div className="font-sans">
        {children}
        <SiteFooter />
      </div>
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </>
  )
}
