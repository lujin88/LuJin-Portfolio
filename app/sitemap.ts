import type { MetadataRoute } from 'next'
import { SITE_URL } from './seo'

/** Public, indexable routes. `/` redirects to `/index`; /home.html is noindex. */
const ROUTES = [
  '/index',
  '/client-advisory',
  '/EON',
  '/ai-companion-pet',
  '/lab/weather-aquarium',
  '/lab/party-planner',
  '/lab/way-of-work',
  '/lab/agent-monitor',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({ url: `${SITE_URL}${route}` }))
}
