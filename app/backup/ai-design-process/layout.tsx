import type { Metadata, Viewport } from 'next'

import { HtmlChrome } from '../../html-chrome'

const NIGHT = '#070b16'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — AI Design Process',
  },
  description:
    'Backup of the AI Design Process page. A practical workspace for AI-assisted design.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: NIGHT,
}

export default function AiDesignProcessBackupLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome activeHref="/backup/ai-design-process" backgroundColor={NIGHT}>
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {children}
    </HtmlChrome>
  )
}
