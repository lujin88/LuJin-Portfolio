import type { Metadata } from 'next'
import 'remixicon/fonts/remixicon.css'

import { HtmlChrome } from '../../html-chrome'
import './weather-aquarium.css'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Weather Aquarium',
  },
  description:
    'Weather Aquarium — a playful 2.5D weather world for children.',
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
