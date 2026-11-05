import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'
import { SiteClosing } from '../components/site-closing'
import '../components/site-closing-case.css'
import './closing.css'
import { BMWOneSource } from './BMWOneSource'

export const metadata: Metadata = {
  title: 'BMW Design System',
  description: 'Lu Jin on leading six designers on the BMW app, designing remote controls in light and dark, and revisiting vehicle capability reviews with AI.',
}

export default function MobilityStudy() {
  return <HtmlChrome activeHref="/bmw-design-system" theme="dark" backgroundColor="#101318">
    <link rel="stylesheet" href="/styles/shell-components.css" />
    <BMWOneSource />
    <SiteClosing className="site-closing-case bm-closing" />
  </HtmlChrome>
}
