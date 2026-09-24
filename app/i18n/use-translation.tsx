'use client'

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useSiteLanguage, type LangCode } from '@header/lib/language'
import { dictionaries, documentTitleKeys } from './messages'
import { lookup, lookupString, lookupStringArray } from './lookup'

export type Translate = (key: string) => string
export type TranslateArray = (key: string) => string[]

type I18nValue = {
  lang: LangCode
  t: Translate
  ta: TranslateArray
}

const I18nContext = createContext<I18nValue | null>(null)

function useI18nValue(): I18nValue {
  const { langCode } = useSiteLanguage()
  const dict = dictionaries[langCode]

  const t = useCallback<Translate>(
    (key) => lookupString(dict, key) ?? key,
    [dict],
  )

  const ta = useCallback<TranslateArray>(
    (key) => lookupStringArray(dict, key) ?? [],
    [dict],
  )

  return useMemo(() => ({ lang: langCode, t, ta }), [langCode, t, ta])
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const value = useI18nValue()
  const pathname = usePathname()

  useLayoutEffect(() => {
    document.documentElement.lang = value.lang
  }, [value.lang])

  useEffect(() => {
    const applyTitle = () => {
      const key = documentTitleKeys[pathname]
      if (!key) return
      const title = lookupString(dictionaries[value.lang], key)
      if (title && document.title !== title) document.title = title
    }
    applyTitle()
    const titleEl = document.querySelector('title')
    if (!titleEl) return
    const observer = new MutationObserver(applyTitle)
    observer.observe(titleEl, { childList: true, characterData: true, subtree: true })
    return () => observer.disconnect()
  }, [value.lang, pathname])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  const ctx = useContext(I18nContext)
  const fallback = useI18nValue()
  return ctx ?? fallback
}

export function translate(lang: LangCode, key: string) {
  return lookupString(dictionaries[lang], key) ?? key
}

export function translateArray(lang: LangCode, key: string) {
  return lookupStringArray(dictionaries[lang], key) ?? []
}

export function translateValue(lang: LangCode, key: string) {
  return lookup(dictionaries[lang], key)
}
