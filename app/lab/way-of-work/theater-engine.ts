export const LERP_TAU = 10
export const PARALLAX = 0.28

export function clamp01(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value
}

export function lerpToward(current: number, target: number, dtMs: number, tau = LERP_TAU) {
  const dt = Math.min(0.1, dtMs / 1000)
  const smoothing = 1 - Math.exp(-dt * tau)
  return current + (target - current) * smoothing
}

export function readTrackProgress(track: HTMLElement, scrollY: number, viewportHeight: number) {
  const rect = track.getBoundingClientRect()
  const start = scrollY + rect.top
  const end = start + track.offsetHeight - viewportHeight
  const span = end - start
  if (span <= 0) return 0
  return clamp01((scrollY - start) / span)
}

/** 1 when the section center is on the viewport midline; fades as it leaves. */
export function sectionWeight(rect: DOMRect, viewportHeight: number) {
  const center = rect.top + rect.height / 2
  const distance = Math.abs(center - viewportHeight / 2)
  return clamp01(1 - distance / (viewportHeight * 0.78))
}
