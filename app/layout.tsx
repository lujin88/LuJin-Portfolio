import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Caveat, Poppins } from 'next/font/google'
import { I18nProvider } from './i18n/use-translation'
import { SITE_NAME, SITE_URL, socialMetadata } from './seo'

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const DEFAULT_TITLE = 'Lu Jin — Product & Service Designer'
const DEFAULT_DESCRIPTION =
  'Design leadership across product and service — from early-stage strategy to production-ready systems.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: 'Lu Jin — %s',
  },
  description: DEFAULT_DESCRIPTION,
  ...socialMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  }),
  icons: {
    icon: [
      { url: '/assets/images/brand/lu-logo-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/images/brand/lu-logo-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/assets/images/brand/lu-logo-32.png',
    apple: { url: '/assets/images/brand/lu-logo-180.png', sizes: '180x180', type: 'image/png' },
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${caveat.variable} ${poppins.variable} overflow-x-hidden`}
      style={{ backgroundColor: '#0a0a0a', colorScheme: 'dark' }}
    >
      <body className="min-w-[360px] antialiased">
        <I18nProvider>{children}</I18nProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
