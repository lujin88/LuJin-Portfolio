import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@eon/lib/utils'

interface QuoteCardProps {
  quote: ReactNode
  attribution: string
  className?: string
}

const QUOTE_BACKGROUND = '/assets/images/eon/eon 08 quotes background.svg'

/**
 * Quote card for Testing. The skewed lavender panel is the original
 * artwork SVG; typography sits on top as a separate overlay.
 */
export function QuoteCard({ quote, attribution, className }: QuoteCardProps) {
  return (
    <div className={cn('relative', className)}>
      <Image
        src={QUOTE_BACKGROUND}
        alt=""
        width={676}
        height={501}
        className="pointer-events-none h-auto w-full select-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex flex-col justify-center px-[13%] pb-[12%] pt-[10%]">
        <span
          aria-hidden="true"
          className="block font-[Georgia,Times,serif] text-[52px] font-bold leading-[0.7] text-[#3c3474]"
        >
          “
        </span>
        <p className="-mt-1 text-[16px] font-semibold leading-snug text-[#3c3474]">
          {quote}
        </p>
        <p className="mt-2 text-[12px] font-medium text-[#3c3474]/70">
          {attribution}
        </p>
      </div>
    </div>
  )
}
