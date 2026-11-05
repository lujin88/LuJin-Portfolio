import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'
import { BMWAppDesignSystemOneControl } from './BMWAppDesignSystemOneControl'

export const metadata: Metadata = {
  title: 'BMW App Design System — One Control',
  description: 'Lu Jin on designing the BMW climate control in 2020 and revisiting its component rules in 2026.',
  // Public but not indexed (Lu, 2026-11-05).
  robots: { index: false, follow: false },
}

export default function OneControlPage() {
  return <HtmlChrome activeHref="/bmw-design-system" theme="dark" backgroundColor="#102133">
    <link rel="stylesheet" href="/styles/shell-components.css"/>
    <BMWAppDesignSystemOneControl/>
  </HtmlChrome>
}
