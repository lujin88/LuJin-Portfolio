import type { Metadata } from 'next'
import 'remixicon/fonts/remixicon.css'
import '../island-utilities.css'
import { HtmlChrome } from '../html-chrome'
import { socialMetadata } from '../seo'

const TITLE = 'Lu Jin — Product & Service Designer'
const DESCRIPTION =
  'Product and service designer for banking, energy and mobility. 10+ years turning complex B2B work into clear tools.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/index' }),
}

export default function IndexLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <HtmlChrome activeHref="/index">{children}</HtmlChrome>
}
