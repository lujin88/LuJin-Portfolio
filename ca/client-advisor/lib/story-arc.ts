/** Landscape artboard matching the original mockup (1024×686 → 100×67). */
export const VIEW_W = 100
export const VIEW_H = 67
export const JOIN_Y = 0.18
/** Pixel inset so the rest node sits on the stroke, just left of the front card. */
export const NODE_INSET_PX = 40
export const ARC = 'M 0 14.74 A 157.89 157.89 0 0 1 108 73.91'

const CX = -15.78
const CY = 171.93
const R = 157.89

/** Y on the circular arc for a viewBox X, upper half (center sits below the chord). */
export function arcY(x: number) {
  const d = R * R - (x - CX) ** 2
  if (d <= 0) return CY
  return CY - Math.sqrt(d)
}
