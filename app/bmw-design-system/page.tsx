import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'
import { socialMetadata } from '../seo'
import { SiteClosing } from '../components/site-closing'
import '../components/site-closing-case.css'
import './closing.css'
import { BMWOneSource } from './BMWOneSource'

const DESCRIPTION =
  'Lu Jin on leading a six-person design team on the BMW app, designing remote controls in light and dark, and revisiting vehicle capability reviews with AI.'

// og/twitter title = the rendered <title> (root template 'Lu Jin — %s').
// Set here, not in layout.tsx: the layout also covers /bmw-design-system/ideas/*, which must not share this canonical.
export const metadata: Metadata = {
  title: 'BMW Design System',
  description: DESCRIPTION,
  ...socialMetadata({ title: 'Lu Jin — BMW Design System', description: DESCRIPTION, path: '/bmw-design-system' }),
}

export default function MobilityStudy() {
  return <HtmlChrome activeHref="/bmw-design-system" theme="dark" backgroundColor="#101318">
    <link rel="stylesheet" href="/styles/shell-components.css" />
    <BMWOneSource />
    <SiteClosing className="site-closing-case bm-closing" />
  </HtmlChrome>
}
