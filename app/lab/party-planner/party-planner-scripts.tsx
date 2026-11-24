'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    __ppVividCleanup?: (() => void) | null
  }
}

const SCRIPTS = ['/lab/party-planner/a/stages.js', '/lab/party-planner/a/vivid.js']

/**
 * ribbon.js and stage.js draw into the page's DOM when they run. next/script runs a src only once per
 * session, so a second visit (client-side navigation) got an empty invite card and no ribbon.
 * Here every visit appends fresh script elements, and leaving the page removes them and the
 * ribbon's window listeners.
 */
export function PartyPlannerScripts() {
  useEffect(() => {
    const nodes: HTMLScriptElement[] = []
    // setTimeout so React strict mode's mount-unmount-mount in dev does not run the scripts twice
    const timer = window.setTimeout(() => {
      SCRIPTS.forEach((src) => {
        const el = document.createElement('script')
        el.src = src
        el.async = false
        document.body.appendChild(el)
        nodes.push(el)
      })
    }, 0)
    return () => {
      window.clearTimeout(timer)
      nodes.forEach((el) => el.remove())
      window.__ppVividCleanup?.()
    }
  }, [])
  return null
}
