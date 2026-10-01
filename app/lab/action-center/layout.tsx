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
      backgroundColor="#f1ece6"
    >
      <link
        rel="preload"
        as="image"
        href="/assets/images/lab/action-center/monitor-hero-8k-v2.png"
      />
      {children}
    </HtmlChrome>
  )
}
