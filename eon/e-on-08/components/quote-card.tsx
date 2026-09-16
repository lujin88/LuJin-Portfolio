interface QuoteCardProps {
  quote: string
  attribution: string
  className?: string
}

/**
 * Soft lavender quote card (see Design System §18 - Testing Section, "Quote card").
 */
export function QuoteCard({ quote, attribution, className }: QuoteCardProps) {
  return (
    <div
      className={`rounded-2xl bg-lavender-light px-6 py-5 shadow-[0_20px_60px_rgba(5,20,30,0.08)] ${className ?? ''}`}
    >
      <span aria-hidden="true" className="block text-3xl font-bold leading-none text-lavender">
        &ldquo;
      </span>
      <p className="mt-1 text-lg font-semibold leading-snug text-navy-950">{quote}</p>
      <p className="mt-2 text-sm font-medium text-navy-text">{attribution}</p>
    </div>
  )
}
