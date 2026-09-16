export function SectionLabel({
  number,
  eyebrow,
  label,
}: {
  number: string
  eyebrow: string
  label: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-eon-lilac text-xs font-bold text-eon-navy">
        {number}
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        {eyebrow} {label}
      </span>
    </div>
  )
}
