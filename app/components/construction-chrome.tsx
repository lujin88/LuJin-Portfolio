import { HtmlChrome } from '../html-chrome'

export function ConstructionChrome({
  activeHref,
  children,
}: {
  activeHref: string
  children: React.ReactNode
}) {
  return (
    <HtmlChrome activeHref={activeHref}>
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {children}
    </HtmlChrome>
  )
}
