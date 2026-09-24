import type { LangCode } from '@header/lib/language'
import { dictionaries, documentTitleKeys } from './messages'
import { lookupString } from './lookup'

function setFirstText(el: Element, value: string) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode()
  while (node) {
    if (node.textContent && node.textContent.trim()) {
      const raw = node.textContent
      const lead = raw.match(/^\s*/)?.[0] ?? ''
      const trail = raw.match(/\s*$/)?.[0] ?? ''
      node.textContent = `${lead}${value}${trail}`
      return
    }
    node = walker.nextNode()
  }
  el.appendChild(document.createTextNode(value))
}

function applyAttr(el: Element, attr: string, value: string) {
  el.setAttribute(attr, value)
}

export function applyHtmlTranslations(lang: LangCode, root: ParentNode = document) {
  const dict = dictionaries[lang]

  root.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n')
    if (!key) return
    const value = lookupString(dict, key)
    if (value == null) return
    setFirstText(el, value)
  })

  root.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html')
    if (!key) return
    const value = lookupString(dict, key)
    if (value == null) return
    el.innerHTML = value
  })

  root.querySelectorAll<HTMLElement>('[data-i18n-alt]').forEach((el) => {
    const key = el.getAttribute('data-i18n-alt')
    if (!key) return
    const value = lookupString(dict, key)
    if (value == null) return
    applyAttr(el, 'alt', value)
  })

  root.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria')
    if (!key) return
    const value = lookupString(dict, key)
    if (value == null) return
    applyAttr(el, 'aria-label', value)
  })

  const path = window.location.pathname
  const titleKey = documentTitleKeys[path]
  if (titleKey) {
    const title = lookupString(dict, titleKey)
    if (title) document.title = title
  }
}
