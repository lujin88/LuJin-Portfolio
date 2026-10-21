import type { Metadata } from 'next'
import 'remixicon/fonts/remixicon.css'
import { HtmlChrome } from '../html-chrome'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Product & Service Designer',
  },
}

export default function IndexLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <HtmlChrome activeHref="/index">{children}</HtmlChrome>
}
