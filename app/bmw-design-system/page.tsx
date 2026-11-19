import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'
import { socialMetadata } from '../seo'
import { SiteClosing } from '../components/site-closing'
import '../components/site-closing-case.css'
import './closing.css'
import { BMWOriginal } from './BMWOriginal'

const DESCRIPTION =
  'Due to the confidential reason, here only shows how I support clients to create an easy-to-track design system and collaborate with different stakeholders in an around 400 people team (including design, development, PO, Service owners, functional owners).'

// og/twitter title = the rendered <title> (root template 'Lu Jin — %s').
// Set here, not in layout.tsx, so this canonical stays on /bmw-design-system.
export const metadata: Metadata = {
  title: 'BMW Design System',
  description: DESCRIPTION,
  ...socialMetadata({ title: 'Lu Jin — BMW Design System', description: DESCRIPTION, path: '/bmw-design-system' }),
}

export default function MobilityStudy() {
  return <HtmlChrome activeHref="/bmw-design-system" theme="dark" backgroundColor="#101318">
    <link rel="stylesheet" href="/styles/shell-components.css" />
    <BMWOriginal />
    <SiteClosing className="site-closing-case bm-closing" />
  </HtmlChrome>
}
