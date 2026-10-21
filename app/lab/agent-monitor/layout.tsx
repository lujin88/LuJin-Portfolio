import type { Metadata } from 'next'

import { HtmlChrome } from '../../html-chrome'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Agent Monitor',
  },
  description:
    'Two self-built tools behind the AI workflow: Agent Monitor for usage and permissions, and an AI team for specialist work.',
}

export default function AgentMonitorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome
      activeHref="/lab/agent-monitor"
      theme="light"
      colorScheme="light"
      backgroundColor="#f6f1ea"
    >
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {children}
    </HtmlChrome>
  )
}
