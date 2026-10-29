'use client'

import { Icon } from '../../components/line-icon'
import { useTranslation } from '../../i18n/use-translation'
import styles from './playbook.module.css'

const PLAYBOOK = '/ai-ui-process/index.html'
const PROCESS_SHOT = '/assets/images/backup/ai-design-process.png'

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
          <div className={styles.frame}>
            <div className={styles.device}>
              <span className={styles.handle} data-corner="tl" />
              <span className={styles.handle} data-corner="tr" />
              <span className={styles.handle} data-corner="bl" />
              <span className={styles.handle} data-corner="br" />
              <img
                className={styles.shot}
                src={PROCESS_SHOT}
                alt="Design process workspace with search, your situation, and the steps from discover through launch."
              />
            </div>

            <p className={`${styles.callout} ${styles.calloutGuide}`}>
              <strong>{t('wow.guideTitle')}</strong>
              <span>{t('wow.guideBody')}</span>
            </p>
            <p className={`${styles.callout} ${styles.calloutAnswers}`}>
              <strong>{t('wow.answersTitle')}</strong>
              <span>{t('wow.answersBody')}</span>
            </p>
            <p className={`${styles.callout} ${styles.calloutFind}`}>
              <strong>{t('wow.findTitle')}</strong>
              <span>{t('wow.findBody')}</span>
            </p>
          </div>
        </div>

        <a className={styles.cta} href={PLAYBOOK}>
          {t('wow.playbookCta')}
          <Icon name="arrow-right-up-line" />
        </a>
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
