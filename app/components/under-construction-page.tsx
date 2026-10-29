'use client'

import Link from 'next/link'
import { SiteClosing } from './site-closing'
import { useTranslation } from '../i18n/use-translation'
import styles from './under-construction.module.css'

export function UnderConstructionPage({
  eyebrowKey,
  titleId,
}: {
  eyebrowKey: string
  titleId: string
}) {
  const { t } = useTranslation()

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby={titleId}>
        <div className={styles.card}>
          <p className={styles.eyebrow}>{t(eyebrowKey)}</p>
          <h1 id={titleId}>{t('construction.title')}</h1>
          <p className={styles.body}>{t('construction.body')}</p>
          <Link href="/index" className="pill-btn">
            <span>{t('common.backHomepage')}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>
      <SiteClosing />
    </main>
  )
}
