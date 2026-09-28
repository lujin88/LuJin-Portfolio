import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Lab',
  },
}

export default function LabLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
