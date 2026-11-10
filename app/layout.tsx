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
    default: 'Lu — Product Designer',
    template: 'Lu — %s',
  },
  description:
    'Product and service designer for banking, energy and mobility. 10+ years turning complex B2B work into clear tools.',
  icons: {
    icon: [{ url: '/assets/images/brand/favicon-32.png', type: 'image/png', sizes: '32x32' }],
    shortcut: '/assets/images/brand/favicon-32.png',
    apple: [{ url: '/assets/images/brand/apple-touch-icon-180.png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

// /index WA card follows the visitor's local season (months 3-5 spring, 6-8
// summer, 9-11 autumn, 12-2 winter). Set on <html> during the first parse so
// CSS paints that season's still before first paint. Lives in the root layout
// because it never re-renders on client navigation (a <script> in a page would
// trip React's "script tag while rendering" warning). Keep the mapping in sync
// with the fallback in public/assets/js/wa-season.js.
const WA_SEASON_EARLY =
  "(function(){var m=new Date().getMonth();document.documentElement.dataset.waSeason=m>=2&&m<=4?'spring':m>=5&&m<=7?'summer':m>=8&&m<=10?'autumn':'winter'})()"

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: WA_SEASON_EARLY }} />
      </head>
      <body className="m-0 min-w-[360px] antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
