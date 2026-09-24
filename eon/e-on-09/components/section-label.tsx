import { cn } from '@eon/lib/utils'

interface SectionLabelProps {
  number: string
  label: string
  surface?: 'light' | 'dark'
  /** Kept for call-site compatibility. Marker chrome is now one shared treatment. */
  emphasis?: 'strong' | 'soft'
  className?: string
}

/**
 * Shared numbered marker and eyebrow for every case-study section.
 * Light lavender fill + deeper accessible purple numeral (WCAG AA vs circle).
 */
export function SectionLabel({
  number,
  label,
  surface = 'light',
  className,
}: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-3.5', className)}>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-section-marker-purple font-sans text-[14px] font-semibold leading-none tracking-normal text-section-marker-number tabular-nums"
      >
        {number}
      </span>
      <span
        className={cn(
          'text-[13px] font-semibold tracking-[0.16em] uppercase',
          surface === 'light' ? 'text-ink-muted' : 'text-white/55',
        )}
      >
        {label}
      </span>
    </div>
  )
}
