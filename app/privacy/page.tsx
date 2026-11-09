'use client'

import { SiteClosing } from '../components/site-closing'
import { useTranslation } from '@i18n'
import { RecordingToggle } from './recording-toggle'
import '../components/site-closing-case.css'
import './privacy.css'

const SECTIONS = [
  ['responsibleTitle', ['responsibleBody', 'legalBasis']],
  ['hostingTitle', ['hostingBody', 'hostingFonts']],
  ['statsTitle', ['statsBody']],
  ['askTitle', ['askBody']],
  ['abroadTitle', []],
  ['cookiesTitle', ['cookiesBody']],
  ['rightsTitle', ['rightsBody']],
] as const

export default function PrivacyPage() {
  const { t } = useTranslation()

  return (
    <main className="privacy">
      <article className="privacy__article" aria-labelledby="privacy-title">
        <h1 id="privacy-title">{t('privacy.title')}</h1>
        <p>{t('privacy.intro')}</p>
        {SECTIONS.map(([title, paragraphs]) => (
          <section key={title}>
            <h2>{t(`privacy.${title}`)}</h2>
            {title === 'abroadTitle' ? (
              <p>
                {t('privacy.abroadBody')}{' '}
                <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noreferrer">
                  {t('privacy.abroadLink')}
                </a>
                ).
              </p>
            ) : (
              paragraphs.map((key) => <p key={key}>{t(`privacy.${key}`)}</p>)
            )}
          </section>
        ))}
        <p className="privacy__updated">{t('privacy.updated')}</p>
        <RecordingToggle />
      </article>
      <SiteClosing className="site-closing-case" />
    </main>
  )
}
