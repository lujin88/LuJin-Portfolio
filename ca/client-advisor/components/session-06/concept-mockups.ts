export type ConceptMockup = {
  id: 'prep' | 'evidence' | 'research'
  src: string
}

/**
 * Frames for the Session 06 concept stack: three fictional advisory-workspace pages (visual v2,
 * Lu #22751 B). Index 0 sits at the back; the last item is the front card. Fullscreen loads the
 * matching self-contained HTML study from /public.
 */
export const conceptMockups: ConceptMockup[] = [
  { id: 'prep', src: '/ca/ca06-concept/page-1-1440.png' },
  { id: 'evidence', src: '/ca/ca06-concept/page-2-1440.png' },
  { id: 'research', src: '/ca/ca06-concept/page-3-1440.png' },
]
