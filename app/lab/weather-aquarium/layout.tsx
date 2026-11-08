import type { Metadata } from 'next'
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
      {children}
    </HtmlChrome>
  )
}
