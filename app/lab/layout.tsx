import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu Jin — Playground',
  },
}

export default function LabLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
