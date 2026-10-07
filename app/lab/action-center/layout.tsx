import type { Metadata } from 'next'
import 'remixicon/fonts/remixicon.css'

import { HtmlChrome } from '../../html-chrome'
import { socialMetadata } from '../../seo'

const TITLE = 'Lu Jin — Action Center'
const DESCRIPTION =
  'A unified dashboard for monitoring AI coding agents, actions, and usage.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/lab/action-center' }),
}

export default function ActionCenterLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome
      activeHref="/lab/action-center"
      theme="light"
      colorScheme="light"
      backgroundColor="#f2efec"
    >
      <link rel="stylesheet" href="/styles/shell-components.css" />
      <link
        rel="preload"
        as="image"
        href="/assets/images/lab/action-center/monitor-hero-bg.png"
      />
      {children}
    </HtmlChrome>
  )
}
