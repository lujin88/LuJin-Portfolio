import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Caveat, Poppins } from 'next/font/google'
import { SiteHeader } from '@eon/components/site-header'
import { SiteFooter } from '@eon/components/site-footer'
import './globals.css'

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: 'E.ON Solar - Turning paid traffic into solar leads',
    template: '%s | E.ON Solar case study',
  },
  description:
    'Case study: redesigning a high-friction solar calculator journey to turn existing traffic into qualified leads.',
  generator: 'v0.app',
  icons: {
    icon: {
      url: '/assets/images/eon/Tab-icon.png',
      type: 'image/png',
    },
    apple: '/assets/images/eon/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#07151f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`light ${caveat.variable} ${poppins.variable}`}
    >
      <body className="font-sans antialiased">
        <div className="site-chrome">
          <SiteHeader activeHref="/" />
        </div>
        <div className="pt-20 md:pt-24">{children}</div>
        <div className="site-chrome">
          <SiteFooter variant="light" />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
