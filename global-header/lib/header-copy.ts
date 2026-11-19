import type { LangCode } from './language'

export const headerCopy = {
  en: {
    nav: {
      Work: 'Work',
      Project: 'Project',
      Concept: 'Concept',
      'How I work': 'How I work',
      Playground: 'Playground',
      'Client Advisory': 'Client Advisory',
      'E.ON': 'E.ON',
      'MAN Truck & Bus': 'MAN Truck & Bus',
      'ETF Savings Plan': 'ETF Savings Plan',
      'BMW Design System': 'BMW Design System',
      'Weather Aquarium': 'Weather Aquarium',
      'AI Pet': 'AI Pet',
      Gratula: 'Gratula',
      'Agent Tools': 'Agent Tools',
    },
    meta: {
      'Wealth · Service design': 'Wealth · Service design',
      'Energy · +300% lead conversion in 3 months': 'Energy · +300% lead conversion in 3 months',
      'Rive motion': 'Rive motion',
      'Hackathon · Fleet dispatch': 'Hackathon · Fleet dispatch',
      'Fleet uptime · Dispatch': 'Fleet uptime · Dispatch',
      'Under construction': 'Under construction',
      'Investing · Interactive prototype': 'Investing · Interactive prototype',
      'Voice · Hardware': 'Voice · Hardware',
      'Vehicle controls · Light & dark': 'Vehicle controls · Light & dark',
      'Party planning · Prototype': 'Party planning · Prototype',
      'Agent Monitor · Scranton': 'Agent Monitor · Scranton',
    },
    contactMe: 'Contact me',
    email: 'Email',
    languageLabel: 'Language',
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
      Work: 'Arbeit',
      Project: 'Project',
      Concept: 'Concept',
      'How I work': 'Wie ich arbeite',
      Playground: 'Playground',
      'Client Advisory': 'Client Advisory',
      'E.ON': 'E.ON',
      'MAN Truck & Bus': 'MAN Truck & Bus',
      'ETF Savings Plan': 'ETF Savings Plan',
      'BMW Design System': 'BMW Design System',
      'Weather Aquarium': 'Weather Aquarium',
      'AI Pet': 'AI Pet',
      Gratula: 'Gratula',
      'Agent Tools': 'Agent Tools',
    },
    meta: {
      'Wealth · Service design': 'Wealth · Service Design',
      'Energy · +300% lead conversion in 3 months': 'Energie · +300 % Lead-Conversion in 3 Monaten',
      'Rive motion': 'Rive Motion',
      'Hackathon · Fleet dispatch': 'Hackathon · Flottendisposition',
      'Fleet uptime · Dispatch': 'Flottenverfügbarkeit · Disposition',
      'Under construction': 'Im Aufbau',
      'Investing · Interactive prototype': 'Anlegen · Interaktiver Prototyp',
      'Voice · Hardware': 'Stimme · Hardware',
      'Vehicle controls · Light & dark': 'Fahrzeugsteuerung · Hell & Dunkel',
      'Party planning · Prototype': 'Partyplanung · Prototyp',
      'Agent Monitor · Scranton': 'Agent Monitor · Scranton',
    },
    contactMe: 'Kontakt',
    email: 'E-Mail',
    languageLabel: 'Sprache',
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
    meta: Record<string, string>
    contactMe: string
    email: string
    languageLabel: string
    skipToContent: string
    languageAria: (label: string) => string
    selectLanguage: string
    closeMenu: string
    openMenu: string
    mobileNav: string
    mainNav: string
  }
>
