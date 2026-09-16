import type { LucideIcon } from 'lucide-react'

interface EvidenceCardProps {
  icon: LucideIcon
  label: string
  iconClassName?: string
}

/**
 * Compact rounded pill/card used to list research evidence sources
 * (see Design System §18 - Testing Section, "Evidence chips").
 */
export function EvidenceCard({ icon: Icon, label, iconClassName }: EvidenceCardProps) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl border border-navy-950/8 bg-background px-3.5 py-3.5 shadow-[0_20px_60px_rgba(5,20,30,0.06)]">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconClassName ?? 'bg-lavender-light text-navy-950'}`}
      >
        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="text-sm font-medium leading-snug text-navy-950">{label}</span>
    </div>
  )
}
