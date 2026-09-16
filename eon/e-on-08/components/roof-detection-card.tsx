import { Check, Scan, Sun, Triangle } from 'lucide-react'

const detectedFields = [
  { icon: Scan, label: 'Roof size' },
  { icon: Triangle, label: 'Roof inclination' },
  { icon: Sun, label: 'Sunlight exposure' },
]

/**
 * "We found your roof" product-UI overlay, treated as a real component
 * rather than baked into the photograph (see Design System §12 - Before/After Pattern).
 */
export function RoofDetectionCard() {
  return (
    <div className="w-full max-w-[220px] rounded-2xl bg-background p-4 shadow-[0_20px_60px_rgba(5,20,30,0.12)]">
      <p className="text-sm font-semibold text-navy-950">We found your roof</p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {detectedFields.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-xs font-medium text-navy-text">
              <Icon className="h-3.5 w-3.5 text-navy-950" strokeWidth={1.75} aria-hidden="true" />
              {label}
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
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 shadow-[0_12px_30px_rgba(5,20,30,0.12)]">
      <Check className="h-3.5 w-3.5 text-navy-950" strokeWidth={2.5} aria-hidden="true" />
      <span className="text-xs font-semibold text-navy-950">Auto-detected</span>
    </div>
  )
}
