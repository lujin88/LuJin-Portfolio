import { HtmlChrome } from '../html-chrome'

export default function IndexLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <HtmlChrome activeHref="/index">{children}</HtmlChrome>
}
