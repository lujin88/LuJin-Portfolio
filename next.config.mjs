import { fileURLToPath } from 'node:url'

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
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
      { source: '/lab.html', destination: '/lab', permanent: false },
      { source: '/about.html', destination: '/about', permanent: false },
      { source: '/ai-workflow-case.html', destination: '/ai-workflow-case', permanent: false },
      { source: '/3000', destination: '/index', permanent: false },
      { source: '/3000/index', destination: '/index', permanent: false },
      { source: '/3000/EON', destination: '/EON', permanent: false },
      { source: '/3000/client-advisory', destination: '/client-advisory', permanent: false },
      { source: '/3000/Client-Advisory', destination: '/client-advisory', permanent: false },
      { source: '/3000/lab', destination: '/lab', permanent: false },
      { source: '/3000/Lab', destination: '/lab', permanent: false },
      { source: '/3000/about', destination: '/about', permanent: false },
      { source: '/3000/About', destination: '/about', permanent: false },
      { source: '/3000/ai-workflow-case', destination: '/ai-workflow-case', permanent: false },
    ]
  },
}

export default nextConfig
