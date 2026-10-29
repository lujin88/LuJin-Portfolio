import type { Metadata } from 'next'
import { ConstructionChrome } from '../components/construction-chrome'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — ETF Savings Plan',
  },
  description: 'ETF Savings Plan is under construction.',
}

export default function EtfSavingsPlanLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ConstructionChrome activeHref="/etf-savings-plan">{children}</ConstructionChrome>
}
