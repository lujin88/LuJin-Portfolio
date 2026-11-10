'use client'

import { useEffect } from 'react'

// Tells the JS_EARLY failsafe in layout.tsx that React is running, so entrance
// animations keep their hidden start state.
export function JsReady() {
  useEffect(() => {
    document.documentElement.dataset.hydrated = ''
  }, [])
  return null
}
