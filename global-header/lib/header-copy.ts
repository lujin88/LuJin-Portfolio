import type { LangCode } from './language'

export const headerCopy = {
  en: {
    nav: {
      Projects: 'Projects',
      'Playground': 'Playground',
      About: 'About',
      'Client Advisory': 'Client Advisory',
      'E.ON': 'E.ON',
      'Action Center': 'Action Center',
      'Way of Work': 'Way of Work',
      'Off We Go Workbench': 'Off We Go Workbench',
      'Party Planner': 'Party Planner',
    },
    contactMe: 'Contact Me',
    email: 'Email',
    skipToContent: 'Skip to content',
    languageAria: (label: string) => `Language: ${label}`,
    selectLanguage: 'Select language',
    closeMenu: 'Close menu',
    openMenu: 'Open menu',
    mobileNav: 'Mobile navigation',
    mainNav: 'Main navigation',
  },
  de: {
    nav: {
      Projects: 'Projekte',
      'Playground': 'Playground',
      About: 'Über mich',
      'Client Advisory': 'Client Advisory',
      'E.ON': 'E.ON',
      'Action Center': 'Action Center',
      'Way of Work': 'Way of Work',
      'Off We Go Workbench': 'Off We Go Workbench',
      'Party Planner': 'Party Planner',
    },
    contactMe: 'Kontakt',
    email: 'E-Mail',
    skipToContent: 'Zum Inhalt',
    languageAria: (label: string) => `Sprache: ${label}`,
    selectLanguage: 'Sprache wählen',
    closeMenu: 'Menü schließen',
    openMenu: 'Menü öffnen',
    mobileNav: 'Mobile Navigation',
    mainNav: 'Hauptnavigation',
  },
} as const satisfies Record<
  LangCode,
  {
    nav: Record<string, string>
    contactMe: string
    email: string
    skipToContent: string
    languageAria: (label: string) => string
    selectLanguage: string
    closeMenu: string
    openMenu: string
    mobileNav: string
    mainNav: string
  }
>
