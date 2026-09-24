'use client'

import { Check, Square, Sun } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from '@i18n/use-translation'

function RoofPitchIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M4 18h14M4 18 16 7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const detectedFieldIcons: { icon: (props: { className?: string }) => ReactNode; key: 'roofSize' | 'roofPitch' | 'sunlight' }[] = [
  { icon: Square, key: 'roofSize' },
  { icon: RoofPitchIcon, key: 'roofPitch' },
  { icon: Sun, key: 'sunlight' },
]

/**
 * "We found your roof" product-UI overlay, treated as a real component
 * rather than baked into the photograph (see Design System §12 - Before/After Pattern).
 */
export function RoofDetectionCard() {
  const { t } = useTranslation()
  return (
    <div className="w-full rounded-2xl bg-background px-3 py-2.5 shadow-[0_14px_36px_rgba(5,20,30,0.1)]">
      <p className="text-[13px] font-semibold text-navy-950">{t('eon.ui.foundRoof')}</p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {detectedFieldIcons.map(({ icon: Icon, key }) => (
          <li key={key} className="flex items-center justify-between gap-2">
            <span className="flex min-w-0 flex-1 items-center gap-2 text-[12px] font-medium leading-tight text-navy-text">
              <Icon className="h-3.5 w-3.5 shrink-0 text-navy-950" />
              <span className="min-w-0">{t(`eon.ui.${key}`)}</span>
            </span>
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mint">
              <Check className="h-2.5 w-2.5 text-navy-950" strokeWidth={3} aria-hidden="true" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AutoDetectedPill() {
  const { t } = useTranslation()
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-background px-2.5 py-1.5 shadow-[0_8px_20px_rgba(5,20,30,0.1)]">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint">
        <Check className="h-3 w-3 text-navy-950" strokeWidth={2.75} aria-hidden="true" />
      </span>
      <span className="text-[11px] font-semibold text-navy-950">{t('eon.ui.autoDetected')}</span>
    </div>
  )
}
