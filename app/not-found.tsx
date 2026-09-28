'use client'

import Link from 'next/link'
import { SiteHeader } from '@header/components/site-header'
import { useTranslation } from '@i18n/use-translation'
import '@header/header.css'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <>
      <link rel="stylesheet" href="/styles/shell-tokens.css" />
      <SiteHeader activeHref="" />
      <main id="site-content" tabIndex={-1} className="not-found">
        <p className="not-found__code">404</p>
        <h1>{t('common.pageNotFound')}</h1>
        <p className="not-found__body">{t('common.pageNotFoundBody')}</p>
        <Link href="/index" className="not-found__home">
          {t('common.backHome')}
        </Link>
      </main>
      <style>{`
        .not-found {
          display: flex;
          min-height: 100dvh;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-page, #0a0a0a);
          padding: 7rem 1.5rem 3rem;
          text-align: center;
          color: var(--color-text-1, #f9fbfc);
          font-family: var(--font-poppins), Poppins, ui-sans-serif, system-ui, sans-serif;
        }
        .not-found__code {
          margin: 0;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: var(--color-text-3, #777e85);
        }
        .not-found h1 {
          margin: 1rem 0 0;
          font-size: clamp(2rem, 5vw, 2.25rem);
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .not-found__body {
          margin: 0.75rem 0 0;
          max-width: 28rem;
          color: var(--color-text-2, #b6bbc2);
        }
        .not-found__home {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.75rem;
          margin-top: 2rem;
          padding: 0 1.35rem;
          border: 1px solid var(--pill-border, rgba(249, 251, 252, 0.45));
          border-radius: 999px;
          color: var(--pill-text, #f9fbfc);
          font-weight: 600;
          text-decoration: none;
        }
        .not-found__home:hover {
          background: var(--pill-hover-bg, #f9fbfc);
          color: var(--pill-hover-text, #0a0a0a);
        }
        .not-found__home:focus-visible {
          outline: 2px solid var(--focus-ring, #8B5CF6);
          outline-offset: 3px;
        }
      `}</style>
    </>
  )
}
