import { SiteHeader } from '@header/components/site-header'
import { HtmlTheme } from './html-theme'
import '@header/header.css'

export function HtmlChrome({
  activeHref,
  children,
}: {
  activeHref: string
  children: React.ReactNode
}) {
  return (
    <>
      <HtmlTheme className="dark" colorScheme="dark" />
      <SiteHeader activeHref={activeHref} />
      {children}
    </>
  )
}
