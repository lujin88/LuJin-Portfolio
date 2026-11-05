import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — MAN Truck & Bus',
  },
  description: 'MAN Fleet Uptime: resolving driver cover, checking vehicle readiness and handing over the next departure.',
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
