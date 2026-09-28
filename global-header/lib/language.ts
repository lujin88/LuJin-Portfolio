'use client'

import { useLayoutEffect, useSyncExternalStore } from 'react'

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
] as const

export type LangCode = (typeof LANGUAGES)[number]['code']
export type SiteLanguage = (typeof LANGUAGES)[number]

export const LANG_STORAGE_KEY = 'site-lang'
export const LANG_CHANGE_EVENT = 'site-lang-change'

const listeners = new Set<() => void>()

function isLangCode(value: string | null | undefined): value is LangCode {
  return value === 'en' || value === 'de'
}

export function readStoredLang(): LangCode {
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY)
    if (isLangCode(stored)) return stored
  } catch {
    /* private mode / blocked storage */
  }
  return 'en'
}

function writeStoredLang(code: LangCode) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, code)
  } catch {
    /* private mode / blocked storage */
  }
}

function applyDocumentLang(code: LangCode) {
  document.documentElement.lang = code
}

let current: LangCode = 'en'
let didHydrate = false

function emit(code: LangCode) {
  window.dispatchEvent(new CustomEvent(LANG_CHANGE_EVENT, { detail: { lang: code } }))
}

function notify() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getClientLang() {
  return didHydrate ? current : 'en'
}

function getServerLang(): LangCode {
  return 'en'
}

export function getSiteLang(): LangCode {
  return current
}

export function setSiteLanguage(next: SiteLanguage | LangCode) {
  const code: LangCode = typeof next === 'string' ? next : next.code
  if (!isLangCode(code)) return
  const changed = current !== code
  current = code
  writeStoredLang(code)
  applyDocumentLang(code)
  emit(code)
  if (changed) notify()
}

let storageBound = false

function bindStorageListener() {
  if (storageBound || typeof window === 'undefined') return
  storageBound = true
  window.addEventListener('storage', (event) => {
    if (event.key !== LANG_STORAGE_KEY) return
    if (!isLangCode(event.newValue)) return
    if (event.newValue === current) return
    current = event.newValue
    applyDocumentLang(current)
    notify()
  })
}

export function hydrateSiteLanguage() {
  if (didHydrate || typeof window === 'undefined') return
  didHydrate = true
  bindStorageListener()
  const stored = readStoredLang()
  applyDocumentLang(stored)
  if (stored === current) return
  current = stored
  emit(stored)
  notify()
}

export function languageFromCode(code: LangCode): SiteLanguage {
  return LANGUAGES.find((lang) => lang.code === code) ?? LANGUAGES[0]
}

export function useSiteLanguage() {
  const code = useSyncExternalStore(subscribe, getClientLang, getServerLang)

  useLayoutEffect(() => {
    hydrateSiteLanguage()
  }, [])

  return {
    langCode: code,
    language: languageFromCode(code),
    setLanguage: setSiteLanguage,
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key !== LANG_STORAGE_KEY) return
    if (!isLangCode(event.newValue)) return
    if (event.newValue === current) return
    current = event.newValue
    applyDocumentLang(current)
    notify()
  })
}
