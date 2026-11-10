import type { Metadata, Viewport } from 'next'
import 'remixicon/fonts/remixicon.css'

import { HtmlChrome } from '../../html-chrome'
import { socialMetadata } from '../../seo'
import './weather-aquarium.css'

const TITLE = 'Lu — Weather Aquarium'
const DESCRIPTION = 'Weather Aquarium — a playful 2.5D weather world for children.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/lab/weather-aquarium' }),
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#edf3e7',
}

export default function WeatherAquariumLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome
      activeHref="/lab/weather-aquarium"
      theme="light"
      colorScheme="light"
      backgroundColor="#edf3e7"
    >
      <style>{`[data-site-header][data-header-tone="paper"]{--header-scrim:#edf3e7;--header-glass:#edf3e7;--header-menu:#fff;--header-menu-item:#e8e8ea}`}</style>
      {children}
    </HtmlChrome>
  )
}
