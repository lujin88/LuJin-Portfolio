import type { LangCode } from '@header/lib/language'
import { common } from './common'
import { home } from './home'
import { lab, wip } from './lab'
import { ai } from './ai'
import { ca } from './ca'
import { eon } from './eon'

export const dictionaries = {
  en: {
    common: common.en,
    home: home.en,
    lab: lab.en,
    wip: wip.en,
    ai: ai.en,
    ca: ca.en,
    eon: eon.en,
  },
  de: {
    common: common.de,
    home: home.de,
    lab: lab.de,
    wip: wip.de,
    ai: ai.de,
    ca: ca.de,
    eon: eon.de,
  },
} as const satisfies Record<LangCode, unknown>

export type Dictionaries = (typeof dictionaries)[LangCode]

export const documentTitleKeys: Record<string, string> = {
  '/index': 'home.documentTitle',
  '/lab': 'lab.documentTitle',
  '/ai-workflow-case': 'ai.documentTitle',
  '/wip': 'wip.documentTitle',
  '/client-advisory': 'ca.documentTitle',
  '/client-advisor': 'ca.documentTitle',
  '/EON': 'eon.documentTitle',
  '/eon-solar': 'eon.documentTitle',
  '/about': 'common.documentTitleAbout',
}
