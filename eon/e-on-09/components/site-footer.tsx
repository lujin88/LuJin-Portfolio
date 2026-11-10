'use client'

// One closing for every page: the Index SiteClosing, with case-route tokens.
import { SiteClosing } from '../../../app/components/site-closing'
import '../../../app/components/site-closing-case.css'

type SiteFooterProps = {
  variant?: 'light'
}

export function SiteFooter({ variant }: SiteFooterProps) {
  return (
    <SiteClosing
      className={variant === 'light' ? 'site-closing-case site-closing-case--light' : 'site-closing-case'}
    />
  )
}
