import type { StaticImageData } from 'next/image'

import bookView from '../../../image/CAWB.webp'
import clientView from '../../../image/Investment Hub - Client View 1.webp'
import usTech from '../../../image/US Tech.webp'

export type ConceptMockup = {
  id: string
  src: StaticImageData
  alt: string
}

/**
 * Frames for the Session 06 concept stack.
 * Source folder: `ca/image`.
 * Index 0 sits at the back; the last item is the front card.
 * Reorder, swap, or extend this list to change the gallery.
 */
export const conceptMockups: ConceptMockup[] = [
  {
    id: 'book-view',
    src: bookView,
    alt: 'UBS advisor book view with clients, opportunities, and market highlights',
  },
  {
    id: 'us-tech',
    src: usTech,
    alt: 'US Tech client view with CIO commentary and recommended products',
  },
  {
    id: 'client-view',
    src: clientView,
    alt: 'Investment Hub client view',
  },
]
