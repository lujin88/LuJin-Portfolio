import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'
import { socialMetadata } from '../seo'

const TITLE = 'Lu — ETF Savings Plan'
const DESCRIPTION =
  'Designing a Swiss ETF savings plan around starting, staying invested and managing change. Explore the interactive prototype.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/etf-savings-plan' }),
}

export default function EtfSavingsPlanLayout({ children }: { children: React.ReactNode }) {
  return (
    <HtmlChrome activeHref="/etf-savings-plan" theme="light" colorScheme="light" backgroundColor="#fafaf9">
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {children}
    </HtmlChrome>
  )
}
