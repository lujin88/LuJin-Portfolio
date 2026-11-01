import { fileURLToPath } from 'node:url'

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  turbopack: {
    root: fileURLToPath(new URL('.', import.meta.url)),
  },
  images: {
    unoptimized: true,
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        // Raw source for the /index HTML island (read from disk by
        // app/index/page.tsx). Still publicly reachable, so keep it out of
        // search results instead of redirecting it.
        source: '/home.html',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ]
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
      { source: '/3000/index', destination: '/index', permanent: false },
      { source: '/3000/EON', destination: '/EON', permanent: false },
      { source: '/3000/client-advisory', destination: '/client-advisory', permanent: false },
      { source: '/3000/Client-Advisory', destination: '/client-advisory', permanent: false },
      { source: '/3000/lab', destination: '/lab/weather-aquarium', permanent: false },
      { source: '/3000/Lab', destination: '/lab/weather-aquarium', permanent: false },
      { source: '/References/Home/Hero video.mp4', destination: '/assets/videos/home/hero.mp4', permanent: false },
      { source: '/References/Client advisory/Client advsior hero.mp4', destination: '/assets/videos/client-advisory/hero.mp4', permanent: false },
      { source: '/References/eon solar/solar-calculator-hero.mp4', destination: '/assets/videos/eon/solar-calculator-hero.mp4', permanent: false },
      { source: '/References/About me/Turn head.mp4', destination: '/assets/videos/about/turn-head.mp4', permanent: false },
    ]
  },
}

export default nextConfig
