import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'
import { AboutLanguageSync } from './about-language-sync'
import { socialMetadata } from '../seo'

const TITLE = 'Lu Jin — About'
const DESCRIPTION =
  'I lead AI-native product and service design — making complex work more effortless, efficient, and human.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/about', image: '/og/about.jpg' }),
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
