'use client'

import { useEffect, useState } from 'react'

// True once the hero device image has loaded (or after a safety timeout).
// Below-the-fold media waits for this so it does not share bandwidth with the
// hero image on slow connections.
export function useAfterHero(timeoutMs = 6000) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const hero = document.querySelector<HTMLImageElement>('.hero-device-image')
    const done = () => setReady(true)
    if (!hero || (hero.complete && hero.naturalWidth > 0)) {
      done()
      return
    }
    hero.addEventListener('load', done, { once: true })
    hero.addEventListener('error', done, { once: true })
    const timer = setTimeout(done, timeoutMs)
    return () => {
      hero.removeEventListener('load', done)
      hero.removeEventListener('error', done)
      clearTimeout(timer)
    }
  }, [timeoutMs])

  return ready
}
