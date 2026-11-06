import { createHash } from 'node:crypto'
import { IslandActivator } from './html-island-activate'

const EXECUTABLE_TYPES = new Set([
  '',
  'module',
  'text/javascript',
  'application/javascript',
  'text/ecmascript',
  'application/ecmascript',
])

// Whole <script>…</script> blocks. Only the opening tag is rewritten.
// An escaped <\/script> inside source does not end the block, so a string
// such as innerHTML="<script><\/script>" is left unchanged.
function neutralizeScripts(html: string) {
  return html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (full, attrs: string, inner: string) => {
    const typeMatch = attrs.match(/\btype\s*=\s*(['"])([^'"]*)\1/i)
    const type = (typeMatch?.[2] ?? '').trim().toLowerCase()
    if (!EXECUTABLE_TYPES.has(type)) return full
    const attrsWithoutType = typeMatch ? attrs.replace(typeMatch[0], '') : attrs
    const orig = type ? ` data-island-type="${type}"` : ''
    return `<script type="text/plain" data-island-script=""${orig}${attrsWithoutType}>${inner}</script>`
  })
}

function islandToken(head: string, body: string) {
  return createHash('sha256').update(head).update('\0').update(body).digest('hex')
}

function staticHead(head: string) {
  return head
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*\/?>/gi, '')
}

// .reveal / .contact-reveal start at opacity 0, so an SSR body still paints as
// an empty black page until the island script adds .is-visible. Keep them
// visible until that script is about to run; the activator then restores the
// authored hidden state for anything still outside the viewport.
const PAINT_STYLE = `<style data-island-paint>
[data-html-island] .reveal,
[data-html-island] .contact-reveal{opacity:1;transform:none}
html.island-live [data-html-island] .reveal:not(.is-visible){opacity:0;transform:translateY(28px)}
html.island-live [data-html-island] .contact-reveal:not(.is-visible){opacity:0;transform:translateY(20px)}
</style>`

function headScriptTemplate(head: string) {
  const scripts = head.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) ?? []
  if (scripts.length === 0) return ''
  return `<template data-island-head>${scripts.map((script) => neutralizeScripts(script)).join('')}</template>`
}

export function HtmlIsland({ head, body }: { head: string; body: string }) {
  const markup = `${PAINT_STYLE}${staticHead(head)}${headScriptTemplate(head)}${neutralizeScripts(body)}`
  return (
    <>
      <div
        // Horizontal clip lives on <html>, not here. overflow-x-hidden on this
        // wrapper creates a scroll container and kills Index pin-wrap sticky.
        data-html-island=""
        className="min-h-svh min-w-[360px]"
        style={{ background: 'var(--color-bg-page)', color: 'var(--color-text-1)' }}
        dangerouslySetInnerHTML={{ __html: markup }}
      />
      <IslandActivator token={islandToken(head, body)} />
    </>
  )
}
