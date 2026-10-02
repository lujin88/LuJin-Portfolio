import type { Metadata } from 'next'
import 'remixicon/fonts/remixicon.css'

import { HtmlChrome } from '../../html-chrome'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Action Center',
  },
  description:
    'A unified dashboard for monitoring AI coding agents, actions, and usage.',
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
