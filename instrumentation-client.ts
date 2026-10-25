import posthog from 'posthog-js'

/**
 * PostHog product analytics (EU Cloud).
 *
 * Off unless NEXT_PUBLIC_POSTHOG_KEY is set (local `.env.local` or the host's
 * env settings). The project token is write-only by design, but Next inlines
 * NEXT_PUBLIC_* values into the client bundle, so it still ships to visitors.
 *
 * NEXT_PUBLIC_POSTHOG_PERSISTENCE picks where PostHog keeps the visitor id:
 * - `memory` (default): nothing stored. Every full page load is a new
 *   visitor, so funnels across pages (home → case study) do not join up.
 * - `sessionStorage`: one id per browser tab, gone when the tab closes.
 * - `localStorage+cookie`: recognises returning visitors. Usually needs a
 *   consent banner in the EU; this site does not have one.
 */
const POSTHOG_HOST = 'https://eu.i.posthog.com'

const PERSISTENCE_MODES = ['memory', 'sessionStorage', 'localStorage+cookie'] as const
type PersistenceMode = (typeof PERSISTENCE_MODES)[number]

function persistenceMode(value: string | undefined): PersistenceMode {
  return PERSISTENCE_MODES.find((mode) => mode === value) ?? 'memory'
}

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY

if (key) {
  posthog.init(key, {
    api_host: POSTHOG_HOST,
    defaults: '2026-08-30',
    persistence: persistenceMode(process.env.NEXT_PUBLIC_POSTHOG_PERSISTENCE),
    person_profiles: 'identified_only',
  })
}
