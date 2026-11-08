import type { LangCode } from '@header/lib/language'
import { common } from './common'
import { home } from './home'
import { construction, lab, pet } from './lab'
import { wow } from './wow'
import { ca } from './ca'
import { eon } from './eon'
import { fieldNotes } from './field-notes'

export const dictionaries = {
  en: {
    common: common.en,
    home: home.en,
    lab: lab.en,
    pet: pet.en,
    construction: construction.en,
    wow: wow.en,
    ca: ca.en,
    eon: eon.en,
    fieldNotes: fieldNotes.en,
  },
  de: {
    common: common.de,
    home: home.de,
    lab: lab.de,
    pet: pet.de,
    construction: construction.de,
    wow: wow.de,
    ca: ca.de,
    eon: eon.de,
    fieldNotes: fieldNotes.de,
  },
} as const satisfies Record<LangCode, unknown>

export type Dictionaries = (typeof dictionaries)[LangCode]

export const documentTitleKeys: Record<string, string> = {
  '/': 'home.documentTitle',
  '/index': 'home.documentTitle',
  '/lab': 'lab.documentTitle',
  '/lab/way-of-work': 'wow.documentTitle',
  '/lab/party-planner': 'lab.partyPlannerTitle',
  '/lab/weather-aquarium': 'lab.weatherAquariumTitle',
  '/ai-companion-pet': 'pet.documentTitle',
  '/man-truck-bus': 'construction.man.documentTitle',
  '/etf-savings-plan': 'construction.etf.documentTitle',
  '/client-advisory': 'ca.documentTitle',
  '/client-advisor': 'ca.documentTitle',
  '/EON': 'eon.documentTitle',
  '/eon-solar': 'eon.documentTitle',
}
