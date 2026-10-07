import type { Metadata, Viewport } from 'next'
import { Patrick_Hand } from 'next/font/google'
import 'remixicon/fonts/remixicon.css'

import { HtmlChrome } from '../../html-chrome'
import { socialMetadata } from '../../seo'
import './party-planner.css'

const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-patrick-hand',
  display: 'swap',
})

const TITLE = 'Lu Jin — Party Planner'
const DESCRIPTION =
  'Party Planner turns four practical details into one calm plan for a child’s birthday — invitations, RSVPs, local suppliers and the party-day schedule.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/lab/party-planner' }),
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1768e8',
}

export default function PartyPlannerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome
      activeHref="/lab/party-planner"
      theme="light"
      colorScheme="light"
      backgroundColor="#1768e8"
    >
      <link rel="stylesheet" href="/styles/shell-components.css" />
      <div className={`${patrickHand.variable} pp-landing`}>
        {children}
      </div>
    </HtmlChrome>
  )
}
