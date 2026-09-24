/** Scroll reveal trigger. See ca/client-advisor/lib/observe-once.ts. */
const watchImpl = new Function(
  'node',
  'onHit',
  'threshold',
  `var done = false
  var tick = function () {
    if (done) return
    var rect = node.getBoundingClientRect()
    var vh = window.innerHeight || 0
    var visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
    if (visible <= 0 || rect.height <= 0) return
    var ratio = visible / rect.height
    var viewportRatio = vh > 0 ? visible / vh : 0
    if (ratio >= threshold || viewportRatio >= 0.35) {
      done = true
      onHit(true)
      window.removeEventListener('scroll', tick)
      window.removeEventListener('resize', tick)
    }
  }
  tick()
  window.addEventListener('scroll', tick, { passive: true })
  window.addEventListener('resize', tick)
  return function () {
    window.removeEventListener('scroll', tick)
    window.removeEventListener('resize', tick)
  }`,
) as (
  node: Element,
  onHit: (visible: boolean) => void,
  threshold: number,
  rootMargin?: string,
) => () => void

export function watchState(
  node: Element,
  onHit: (visible: boolean) => void,
  threshold = 0.15,
  _rootMargin = '0px',
) {
  return watchImpl(node, onHit, threshold)
}
