import externalMedia from './external-media.json'

type MediaFile = {
  path: string
  bytes: number
}

type MediaManifest = {
  baseUrl: string
  files: MediaFile[]
}

const manifest = externalMedia as MediaManifest
const externalPaths = new Set(manifest.files.map((file) => file.path))

/** Public Blob origin. NEXT_PUBLIC_MEDIA_BASE_URL overrides the committed store. */
export function mediaBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.trim()
  return (fromEnv || manifest.baseUrl || '').replace(/\/$/, '')
}

function encodePath(pathname: string) {
  return pathname
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

/**
 * Absolute URL for a file hosted on Blob. Paths that stayed in public/ are
 * returned unchanged, so callers can wrap every media src.
 */
export function mediaUrl(path: string) {
  const queryIndex = path.indexOf('?')
  const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex)
  const query = queryIndex === -1 ? '' : path.slice(queryIndex)
  const base = mediaBaseUrl()
  if (!base || !externalPaths.has(pathname)) return path
  return `${base}${encodePath(pathname)}${query}`
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Rewrite quoted (or `url(`) media paths inside an HTML island to Blob URLs.
 * Matching only after a quote or `(` avoids rewriting a URL that is already absolute.
 */
export function rewriteExternalMedia(html: string) {
  if (!mediaBaseUrl()) return html
  const paths = [...externalPaths].sort((a, b) => b.length - a.length)
  let result = html
  for (const path of paths) {
    const absolute = mediaUrl(path)
    if (absolute === path) continue
    const needles = new Set([path, encodeURI(path)])
    for (const needle of needles) {
      result = result.replace(
        new RegExp(`(?<=["'(])${escapeRegExp(needle)}`, 'g'),
        absolute,
      )
    }
  }
  return result
}
