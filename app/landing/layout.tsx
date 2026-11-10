import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import 'remixicon/fonts/remixicon.css'
import '../island-utilities.css'
import { HtmlChrome } from '../html-chrome'
import { socialMetadata } from '../seo'

// Self-hosted italic Poppins for public/home.html (was loaded from Google Fonts; legal #2367).
// Upright Poppins comes from the root layout (--font-poppins).
const poppinsItalic = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: 'italic',
  variable: '--font-poppins-italic',
  display: 'swap',
  preload: false,
})

const TITLE = 'Lu Jin — Product Designer'
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
  return (
    <HtmlChrome activeHref="/index">
      <div className={poppinsItalic.variable} style={{ display: 'contents' }}>
        {children}
      </div>
    </HtmlChrome>
  )
}
