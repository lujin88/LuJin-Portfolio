'use client'

// One closing for every page: the Index SiteClosing, with case-route tokens.
import { SiteClosing } from '../../../app/components/site-closing'
import '../../../app/components/site-closing-case.css'

export function SiteFooter() {
  return <SiteClosing className="site-closing-case" />
}
