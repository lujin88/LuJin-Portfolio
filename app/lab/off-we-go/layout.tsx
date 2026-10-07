import type { Metadata } from 'next'
import 'remixicon/fonts/remixicon.css'

import { HtmlChrome } from '../../html-chrome'
import { socialMetadata } from '../../seo'

const TITLE = 'Lu Jin — Off We Go Workbench'
const DESCRIPTION =
  "A travel planning workspace that uses AI to connect real-world data through APIs. It's built to plug in new services as it grows, so every trip feels a little more personal."

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/lab/off-we-go' }),
}

export default function OffWeGoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome activeHref="/lab/off-we-go">
      <link rel="stylesheet" href="/styles/shell-components.css" />
      <link rel="preload" as="image" href="/assets/images/lab/off-we-go/lakeside-hero.jpg" />
      {children}
    </HtmlChrome>
  )
}
