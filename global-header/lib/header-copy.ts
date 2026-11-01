import type { LangCode } from './language'

export const headerCopy = {
  en: {
    nav: {
      Work: 'Work',
      'How I work': 'How I work',
      Playground: 'Playground',
      'Client Advisory': 'Client Advisory',
      'E.ON': 'E.ON',
      'MAN Truck & Bus': 'MAN Truck & Bus',
      'ETF Savings Plan': 'ETF Savings Plan',
      'Design System': 'Design System',
      'Weather Aquarium': 'Weather Aquarium',
      'AI Pet': 'AI Pet',
      Gratula: 'Gratula',
    },
    meta: {
      'Wealth · Service design': 'Wealth · Service design',
      'E-commerce · +300% conversion': 'E-commerce · +300% conversion',
      'Rive motion': 'Rive motion',
      'Under construction': 'Under construction',
      'Voice · Hardware': 'Voice · Hardware',
      'Sparplan · Design system': 'Sparplan · Design system',
      'Launching soon': 'Launching soon',
    },
    contactMe: 'Contact me',
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
      Work: 'Arbeit',
      'How I work': 'Wie ich arbeite',
      Playground: 'Playground',
      'Client Advisory': 'Client Advisory',
      'E.ON': 'E.ON',
      'MAN Truck & Bus': 'MAN Truck & Bus',
      'ETF Savings Plan': 'ETF Savings Plan',
      'Design System': 'Design System',
      'Weather Aquarium': 'Weather Aquarium',
      'AI Pet': 'AI Pet',
      Gratula: 'Gratula',
    },
    meta: {
      'Wealth · Service design': 'Wealth · Service Design',
      'E-commerce · +300% conversion': 'E-Commerce · +300 % Conversion',
      'Rive motion': 'Rive Motion',
      'Under construction': 'Im Aufbau',
      'Voice · Hardware': 'Stimme · Hardware',
      'Sparplan · Design system': 'Sparplan · Designsystem',
      'Launching soon': 'Startet bald',
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
    meta: Record<string, string>
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
