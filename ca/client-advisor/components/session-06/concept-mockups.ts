import type { StaticImageData } from 'next/image'

// Neutral placeholders (2026-11-09): the UBS screens were removed for confidentiality.
// Swap in visual's recreated concept frames when legal has cleared them.
import bookView from '../../../image/concept-placeholder-book.png'
import clientView from '../../../image/concept-placeholder-client.png'
import usTech from '../../../image/concept-placeholder-research.png'

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
    alt: 'Advisor overview of clients and opportunities (concept, recreated)',
  },
  {
    id: 'us-tech',
    src: usTech,
    alt: 'Client view with research commentary and product ideas (concept, recreated)',
  },
  {
    id: 'client-view',
    src: clientView,
    alt: 'Client detail view (concept, recreated)',
  },
]
