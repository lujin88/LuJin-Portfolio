import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SHOW_UNFINISHED_CASES } from '@header/lib/site-flags'
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
  if (!SHOW_UNFINISHED_CASES) notFound()
  return <ConstructionChrome activeHref="/etf-savings-plan">{children}</ConstructionChrome>
}
