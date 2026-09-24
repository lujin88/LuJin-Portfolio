import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Contact',
  },
}

export default function ContactPage() {
  redirect('/index#contact')
}
