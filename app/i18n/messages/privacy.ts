// /privacy copy: copy OUTBOX/PRIVACY_DRAFT_1109/privacy.md (legal #2367, #2370, #2429, #2437).
// Each section is a heading and its paragraphs; links are rendered by the page.
export const privacy = {
  en: {
    documentTitle: 'Privacy',
    title: 'Privacy',
    intro: 'This is my personal portfolio. I keep data collection to a minimum. Here is what happens when you visit.',
    responsibleTitle: 'Who is responsible',
    responsibleBody: 'Lu Jin, Zurich, Switzerland · lu.jin.ixd@gmail.com',
    legalBasis: 'Legal basis: legitimate interest in running and improving the site (Art. 6(1)(f) GDPR).',
    hostingTitle: 'Hosting',
    hostingBody: 'The site runs on Vercel (USA). To deliver the pages, the server logs your IP address, the time and the pages you open.',
    // Remove once the /ai-ui-process pages self-host their fonts.
    hostingFonts: 'The Playbook pages in How I work still load fonts from Google Fonts (USA), which shares your IP address with Google.',
    statsTitle: 'Visit statistics',
    statsBody:
      'I use Vercel Web Analytics and PostHog (EU servers) to count visits and see which pages are read. Neither uses cookies, and PostHog stores no visitor ID in your browser. PostHog records how you move through a page, such as scrolling, clicks and the page content shown to you. Text you type and the Ask Lu conversation are masked and never recorded. Recordings are kept for a limited period. You can turn recording off with the button at the end of this page.',
    askTitle: 'Ask Lu',
    askBody:
      'When you ask Ask Lu a question, your recent messages in the chat are sent to Anthropic to write the answer. This site does not store the conversation. To prevent abuse, your IP address is kept for about one hour to limit the number of questions (Upstash). Please don’t enter personal or confidential information.',
    abroadTitle: 'Services outside Switzerland',
    abroadBody: 'Vercel and Anthropic are based in the USA. They process data under their own data protection terms (see',
    abroadLink: 'Anthropic’s privacy policy',
    cookiesTitle: 'No tracking cookies',
    cookiesBody:
      'This site sets no cookies for advertising or tracking, so there is no cookie banner. Your language choice, and your choice to turn recording off, are saved in your browser so the site remembers them.',
    rightsTitle: 'Your rights',
    rightsBody:
      'To ask what data relates to you, or to have it deleted, email me at the address above. You can also complain to the Swiss Federal Data Protection and Information Commissioner (FDPIC) or to the data protection authority in your EU country.',
    updated: 'Last updated: 9 November 2026',
    optOut: 'Don’t record my visits',
    optedOut: 'Recording is off in this browser.',
    optIn: 'Turn recording back on',
  },
  de: {
    documentTitle: 'Datenschutz',
    title: 'Datenschutz',
    intro: 'Dies ist mein persönliches Portfolio. Ich erhebe so wenige Daten wie möglich. Das passiert bei Ihrem Besuch:',
    responsibleTitle: 'Verantwortlich',
    responsibleBody: 'Lu Jin, Zürich, Schweiz · lu.jin.ixd@gmail.com',
    legalBasis:
      'Rechtsgrundlage: berechtigtes Interesse am Betrieb und an der Verbesserung der Website (Art. 6 Abs. 1 lit. f DSGVO).',
    hostingTitle: 'Hosting',
    hostingBody:
      'Die Website läuft bei Vercel (USA). Um die Seiten auszuliefern, protokolliert der Server Ihre IP-Adresse, die Uhrzeit und die aufgerufenen Seiten.',
    hostingFonts:
      'Die Playbook-Seiten unter „Wie ich arbeite“ laden Schriften noch von Google Fonts (USA); dabei wird Ihre IP-Adresse an Google übermittelt.',
    statsTitle: 'Besuchsstatistik',
    statsBody:
      'Ich nutze Vercel Web Analytics und PostHog (Server in der EU), um Besuche zu zählen und zu sehen, welche Seiten gelesen werden. Beide verwenden keine Cookies, und PostHog speichert keine Besucher-ID in Ihrem Browser. PostHog zeichnet auf, wie Sie sich auf einer Seite bewegen, etwa Scrollen, Klicks und die angezeigten Seiteninhalte. Was Sie eingeben und das Gespräch mit Ask Lu werden maskiert und nie aufgezeichnet. Aufzeichnungen werden für begrenzte Zeit gespeichert. Sie können die Aufzeichnung mit der Schaltfläche am Ende dieser Seite ausschalten.',
    askTitle: 'Ask Lu',
    askBody:
      'Wenn Sie Ask Lu eine Frage stellen, werden Ihre letzten Nachrichten im Chat an Anthropic gesendet, um die Antwort zu erstellen. Diese Website speichert das Gespräch nicht. Zum Schutz vor Missbrauch wird Ihre IP-Adresse etwa eine Stunde lang gespeichert, um die Zahl der Fragen zu begrenzen (Upstash). Bitte geben Sie keine persönlichen oder vertraulichen Informationen ein.',
    abroadTitle: 'Dienste außerhalb der Schweiz',
    abroadBody:
      'Vercel und Anthropic haben ihren Sitz in den USA. Sie verarbeiten Daten nach ihren eigenen Datenschutzbestimmungen (siehe',
    abroadLink: 'die Datenschutzerklärung von Anthropic',
    cookiesTitle: 'Keine Tracking-Cookies',
    cookiesBody:
      'Diese Website setzt keine Cookies für Werbung oder Tracking, daher gibt es kein Cookie-Banner. Ihre Sprachwahl und Ihre Entscheidung, die Aufzeichnung auszuschalten, werden in Ihrem Browser gespeichert, damit die Website sie sich merkt.',
    rightsTitle: 'Ihre Rechte',
    rightsBody:
      'Wenn Sie wissen möchten, welche Daten Sie betreffen, oder deren Löschung wünschen, schreiben Sie mir an die oben genannte Adresse. Sie können sich auch beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) oder bei der Datenschutzbehörde Ihres EU-Landes beschweren.',
    updated: 'Stand: 9. November 2026',
    optOut: 'Meine Besuche nicht aufzeichnen',
    optedOut: 'Die Aufzeichnung ist in diesem Browser ausgeschaltet.',
    optIn: 'Aufzeichnung wieder einschalten',
  },
} as const
