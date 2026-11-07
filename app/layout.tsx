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
  'Product and service designer for banking, energy and mobility. 10+ years turning complex B2B work into clear tools.'

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
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
