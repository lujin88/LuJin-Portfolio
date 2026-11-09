/**
 * The visitor's "Don't record my visits" choice on /privacy.
 *
 * PostHog's own opt-out stops capturing but still loads its remote config and
 * calls /flags on every page, so the visitor's IP keeps reaching PostHog. This
 * flag is checked before posthog.init (instrumentation-client.ts), so an opted-out
 * browser never starts PostHog at all. Stored in localStorage: a choice the
 * visitor made, not tracking.
 */
export const RECORDING_OPT_OUT_KEY = 'lujin-recording-off'

export function recordingOptedOut() {
  try {
    return window.localStorage.getItem(RECORDING_OPT_OUT_KEY) === '1'
  } catch {
    return false
  }
}

export function setRecordingOptedOut(off: boolean) {
  try {
    if (off) window.localStorage.setItem(RECORDING_OPT_OUT_KEY, '1')
    else window.localStorage.removeItem(RECORDING_OPT_OUT_KEY)
  } catch {
    // Storage blocked: the choice only lasts for this page.
  }
}
