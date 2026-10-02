import { fileURLToPath } from 'node:url'

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  turbopack: {
    root: fileURLToPath(new URL('.', import.meta.url)),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    qualities: [75, 90],
  },
  async redirects() {
    return [
      { source: '/', destination: '/index', permanent: false },
      { source: '/index.html', destination: '/index', permanent: false },
      { source: '/eon-solar', destination: '/EON', permanent: false },
      { source: '/eon-solar.html', destination: '/EON', permanent: false },
      { source: '/client-advisor', destination: '/client-advisory', permanent: false },
      { source: '/client-advisory.html', destination: '/client-advisory', permanent: false },
      { source: '/lab.html', destination: '/lab/action-center', permanent: false },
      { source: '/wip.html', destination: '/wip', permanent: false },
      { source: '/way-of-work', destination: '/lab/way-of-work', permanent: false },
      { source: '/lab/off-we-go-workbench', destination: '/lab/off-we-go', permanent: false },
      { source: '/about.html', destination: '/about', permanent: false },
      { source: '/ai-workflow-case.html', destination: '/ai-workflow-case', permanent: false },
      { source: '/3000', destination: '/index', permanent: false },
      { source: '/3000/index', destination: '/index', permanent: false },
      { source: '/3000/EON', destination: '/EON', permanent: false },
      { source: '/3000/client-advisory', destination: '/client-advisory', permanent: false },
      { source: '/3000/Client-Advisory', destination: '/client-advisory', permanent: false },
      { source: '/3000/lab', destination: '/lab/action-center', permanent: false },
      { source: '/3000/Lab', destination: '/lab/action-center', permanent: false },
      { source: '/3000/about', destination: '/about', permanent: false },
      { source: '/3000/About', destination: '/about', permanent: false },
      { source: '/3000/ai-workflow-case', destination: '/ai-workflow-case', permanent: false },
      { source: '/References/Home/Hero video.mp4', destination: '/assets/videos/home/hero.mp4', permanent: false },
      { source: '/References/Client advisory/Client advsior hero.mp4', destination: '/assets/videos/client-advisory/hero.mp4', permanent: false },
      { source: '/References/eon solar/solar-calculator-hero.mp4', destination: '/assets/videos/eon/solar-calculator-hero.mp4', permanent: false },
      { source: '/References/About me/Turn head.mp4', destination: '/assets/videos/about/turn-head.mp4', permanent: false },
      { source: '/References/About me/Lu Intro.mp4', destination: '/assets/videos/about/lu-intro.mp4', permanent: false },
    ]
  },
}

export default nextConfig
