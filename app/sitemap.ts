import type { MetadataRoute } from 'next'
import { SITE_URL } from './seo'

/**
 * Public, indexable routes: the home page plus every page in the header's Work
 * and Playground menus (global-header/components/site-header.tsx). `/` redirects
 * to `/index`; /home.html is noindex. Pages without a menu entry stay out, and so
 * do noindex pages: /bmw-design-system is public but not indexed (Lu, 2026-11-05).
 */
const ROUTES = [
  '/index',
  '/client-advisory',
  '/EON',
  '/man-truck-bus',
  '/etf-savings-plan',
  '/lab/way-of-work',
  '/lab/tools',
  '/lab/agent-monitor',
  '/lab/weather-aquarium',
  '/ai-companion-pet',
  '/lab/party-planner',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({ url: `${SITE_URL}${route}` }))
}
