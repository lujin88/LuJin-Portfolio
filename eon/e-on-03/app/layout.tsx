import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins, Caveat } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: 'Our Audience — Who are we designing for?',
  description:
    'Our audience was primarily homeowners aged 40+, still early in their solar journey.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: './eon/images/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: './eon/images/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: './eon/images/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: './eon/images/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${caveat.variable} bg-slide-bg`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
