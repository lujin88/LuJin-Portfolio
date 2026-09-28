import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import 'remixicon/fonts/remixicon.css'

import { HtmlChrome } from '../../html-chrome'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Off We Go Workbench',
  },
  description:
    "A travel planning workspace that uses AI to connect real-world data through APIs. It's built to plug in new services as it grows, so every trip feels a little more personal.",
}

export default function OffWeGoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome activeHref="/lab/off-we-go">
      <div className={plusJakarta.variable}>
        <link rel="stylesheet" href="/styles/shell-components.css" />
        <link rel="preload" as="image" href="/assets/images/lab/off-we-go/lakeside-hero.jpg" />
        {children}
      </div>
    </HtmlChrome>
  )
}
