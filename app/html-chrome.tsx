import { SiteHeader } from '@header/components/site-header'
import { HtmlTheme } from './html-theme'
import { HtmlLanguageSync } from './i18n/html-language-sync'
import '@header/header.css'

type HtmlChromeProps = {
  activeHref: string
  children: React.ReactNode
  theme?: 'dark' | 'light'
  colorScheme?: 'dark' | 'light'
  backgroundColor?: string
}

export function HtmlChrome({
  activeHref,
  children,
  theme = 'dark',
  colorScheme = 'dark',
  backgroundColor,
}: HtmlChromeProps) {
  return (
    <>
      {backgroundColor && (
        // Rendered before the render-blocking <link> so the background colour
        // is applied before the browser commits its first paint frame.
        <style>{`html,body{background-color:${backgroundColor}!important;color-scheme:${colorScheme}}`}</style>
      )}
      <link rel="stylesheet" href="/styles/shell-tokens.css" />
      <HtmlTheme
        className={theme}
        colorScheme={colorScheme}
        backgroundColor={backgroundColor}
      />
      <SiteHeader activeHref={activeHref} />
      <div id="site-content" tabIndex={-1}>
        {children}
      </div>
      <HtmlLanguageSync />
    </>
  )
}
