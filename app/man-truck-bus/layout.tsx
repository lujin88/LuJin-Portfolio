import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'
import { socialMetadata } from '../seo'

const TITLE = 'Lu — MAN Truck & Bus'
const DESCRIPTION =
  'MAN Fleet Uptime: resolving driver cover, checking vehicle readiness and handing over the next departure.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/man-truck-bus' }),
}

export default function ManTruckBusLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <HtmlChrome activeHref="/man-truck-bus" theme="light" colorScheme="light" backgroundColor="#fffefa">
    <link rel="stylesheet" href="/styles/shell-components.css" />
    {children}
  </HtmlChrome>
}
