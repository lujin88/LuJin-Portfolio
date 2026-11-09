'use client'

import posthog from 'posthog-js'
import { useEffect, useState } from 'react'
import { useTranslation } from '@i18n'
import { recordingOptedOut, setRecordingOptedOut } from '../recording-opt-out'

/**
 * "Don't record my visits". Opting out stops PostHog on this page and keeps it
 * from starting on any later page (see app/recording-opt-out.ts). Turning it back
 * on reloads so PostHog initialises again. Hidden when the site runs without
 * PostHog (no NEXT_PUBLIC_POSTHOG_KEY).
 */
export function RecordingToggle() {
  const { t } = useTranslation()
  const [state, setState] = useState<'off' | 'on' | 'unavailable'>('unavailable')

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return
    setState(recordingOptedOut() ? 'off' : 'on')
  }, [])

  if (state === 'unavailable') return null

  if (state === 'off') {
    return (
      <p className="privacy__toggle">
        <span>{t('privacy.optedOut')}</span>{' '}
        <button
          type="button"
          className="privacy__link-button"
          onClick={() => {
            setRecordingOptedOut(false)
            window.location.reload()
          }}
        >
          {t('privacy.optIn')}
        </button>
      </p>
    )
  }

  return (
    <p className="privacy__toggle">
      <button
        type="button"
        className="pill-btn"
        onClick={() => {
          setRecordingOptedOut(true)
          if (posthog.__loaded) posthog.opt_out_capturing()
          setState('off')
        }}
      >
        <span>{t('privacy.optOut')}</span>
      </button>
    </p>
  )
}
