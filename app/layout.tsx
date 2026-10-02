import type { Metadata, Viewport } from 'next'
import { Caveat, Poppins } from 'next/font/google'
import { I18nProvider } from './i18n/use-translation'

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

export const metadata: Metadata = {
  title: {
    default: 'Lu — Product & Service Designer',
    template: 'Lu — %s',
  },
  description:
    'Design leadership across product and service — from early-stage strategy to production-ready systems.',
  icons: {
    icon: [{ url: '/assets/images/brand/lu-logo.png', type: 'image/png' }],
    shortcut: '/assets/images/brand/lu-logo.png',
    apple: '/assets/images/brand/lu-logo.png',
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
      </body>
    </html>
  )
}
