import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const externalMedia = JSON.parse(
  readFileSync(new URL('./lib/external-media.json', import.meta.url), 'utf8'),
)

function mediaBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.trim()
  return (fromEnv || externalMedia.baseUrl || '').replace(/\/$/, '')
}

function blobUrl(pathname) {
  const base = mediaBaseUrl()
  if (!base) return null
  if (!externalMedia.files.some((file) => file.path === pathname)) return null
  return (
    base +
    pathname
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/')
  )
}

const mediaBase = mediaBaseUrl()

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  turbopack: {
    root: fileURLToPath(new URL('.', import.meta.url)),
  },
  // readPublicHtmlPage() joins a dynamic filename onto public/, so Next's
  // file tracer copies all of public/ into the island route (/index). That was
  // ~400 MB of video and images per function. Drop the asset trees from every
  // server trace. The HTML islands stay at public/*.html and are still
  // included. /lab/*/prototype keeps its own HTML file because this exclude
  // does not cover public/lab.
  outputFileTracingExcludes: {
    '/*': ['./public/assets/**/*'],
    '/landing': ['./public/lab/**/*'],
  },
  images: {
    unoptimized: true,
    qualities: [75, 90],
    remotePatterns: mediaBase
      ? [
          {
            protocol: 'https',
            hostname: new URL(mediaBase).hostname,
            pathname: '/assets/**',
          },
        ]
      : [],
  },
  async headers() {
    return [
      {
        // Raw source for the /index HTML island (read from disk by
        // app/landing/page.tsx). Still publicly reachable, so keep it out of
        // search results instead of redirecting it.
        source: '/home.html',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ]
  },
  async rewrites() {
    // The home page lives at app/landing, not app/index. A route named
    // "index" shares its internal name with the root route "/", and on
    // Vercel the client's ?_rsc= request for /index was matched to "/" and
    // answered with HTML. The router then fell back to a full reload, which
    // showed the root layout's black background for ~370 ms. Visitors still
    // use /index. beforeFiles, so Vercel rewrites the RSC request too
    // instead of normalising /index to "/" first.
    return {
      beforeFiles: [{ source: '/index', destination: '/landing' }],
    }
  },
  async redirects() {
    return [
      { source: '/', destination: '/index', permanent: false },
      { source: '/index.html', destination: '/index', permanent: false },
      { source: '/eon-solar', destination: '/EON', permanent: false },
      { source: '/eon-solar.html', destination: '/EON', permanent: false },
      { source: '/client-advisor', destination: '/client-advisory', permanent: false },
      { source: '/client-advisory.html', destination: '/client-advisory', permanent: false },
      { source: '/lab.html', destination: '/lab/weather-aquarium', permanent: false },
      { source: '/lab/action-center', destination: '/lab/weather-aquarium', permanent: false },
      { source: '/way-of-work', destination: '/lab/way-of-work', permanent: false },
      { source: '/3000', destination: '/index', permanent: false },
      // /design-system (Forma Finance) was replaced by the BMW design system case.
      { source: '/design-system', destination: '/bmw-design-system', permanent: false },
      { source: '/3000/index', destination: '/index', permanent: false },
      { source: '/3000/EON', destination: '/EON', permanent: false },
      { source: '/3000/client-advisory', destination: '/client-advisory', permanent: false },
      { source: '/3000/Client-Advisory', destination: '/client-advisory', permanent: false },
      { source: '/3000/lab', destination: '/lab/weather-aquarium', permanent: false },
      { source: '/3000/Lab', destination: '/lab/weather-aquarium', permanent: false },
      { source: '/References/Home/Hero video.mp4', destination: blobUrl('/assets/videos/home/hero.mp4') ?? '/assets/videos/home/hero.mp4', permanent: false },
      { source: '/References/Client advisory/Client advsior hero.mp4', destination: blobUrl('/assets/videos/client-advisory/hero.mp4') ?? '/assets/videos/client-advisory/hero.mp4', permanent: false },
      { source: '/References/eon solar/solar-calculator-hero.mp4', destination: blobUrl('/assets/videos/eon/solar-calculator-hero.mp4') ?? '/assets/videos/eon/solar-calculator-hero.mp4', permanent: false },
      { source: '/References/About me/Turn head.mp4', destination: blobUrl('/assets/videos/about/turn-head.mp4') ?? '/assets/videos/about/turn-head.mp4', permanent: false },
      ...externalMedia.files.flatMap((file) => {
        const destination = blobUrl(file.path)
        if (!destination) return []
        const encoded = file.path
          .split('/')
          .map((segment) => encodeURIComponent(segment))
          .join('/')
        const sources = encoded === file.path ? [file.path] : [file.path, encoded]
        return sources.map((source) => ({ source, destination, permanent: false }))
      }),
    ]
  },
}

export default nextConfig
