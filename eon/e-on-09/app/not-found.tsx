'use client'

import Link from 'next/link'
import { useTranslation } from '@i18n/use-translation'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-navy-950 px-6 text-center text-white">
      <p className="text-sm font-semibold tracking-[0.16em] text-lavender">404</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">{t('common.pageNotFound')}</h1>
      <p className="mt-3 max-w-md text-base text-white/65">
        {t('common.pageNotFoundCaseBody')}
      </p>
      <Link
        href="/EON"
        className="mt-8 rounded-full bg-lavender px-5 py-2.5 text-sm font-semibold text-navy-950"
      >
        {t('common.backToCase')}
      </Link>
    </main>
  )
}
