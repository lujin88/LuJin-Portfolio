'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from '@i18n'
import { recordingOptedOut, setRecordingOptedOut } from '../recording-opt-out'

/**
 * "Don't record my visits". Both directions only flip our own flag and reload, so
 * instrumentation-client.ts decides on the next load whether PostHog starts at all
 * (see app/recording-opt-out.ts). Deliberately no posthog.opt_out_capturing(): it
 * stores a second flag of its own that would keep PostHog off after "turn back on"
 * (QA #2507). Hidden when the site runs without PostHog (no NEXT_PUBLIC_POSTHOG_KEY).
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
          window.location.reload()
        }}
      >
        <span>{t('privacy.optOut')}</span>
      </button>
    </p>
  )
}
