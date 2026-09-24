import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Work in Progress',
  },
}

export default function WipLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <HtmlChrome activeHref="/wip">{children}</HtmlChrome>
}
