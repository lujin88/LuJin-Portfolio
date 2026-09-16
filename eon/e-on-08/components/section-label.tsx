interface SectionLabelProps {
  number: string
  label: string
}

/**
 * Numbered circular marker + eyebrow label used to open every
 * case-study section (see Design System §04 - Section Number System).
 */
export function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lavender-light text-sm font-semibold text-navy-950">
        {number}
      </span>
      <span className="text-sm font-semibold tracking-[0.14em] text-navy-text uppercase">{label}</span>
    </div>
  )
}
