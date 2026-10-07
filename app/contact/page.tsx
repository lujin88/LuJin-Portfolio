import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu Jin — Contact',
  },
}

export default function ContactPage() {
  redirect('/index#contact')
}
