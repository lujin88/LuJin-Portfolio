import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Testing with real customers — E.ON Solar Case Study',
  description:
    'Section 07 of the E.ON solar lead-generation case study: testing the redesigned calculator with real customers.',
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
    <html lang="en" className={`${inter.variable} bg-off-white`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
