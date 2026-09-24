import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'
import { AboutLanguageSync } from './about-language-sync'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — About',
  },
}

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome activeHref="/about">
      {children}
      <AboutLanguageSync />
    </HtmlChrome>
  )
}
