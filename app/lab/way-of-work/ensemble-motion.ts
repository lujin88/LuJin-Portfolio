/** Swap `.ww-ensemble` (and optional `.ww-archive`) between still and loop when in view. */
export function mountEnsembleMotion(
  root: HTMLElement,
  archive: HTMLImageElement | null = root.querySelector<HTMLImageElement>('.ww-archive'),
): () => void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const drawings = Array.from(root.querySelectorAll<SVGSVGElement>('[data-contour]'))
  const ensembles = drawings.map(scene => scene.querySelector<SVGImageElement>('.ww-ensemble')!)
  const visibleScenes = new Set<Element>()

  function syncScenes() {
    ensembles.forEach((image, i) => {
      const url =
        visibleScenes.has(drawings[i]) && !reduced.matches
          ? image.dataset.motion!
          : image.dataset.still!
      if (image.getAttribute('href') !== url) image.setAttribute('href', url)
    })
    if (archive) {
      const archiveUrl =
        visibleScenes.has(archive) && !reduced.matches
          ? archive.dataset.motion!
          : archive.dataset.still!
      if (archive.getAttribute('src') !== archiveUrl) archive.setAttribute('src', archiveUrl)
    }
  }

  const visibility = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visibleScenes.add(entry.target)
      else visibleScenes.delete(entry.target)
    }
    syncScenes()
  })
  drawings.forEach(scene => visibility.observe(scene))
  if (archive) visibility.observe(archive)
  reduced.addEventListener('change', syncScenes)

  return () => {
    visibility.disconnect()
    reduced.removeEventListener('change', syncScenes)
  }
}
