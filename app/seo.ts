import type { Metadata } from 'next'

export const SITE_URL = 'https://lujin-portfolio.vercel.app'
export const SITE_NAME = 'Lu Jin'
export const DEFAULT_OG_IMAGE = '/og/default.jpg'

type SocialInput = {
  title: string
  description: string
  /**
   * Canonical route, e.g. `/EON`, resolved against `metadataBase`.
   * Omit for defaults that child routes inherit (root layout), so they never
   * inherit someone else's canonical / og:url.
   */
  path?: string
  /** 1200×630 share image under /public/og. */
  image?: string
}

/**
 * Open Graph + Twitter card + canonical for one route.
 * Next merges metadata shallowly, so a route that sets `openGraph` replaces
 * the root default entirely — always go through this helper.
 */
export function socialMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: SocialInput): Pick<Metadata, 'alternates' | 'openGraph' | 'twitter'> {
  const images = [{ url: image, width: 1200, height: 630, alt: title }]
  return {
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      ...(path ? { url: path } : {}),
      title,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
