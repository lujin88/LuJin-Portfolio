'use client'

import { useLayoutEffect } from 'react'
import { useSiteLanguage } from '@header/lib/language'
import { applyAboutTranslations } from '../i18n/about-me'

// Force HMR after About Me card copy update.

export function AboutLanguageSync() {
  const { langCode } = useSiteLanguage()

  useLayoutEffect(() => {
    const root = document.getElementById('about-page-root')
    applyAboutTranslations(langCode)
    if (!root) return

    const island = root.firstElementChild ?? root
    const observer = new MutationObserver(() => {
      applyAboutTranslations(langCode)
    })
    observer.observe(island, { childList: true })
    return () => observer.disconnect()
  }, [langCode])

  return null
}
