import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SHOW_UNFINISHED_CASES } from '@header/lib/site-flags'
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
  if (!SHOW_UNFINISHED_CASES) notFound()
  return <ConstructionChrome activeHref="/man-truck-bus">{children}</ConstructionChrome>
}
