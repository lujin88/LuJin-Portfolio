'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSiteLanguage } from '@header/lib/language'
import { applyHtmlTranslations } from './apply-html'

export function HtmlLanguageSync() {
  const { langCode } = useSiteLanguage()
  const pathname = usePathname()

  useLayoutEffect(() => {
    applyHtmlTranslations(langCode)

    const islands = document.querySelectorAll('[data-html-island]')
    if (islands.length === 0) return

    const observer = new MutationObserver(() => {
      applyHtmlTranslations(langCode)
    })
    islands.forEach((island) => {
      observer.observe(island, { childList: true })
    })
    return () => observer.disconnect()
  }, [langCode, pathname])

  return null
}
