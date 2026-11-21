import type { Metadata } from 'next'
import type { ReactNode } from 'react'

// Public but not indexed (Lu, 2026-11-05). Covers /bmw-design-system.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function BMWDesignSystemLayout({ children }: { children: ReactNode }) {
  return children
}
