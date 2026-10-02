import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

function innerOf(html: string, openRe: RegExp, closeRe: RegExp) {
  const open = html.search(openRe)
  if (open === -1) return ''
  const afterOpen = html.indexOf('>', open)
  if (afterOpen === -1) return ''
  const close = html.search(closeRe)
  if (close === -1 || close <= afterOpen) return ''
  return html.slice(afterOpen + 1, close)
}

export async function readPublicHtmlPage(filename: string) {
  const html = await readFile(join(process.cwd(), 'public', filename), 'utf8')
  const head = innerOf(html, /<head\b/i, /<\/head>/i)

  // Match the real <body> only after </head>. home.html's stylesheet comments
  // contain the text "<body>", which would otherwise steal the body extract
  // and dump CSS into the page (breaking the experience timeline).
  const headClose = html.search(/<\/head>/i)
  const afterHead = headClose === -1 ? html : html.slice(headClose)
  // Prefer no HTML #site-nav (React SiteHeader is sole nav). Strip if a
  // legacy island still embeds one so it cannot fight the React header.
  const body = innerOf(afterHead, /<body\b/i, /<\/body>/i).replace(
    /<nav id="site-nav"[\s\S]*?<\/nav>/,
    '<nav id="site-nav" hidden></nav>',
  )

  return { head, body }
}
