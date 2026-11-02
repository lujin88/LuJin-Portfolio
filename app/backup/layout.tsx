import type { Metadata } from 'next'

/** Backup copies of earlier pages: reachable by link, kept out of search. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function BackupLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
