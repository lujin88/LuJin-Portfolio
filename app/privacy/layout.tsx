import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'
import { socialMetadata } from '../seo'

const TITLE = 'Lu Jin — Privacy'
const DESCRIPTION = 'What data lujin.me collects, who processes it and how to switch session recording off.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/privacy' }),
}

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome activeHref="/privacy">
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {children}
    </HtmlChrome>
  )
}
