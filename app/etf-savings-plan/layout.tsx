import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'

export const metadata: Metadata = {
  title: { absolute: 'Lu — ETF Savings Plan' },
  description: 'Designing a Swiss ETF savings plan around starting, staying invested and managing change. Explore the interactive prototype.',
}

export default function EtfSavingsPlanLayout({ children }: { children: React.ReactNode }) {
  return (
    <HtmlChrome activeHref="/etf-savings-plan" theme="light" colorScheme="light" backgroundColor="#fafaf9">
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {children}
    </HtmlChrome>
  )
}
