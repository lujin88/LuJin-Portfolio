import type { LangCode } from '@header/lib/language'

export const aboutMeTranslations = {
  en: {
    mainHeading: 'Designer. Builder. Explorer.',
    subtext:
      'I focus on harnessing AI to make everyday life more effortless, efficient, and fulfilling for everyone.',
    annotations: {
      curious: 'Curious by nature, Always in progress.',
      travel: 'Travel',
      design: 'Tea Time',
      kids: 'Swim to Reset',
      coffee: 'Vibe Coding',
    },
    cards: {
      card1Label: 'How I work',
      card1Title: 'Connect the dots.',
      card1Desc: 'Turn complex problems into clear direction.',
      card2Label: 'What I care about',
      card2Title: 'Better work. More life.',
      card2Desc: 'Less friction, more time for what matters.',
      card3Label: 'What keeps me curious',
      card3Title: 'Always exploring.',
      card3Desc: 'Vibe coding, new tools, hardware and small experiments.',
    },
    stats: {
      years: 'Years in Design',
      cases: 'Cases',
      events: 'Events Co-Hosted',
      locationLead: 'CH base',
      locationPlace: 'Location',
    },
  },
  de: {
    mainHeading: 'Gestalterin. Entwicklerin. Entdeckerin.',
    subtext:
      'Ich konzentriere mich darauf, KI so einzusetzen, dass der Alltag für alle müheloser, effizienter und erfüllender wird.',
    annotations: {
      curious: 'Von Natur aus neugierig, Immer im Wandel.',
      travel: 'Reisen',
      design: 'Teezeit',
      kids: 'Schwimmen zum Reset',
      coffee: 'Vibe Coding',
    },
    cards: {
      card1Label: 'So arbeite ich',
      card1Title: 'Punkte verbinden.',
      card1Desc: 'Komplexe Probleme in klare Richtung übersetzen.',
      card2Label: 'Was mir wichtig ist',
      card2Title: 'Bessere Arbeit. Mehr Leben.',
      card2Desc: 'Weniger Reibung, mehr Zeit für das Wesentliche.',
      card3Label: 'Was mich neugierig hält',
      card3Title: 'Immer am Entdecken.',
      card3Desc: 'Vibe Coding, neue Tools, Hardware und kleine Experimente.',
    },
    stats: {
      years: 'Jahre im Design',
      cases: 'Cases',
      events: 'Co-gehostete Events',
      locationLead: 'CH-Base',
      locationPlace: 'Standort',
    },
  },
} as const

const aboutPageTranslations = {
  en: {
    documentTitle: 'Lu — About',
    heroTitleHtml: 'Hey, I am<br />Lu',
    startBtn: 'A Quick Hi',
    eyebrow: 'About me',
    contactHeading: 'Have an opportunity in mind?',
    letsTalk: "Let's talk",
    downloadCv: 'Download CV',
    footerRights: '© 2026 Lu Jin. All rights reserved.',
    footerCredit: 'Designed with AI. Refined with Cursor.',
    closeVideo: 'Close video',
    introDialog: 'Introduction video',
    avatarLabel: 'Illustrated Lu at her desk.',
    altTravel: 'Alpine lake between forested mountains',
    altDesign: 'Glass teapot steeping tea on a wooden table',
    altKids: 'A child swimming underwater in a blue pool',
    altCoffee: 'Laptop on a desk by a window, used for hobby vibe coding',
    altAvatar: 'Illustrated portrait of Lu working at a laptop, with books and coffee.',
  },
  de: {
    documentTitle: 'Lu — Über mich',
    heroTitleHtml: 'Hey, ich bin<br />Lu',
    startBtn: 'Ein kurzes Hi',
    eyebrow: 'Über mich',
    contactHeading: 'Haben Sie ein Vorhaben im Kopf?',
    letsTalk: 'Lass uns sprechen',
    downloadCv: 'Lebenslauf',
    footerRights: '© 2026 Lu Jin. Alle Rechte vorbehalten.',
    footerCredit: 'Gestaltet mit KI. Verfeinert mit Cursor.',
    closeVideo: 'Video schließen',
    introDialog: 'Vorstellungsvideo',
    avatarLabel: 'Illustrierte Lu an ihrem Schreibtisch.',
    altTravel: 'Alpiner See zwischen bewaldeten Bergen',
    altDesign: 'Glaskanne mit Tee auf einem Holztisch',
    altKids: 'Ein Kind schwimmt unter Wasser in einem blauen Pool',
    altCoffee: 'Laptop auf einem Schreibtisch am Fenster, für Hobby-Vibe-Coding',
    altAvatar: 'Illustriertes Porträt von Lu an einem Laptop, mit Büchern und Kaffee.',
  },
} as const

function formatHeading(value: string) {
  return value.replace(/\. /g, '.<br />')
}

function formatScribble(value: string) {
  return value.replace(', ', ',<br />')
}

function splitLocation(lang: LangCode) {
  const t = aboutMeTranslations[lang]
  return { lead: t.stats.locationLead, place: t.stats.locationPlace }
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
  const location = splitLocation(lang)
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
  setText(byKey('cards.card1Label'), t.cards.card1Label)
  setText(byKey('cards.card1Title'), t.cards.card1Title)
  setText(byKey('cards.card1Desc'), t.cards.card1Desc)
  setText(byKey('cards.card2Label'), t.cards.card2Label)
  setText(byKey('cards.card2Title'), t.cards.card2Title)
  setText(byKey('cards.card2Desc'), t.cards.card2Desc)
  setText(byKey('cards.card3Label'), t.cards.card3Label)
  setText(byKey('cards.card3Title'), t.cards.card3Title)
  setText(byKey('cards.card3Desc'), t.cards.card3Desc)
  setText(byKey('stats.years'), t.stats.years)
  setText(byKey('stats.cases'), t.stats.cases)
  setText(byKey('stats.events'), t.stats.events)
  setText(byKey('stats.locationLead'), locationLead)
  setText(byKey('stats.locationPlace'), locationPlace)

  setHtml(byKey('page.heroTitle'), page.heroTitleHtml)
  setText(byKey('page.startBtn'), page.startBtn)
  setText(byKey('page.eyebrow'), page.eyebrow)
  setText(byKey('page.contactHeading'), page.contactHeading)
  setText(byKey('page.letsTalk'), page.letsTalk)
  setText(byKey('page.downloadCv'), page.downloadCv)
  setText(byKey('page.footerRights'), page.footerRights)
  setText(byKey('page.footerCredit'), page.footerCredit)

  setAttr(byKey('page.closeVideo'), 'aria-label', page.closeVideo)
  setAttr(document.getElementById('introOverlay'), 'aria-label', page.introDialog)
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
