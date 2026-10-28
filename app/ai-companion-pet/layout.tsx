import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Diandian, an AI companion',
  },
  description:
    'Case study: an AI companion dolphin a five-year-old can call from a phone or a knob on the desk — no reading required.',
}

export default function CompanionPetLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome activeHref="/ai-companion-pet" backgroundColor="#061217">
      {children}
    </HtmlChrome>
  )
}
