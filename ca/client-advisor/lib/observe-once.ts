/**
 * Scroll reveal trigger. Implemented as source text so the React compiler
 * cannot rewrite the listener into a non-function.
 * Fires once when 15% of the element is visible, or when a tall element
 * occupies about a third of the viewport.
 */
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
) as (node: Element, onHit: (visible: boolean) => void, threshold: number) => () => void

export function watchState(
  node: Element,
  onHit: (visible: boolean) => void,
  threshold = 0.15,
) {
  return watchImpl(node, onHit, threshold)
}

const watchClassImpl = new Function(
  'watch',
  'node',
  'className',
  'threshold',
  `return watch(node, function () { node.classList.add(className) }, threshold)`,
) as (watch: typeof watchImpl, node: Element, className: string, threshold: number) => () => void

export function watchClass(node: Element, className: string, threshold = 0.15) {
  return watchClassImpl(watchImpl, node, className, threshold)
}
