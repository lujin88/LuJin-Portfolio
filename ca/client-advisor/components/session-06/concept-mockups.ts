import type { StaticImageData } from 'next/image'

import bookView from '../../../image/cawb.webp'
import clientPage from '../../../image/investment-hub-client-page-1.webp'
import clientView from '../../../image/investment-hub-client-view-1.webp'
import proposalCreation from '../../../image/proposal-creation.webp'
import reviewExecute from '../../../image/review-and-execute.webp'
import usTech from '../../../image/us-tech.webp'

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
    id: 'client-page',
    src: clientPage,
    alt: 'Investment Hub client page',
  },
  {
    id: 'client-view',
    src: clientView,
    alt: 'Investment Hub client view',
  },
  {
    id: 'proposal-creation',
    src: proposalCreation,
    alt: 'Portfolio proposal creation with selectable options',
  },
  {
    id: 'review-execute',
    src: reviewExecute,
    alt: 'Review and execute screen for the tailored investment proposal',
  },
]
