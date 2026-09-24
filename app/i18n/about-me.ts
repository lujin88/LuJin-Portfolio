import type { LangCode } from '@header/lib/language'

export const aboutMeTranslations = {
  en: {
    mainHeading: 'Designer. Builder. Explorer.',
    subtext:
      'I focus on harnessing AI to make everyday life more effortless, efficient, and fulfilling for everyone.',
    annotations: {
      curious: 'Curious by nature, Always in progress.',
      travel: 'Travel',
      design: 'Design',
      kids: 'My kids',
      coffee: 'Good Coffee',
    },
    cards: {
      card1Title: 'AI for Everyday Well-Being',
      card1Desc:
        'Exploring how AI can make technology feel more human, turning complex intelligence into simple daily joy and peace of mind.',
      card2Title: 'Effortless Productivity',
      card2Desc:
        'Designing intelligent workflows that reduce cognitive load, so people can spend less time doing friction work and more time living.',
      card3Title: 'Human-First Innovation',
      card3Desc:
        'Building AI products that empower real people — focusing on real-world impact, ethical design, and happier everyday lives.',
    },
    stats: {
      years: 'Years in Design',
      products: 'Products & Services',
      advisors: 'Client Advisors',
      location: 'Based in Zurich, Switzerland',
    },
  },
  de: {
    mainHeading: 'Gestalterin. Entwicklerin. Entdeckerin.',
    subtext:
      'Ich konzentriere mich darauf, KI so einzusetzen, dass der Alltag für alle müheloser, effizienter und erfüllender wird.',
    annotations: {
      curious: 'Von Natur aus neugierig, Immer im Wandel.',
      travel: 'Reisen',
      design: 'Design',
      kids: 'Meine Kinder',
      coffee: 'Guter Kaffee',
    },
    cards: {
      card1Title: 'KI für alltägliches Wohlbefinden',
      card1Desc:
        'Erforschung, wie KI Technologie menschlicher gestalten kann – für mehr einfache Freude und Gelassenheit im Alltag.',
      card2Title: 'Mühelose Produktivität',
      card2Desc:
        'Gestaltung intelligenter Workflows, die die kognitive Belastung reduzieren, damit Menschen weniger Zeit mit Routineaufgaben verbringen.',
      card3Title: 'Menschzentrierte Innovation',
      card3Desc:
        'Entwicklung von KI-Produkten, die echte Menschen stärken – mit Fokus auf echte Wirkung, ethisches Design und mehr Lebensfreude.',
    },
    stats: {
      years: 'Jahre im Design',
      products: 'Produkte & Services',
      advisors: 'Kundenberater',
      location: 'Wohnhaft in Zürich, Schweiz',
    },
  },
} as const

const aboutPageTranslations = {
  en: {
    documentTitle: 'Lu — About',
    heroTitleHtml: 'Hey, I am<br />Lu',
    startBtn: 'A Quick Hi',
    eyebrow: 'About me',
    scrolls: 'Scrolls',
    contactHeading: 'Have an opportunity in mind?',
    letsTalk: "Let's talk",
    downloadCv: 'Download CV',
    footerRights: '© 2026 Lu Jin. All rights reserved.',
    footerCredit: 'Designed with vibe coding, tailored in Cursor.',
    closeVideo: 'Close video',
    avatarLabel: 'Illustrated Lu at her desk. Hover to play a short animation.',
    altTravel: 'Alpine lake between forested mountains',
    altDesign: 'Printed wireframe sketches of mobile and web layouts',
    altKids: 'A child swimming underwater in a blue pool',
    altCoffee: 'A latte with heart-shaped foam art',
    altAvatar: 'Illustrated portrait of Lu working at a laptop, with books and coffee.',
  },
  de: {
    documentTitle: 'Lu — Über mich',
    heroTitleHtml: 'Hey, ich bin<br />Lu',
    startBtn: 'Ein kurzes Hi',
    eyebrow: 'Über mich',
    scrolls: 'Scrollen',
    contactHeading: 'Haben Sie ein Vorhaben im Kopf?',
    letsTalk: 'Lass uns sprechen',
    downloadCv: 'Lebenslauf',
    footerRights: '© 2026 Lu Jin. Alle Rechte vorbehalten.',
    footerCredit: 'Gestaltet mit Vibe Coding, verfeinert in Cursor.',
    closeVideo: 'Video schließen',
    avatarLabel: 'Illustrierte Lu an ihrem Schreibtisch. Darüberfahren, um eine kurze Animation abzuspielen.',
    altTravel: 'Alpiner See zwischen bewaldeten Bergen',
    altDesign: 'Gedruckte Wireframe-Skizzen von Mobile- und Web-Layouts',
    altKids: 'Ein Kind schwimmt unter Wasser in einem blauen Pool',
    altCoffee: 'Ein Latte mit herzförmiger Milchschaumkunst',
    altAvatar: 'Illustriertes Porträt von Lu an einem Laptop, mit Büchern und Kaffee.',
  },
} as const

function formatHeading(value: string) {
  return value.replace(/\. /g, '.<br />')
}

function formatScribble(value: string) {
  return value.replace(', ', ',<br />')
}

function splitLocation(location: string, lang: LangCode) {
  if (lang === 'de' || location.startsWith('Wohnhaft')) {
    return { lead: 'Wohnhaft in', place: 'Zürich, Schweiz' }
  }
  return { lead: 'Based in', place: 'Zurich, Switzerland' }
}

function setText(el: Element | null, value: string) {
  if (!el) return
  el.textContent = value
}

function setHtml(el: Element | null, value: string) {
  if (!el) return
  el.innerHTML = value
}

function setAttr(el: Element | null, attr: string, value: string) {
  if (!el) return
  el.setAttribute(attr, value)
}

export function aboutCopyFor(currentLang: string) {
  const lang: LangCode = currentLang === 'de' ? 'de' : 'en'
  const t = aboutMeTranslations[lang]
  const page = aboutPageTranslations[lang]
  const location = splitLocation(t.stats.location, lang)
  return {
    lang,
    t,
    page,
    mainHeadingHtml: formatHeading(t.mainHeading),
    curiousHtml: formatScribble(t.annotations.curious),
    locationLead: location.lead,
    locationPlace: location.place,
  }
}

export function applyAboutTranslations(currentLang: string) {
  const { lang, t, page, mainHeadingHtml, curiousHtml, locationLead, locationPlace } =
    aboutCopyFor(currentLang)

  const root =
    document.getElementById('about-page-root') ??
    document.getElementById('second')?.closest('body') ??
    document

  const byKey = (key: string) => root.querySelector(`[data-i18n="${key}"]`)
  const allByKey = (key: string) => root.querySelectorAll(`[data-i18n="${key}"]`)

  setHtml(byKey('mainHeading'), mainHeadingHtml)
  setText(byKey('subtext'), t.subtext)
  setHtml(byKey('annotations.curious'), curiousHtml)
  setText(byKey('annotations.travel'), t.annotations.travel)
  setText(byKey('annotations.design'), t.annotations.design)
  setText(byKey('annotations.kids'), t.annotations.kids)
  setText(byKey('annotations.coffee'), t.annotations.coffee)
  setText(byKey('cards.card1Title'), t.cards.card1Title)
  setText(byKey('cards.card1Desc'), t.cards.card1Desc)
  setText(byKey('cards.card2Title'), t.cards.card2Title)
  setText(byKey('cards.card2Desc'), t.cards.card2Desc)
  setText(byKey('cards.card3Title'), t.cards.card3Title)
  setText(byKey('cards.card3Desc'), t.cards.card3Desc)
  setText(byKey('stats.years'), t.stats.years)
  setText(byKey('stats.products'), t.stats.products)
  setText(byKey('stats.advisors'), t.stats.advisors)
  setText(byKey('stats.locationLead'), locationLead)
  setText(byKey('stats.locationPlace'), locationPlace)

  setHtml(byKey('page.heroTitle'), page.heroTitleHtml)
  setText(byKey('page.startBtn'), page.startBtn)
  setText(byKey('page.eyebrow'), page.eyebrow)
  setText(byKey('page.scrolls'), page.scrolls)
  setText(byKey('page.contactHeading'), page.contactHeading)
  setText(byKey('page.letsTalk'), page.letsTalk)
  setText(byKey('page.downloadCv'), page.downloadCv)
  setText(byKey('page.footerRights'), page.footerRights)
  setText(byKey('page.footerCredit'), page.footerCredit)

  setAttr(byKey('page.closeVideo'), 'aria-label', page.closeVideo)
  setAttr(byKey('page.avatarLabel'), 'aria-label', page.avatarLabel)
  setAttr(byKey('page.altTravel'), 'alt', page.altTravel)
  setAttr(byKey('page.altDesign'), 'alt', page.altDesign)
  setAttr(byKey('page.altKids'), 'alt', page.altKids)
  setAttr(byKey('page.altCoffee'), 'alt', page.altCoffee)
  setAttr(byKey('page.altAvatar'), 'alt', page.altAvatar)

  allByKey('page.letsTalk').forEach((el) => setText(el, page.letsTalk))

  if (document.getElementById('second') || document.getElementById('about-page-root')) {
    document.title = page.documentTitle
  }

  return lang
}
