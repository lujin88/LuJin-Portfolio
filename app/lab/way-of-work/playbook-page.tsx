'use client'

import { Icon } from '../../components/icon'
import { useTranslation } from '../../i18n/use-translation'
import styles from './playbook.module.css'

const QUESTIONS = [
  'How is a PRD different from a Design Brief?',
  "What if there's no PRD?",
  'What are the Design Brief, Design System and Design Spec?',
  'When are KPIs set?',
  'What if chats get too long and use too many tokens?',
]

const PLAYBOOK = '/ai-ui-process/index.html'

export function PlaybookPage() {
  const { t } = useTranslation()

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="playbook-title">
        <div className={styles.intro}>
          <h1 id="playbook-title">{t('wow.playbookTitle')}</h1>
          <p>{t('wow.playbookLede')}</p>
        </div>

        <div className={styles.stage}>
          <p className={`${styles.callout} ${styles.calloutFind}`}>
            <strong>{t('wow.findTitle')}</strong>
            <span>{t('wow.findBody')}</span>
          </p>
          <div className={styles.notes}>
            <p className={`${styles.callout} ${styles.calloutGuide}`}>
              <strong>{t('wow.guideTitle')}</strong>
              <span>{t('wow.guideBody')}</span>
            </p>
            <p className={`${styles.callout} ${styles.calloutAnswers}`}>
              <strong>{t('wow.answersTitle')}</strong>
              <span>{t('wow.answersBody')}</span>
            </p>
          </div>

          <div className={styles.frame}>
            <span className={styles.handle} data-corner="tl" />
            <span className={styles.handle} data-corner="tr" />
            <span className={styles.handle} data-corner="bl" />
            <span className={styles.handle} data-corner="br" />
            <div className={styles.window} aria-hidden="true">
              <aside className={styles.rail}>
                <span className={styles.railMark}>
                  <Icon name="sparkling-line" />
                </span>
                <span><Icon name="file-list-3-line" /></span>
                <span><Icon name="layout-grid-line" /></span>
                <span className={styles.railOn}><Icon name="chat-smile-2-line" /></span>
              </aside>
              <div className={styles.sheet}>
                <div className={styles.toolbar}>
                  <span className={styles.search}>
                    <span className={styles.toolIcon}><Icon name="search-line" /></span>
                    Search prompts, checklists, templates…
                    <span className={styles.kbd}>⌘K</span>
                  </span>
                  <span className={styles.langs}>
                    <span>中文</span>
                    <span className={styles.langOn}>EN</span>
                    <span>DE</span>
                  </span>
                </div>
                <div className={styles.faq}>
                  <h2>FAQ</h2>
                  <p>Open a question to see the answer.</p>
                  <ul>
                    {QUESTIONS.map((question) => (
                      <li key={question}>
                        <span>{question}</span>
                        <Icon name="arrow-right-s-line" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a className={styles.cta} href={PLAYBOOK}>
          {t('wow.playbookCta')}
          <Icon name="arrow-right-up-line" />
        </a>
        <p className={styles.hint}>{t('wow.playbookHint')}</p>
      </section>

      <section className={styles.base} aria-label={t('wow.playbookName')}>
        <div>
          <p className={styles.kicker}>{t('wow.playbookMark')}</p>
          <h2>{t('wow.playbookName')}</h2>
        </div>
        <div className={styles.baseCopy}>
          <p className={styles.kicker}>{t('wow.updated')}</p>
          <p>{t('wow.updatedBody')}</p>
        </div>
      </section>
    </main>
  )
}
