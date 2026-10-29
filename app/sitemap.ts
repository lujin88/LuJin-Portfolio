import type { MetadataRoute } from 'next'
import { SITE_URL } from './seo'

/** Public, indexable routes. `/` redirects to `/index`; /wip and /ai-companion-pet are noindex. */
const ROUTES = [
  '/index',
  '/client-advisory',
  '/EON',
  '/about',
  '/ai-workflow-case',
  '/lab/action-center',
  '/lab/off-we-go',
  '/lab/party-planner',
  '/lab/way-of-work',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({ url: `${SITE_URL}${route}` }))
}
