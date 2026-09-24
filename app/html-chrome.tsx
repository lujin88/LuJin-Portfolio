import { SiteHeader } from '@header/components/site-header'
import { HtmlTheme } from './html-theme'
import { HtmlLanguageSync } from './i18n/html-language-sync'
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
      <link rel="stylesheet" href="/styles/shell-tokens.css" />
      <HtmlTheme className="dark" colorScheme="dark" />
      <SiteHeader activeHref={activeHref} />
      {children}
      <HtmlLanguageSync />
    </>
  )
}
