import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'

export const metadata: Metadata = {
  title: { absolute: 'Lu — ETF Savings Plan' },
  description: 'A Swiss ETF savings plan designed for the months after you start: before the first payment, in a down month, and when you want to stop. Explore the interactive prototype.',
}

export default function EtfSavingsPlanLayout({ children }: { children: React.ReactNode }) {
  return (
    <HtmlChrome activeHref="/etf-savings-plan" theme="light" colorScheme="light" backgroundColor="#fafaf9">
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {children}
    </HtmlChrome>
  )
}
