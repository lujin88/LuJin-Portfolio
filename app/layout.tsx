import type { Metadata, Viewport } from 'next'
import { Caveat, Geist, Poppins } from 'next/font/google'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

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
    default: 'Lu.AI.Design',
    template: '%s | Lu',
  },
  description:
    'Architecting scalable digital products from early-stage strategy to production-ready UI.',
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
      className={`${geistSans.variable} ${caveat.variable} ${poppins.variable}`}
      style={{ backgroundColor: '#0a0a0a', colorScheme: 'dark' }}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
