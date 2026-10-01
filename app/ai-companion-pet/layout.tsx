import type { Metadata } from 'next'
import 'remixicon/fonts/remixicon.css'

export const metadata: Metadata = {
  title: {
    absolute: '默默 | AI 陪伴宠物',
  },
  description: '一个会记得、会倾听、也会用中文回应孩子的 AI 陪伴宠物原型。',
}

export default function CompanionPetLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
