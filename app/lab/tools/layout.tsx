import type { Metadata } from 'next'
import { socialMetadata } from '../../seo'

const TITLE = 'Tools — Lu Jin'
const DESCRIPTION = 'Agent Monitor, Scranton, and Pixel Office — how Lu works with agents.'

export const metadata: Metadata = {
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, path: '/lab/tools' }),
  themeColor: '#f5f1e4',
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}
