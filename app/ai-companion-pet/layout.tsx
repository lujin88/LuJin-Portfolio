import type { Metadata } from 'next'
import 'remixicon/fonts/remixicon.css'

export const metadata: Metadata = {
  title: {
    absolute: '默默 | AI 陪伴宠物',
  },
  description: '一个会记得、会倾听、也会用中文回应孩子的 AI 陪伴宠物原型。',
  // Private prototype: keep it out of search results.
  robots: { index: false, follow: false },
  // Don't inherit the portfolio's English share card.
  openGraph: null,
  twitter: null,
}

export default function CompanionPetLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // The root <html lang> is shared with the English portfolio, so mark the
  // Chinese prototype at the subtree level (display: contents = no layout box).
  return (
    <div lang="zh-CN" style={{ display: 'contents' }}>
      {children}
    </div>
  )
}
