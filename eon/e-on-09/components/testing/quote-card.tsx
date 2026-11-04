import type { ReactNode } from 'react'
import { cn } from '@eon/lib/utils'

interface QuoteCardProps {
  quote: ReactNode
  attribution: string
  className?: string
}

/**
 * Quote card for Testing. The original panel silhouette uses the existing white surface token
 * requested by Lu; panel and type scale together.
 */
export function QuoteCard({ quote, attribution, className }: QuoteCardProps) {
  return (
    <div data-quote-panel className={cn('relative', className)}>
      <svg viewBox="0 0 676 501" className="pointer-events-none h-auto w-full select-none" aria-hidden="true">
        <path d="M0 97.7534C0 60.5001 29.1771 29.7733 66.3806 27.8471L602.381 0.0955746C642.409 -1.97689 676 29.9202 676 70.0019V386.748C676 423.207 648.015 453.561 611.677 456.517L75.6765 500.127C34.9128 503.443 0 471.256 0 430.357V97.7534Z" className="fill-white" />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-center px-[13%] pb-[12%] pt-[10%]">
        <span
          data-quote-mark
          aria-hidden="true"
          className="block font-[Georgia,Times,serif] text-[52px] font-bold leading-[0.7] text-[#3c3474]"
        >
          “
        </span>
        <p className="-mt-1 text-[16px] font-semibold leading-snug text-[#3c3474]">
          {quote}
        </p>
        <p data-quote-attribution className="mt-2 text-[12px] font-medium text-[#3c3474]/70">
          {attribution}
        </p>
      </div>
    </div>
  )
}
