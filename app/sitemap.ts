import type { MetadataRoute } from 'next'
import { SITE_URL } from './seo'

/**
 * Public, indexable routes: the home page plus every page in the header's Work
 * and Playground menus (global-header/components/site-header.tsx). `/` redirects
 * to `/index`; /home.html is noindex. Pages without a menu entry stay out.
 */
const ROUTES = [
  '/index',
  '/client-advisory',
  '/EON',
  '/man-truck-bus',
  '/etf-savings-plan',
  '/bmw-design-system',
  '/lab/way-of-work',
  '/lab/weather-aquarium',
  '/ai-companion-pet',
  '/lab/party-planner',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({ url: `${SITE_URL}${route}` }))
}
