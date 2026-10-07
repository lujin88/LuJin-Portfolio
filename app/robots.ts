import type { MetadataRoute } from 'next'
import { SITE_URL } from './seo'

export default function robots(): MetadataRoute.Robots {
  return {
    // Everything stays crawlable so per-page `noindex` (e.g. /wip,
    // /ai-companion-pet, /home.html) can actually be read by crawlers.
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
