import type { Metadata, Viewport } from 'next'
import { Caveat, Playfair_Display, Poppins } from 'next/font/google'

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
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
      className={`${caveat.variable} ${playfair.variable} ${poppins.variable}`}
      style={{ backgroundColor: '#0a0a0a', colorScheme: 'dark' }}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
