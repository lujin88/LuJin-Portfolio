import type { Metadata, Viewport } from 'next'

import { HtmlChrome } from '../../html-chrome'

const NIGHT = '#070b16'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Way of Work',
  },
  description: 'Backup of the earlier Way of Work page.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: NIGHT,
}

export default function WayOfWorkBackupLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome activeHref="/backup/way-of-work" backgroundColor={NIGHT}>
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {children}
    </HtmlChrome>
  )
}
