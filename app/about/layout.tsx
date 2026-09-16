import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'

export const metadata: Metadata = {
  title: 'About',
}

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <HtmlChrome activeHref="/about">{children}</HtmlChrome>
}
