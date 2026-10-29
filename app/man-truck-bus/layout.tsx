import type { Metadata } from 'next'
import { ConstructionChrome } from '../components/construction-chrome'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — MAN Truck & Bus',
  },
  description: 'MAN Truck & Bus is under construction.',
}

export default function ManTruckBusLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ConstructionChrome activeHref="/man-truck-bus">{children}</ConstructionChrome>
}
