import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'
import { socialMetadata } from '../seo'

const TITLE = 'Lu Jin — Work in Progress'
const DESCRIPTION =
  'This page is currently under development. Check back soon for updates!'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/wip' }),
  robots: { index: false, follow: true },
}

export default function WipLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <HtmlChrome activeHref="/wip">{children}</HtmlChrome>
}
