'use client'

import Link from 'next/link'
import { useTranslation } from '@i18n/use-translation'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <main className="not-found">
      <p className="not-found__code">404</p>
      <h1>{t('common.pageNotFound')}</h1>
      <p className="not-found__body">{t('common.pageNotFoundBody')}</p>
      <Link href="/index" className="not-found__home">
        {t('common.backHome')}
      </Link>
      <style>{`
        .not-found {
          display: flex;
          min-height: 100dvh;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
          padding: 1.5rem;
          text-align: center;
          color: #f9fbfc;
          font-family: var(--font-poppins), Poppins, ui-sans-serif, system-ui, sans-serif;
        }
        .not-found__code {
          margin: 0;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: rgba(249, 251, 252, 0.5);
        }
        .not-found h1 {
          margin: 1rem 0 0;
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .not-found__body {
          margin: 0.75rem 0 0;
          max-width: 28rem;
          color: rgba(249, 251, 252, 0.65);
        }
        .not-found__home {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.75rem;
          margin-top: 2rem;
          padding: 0 1.25rem;
          border: 1px solid rgba(249, 251, 252, 0.3);
          border-radius: 999px;
          color: #f9fbfc;
          font-weight: 600;
          text-decoration: none;
        }
        .not-found__home:focus-visible {
          outline: 2px solid #f9fbfc;
          outline-offset: 3px;
        }
      `}</style>
    </main>
  )
}
