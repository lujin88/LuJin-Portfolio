import type { StaticImageData } from 'next/image'

import bookView from './concept/advisor-book.png'
import clientView from './concept/client-workspace.png'
import researchView from './concept/research-overview.png'

export type ConceptMockup = {
  id: string
  src: StaticImageData
  alt: string
}

/**
 * Frames for the Session 06 concept stack.
 * Source folder: `session-06/concept` (illustrative fiction, not UBS screenshots).
 * Index 0 sits at the back; the last item is the front card.
 */
export const conceptMockups: ConceptMockup[] = [
  {
    id: 'book-view',
    src: bookView,
    alt: 'Advisor overview of clients and opportunities (illustrative concept)',
  },
  {
    id: 'us-tech',
    src: researchView,
    alt: 'Client view with research commentary and product ideas (illustrative concept)',
  },
  {
    id: 'client-view',
    src: clientView,
    alt: 'Client detail view (illustrative concept)',
  },
]
