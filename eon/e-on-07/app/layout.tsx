import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Caveat, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const _plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
})

const _caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: 'Design Decisions — A simpler path to a smarter estimate',
  description:
    'How we redesigned a solar roof estimate flow around three principles: automate what we can, ask only what is easy to answer, and make the value clear.',
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
    <html lang="en" className={`${_plusJakartaSans.variable} ${_caveat.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
