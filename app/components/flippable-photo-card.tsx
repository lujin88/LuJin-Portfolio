'use client'

import { useState } from 'react'

export type FlippablePhotoCardProps = {
  image: string
  label: string
  backText: string
  alt?: string
  className?: string
}

export function FlippablePhotoCard({
  image,
  label,
  backText,
  alt,
  className = '',
}: FlippablePhotoCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${label}. ${flipped ? 'Show photo' : 'Show note'}.`}
      onClick={() => setFlipped((value) => !value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setFlipped((value) => !value)
        }
      }}
      className={`group relative cursor-pointer select-none [perspective:1000px] ${className}`.trim()}
    >
      <div
        className={`relative h-full w-full rounded-xl transition-transform duration-700 ease-in-out [transform-style:preserve-3d] [@media(hover:hover)_and_(pointer:fine)]:group-hover:[transform:rotateY(180deg)] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div className="absolute inset-0 overflow-hidden rounded-xl [backface-visibility:hidden] [transform:translateZ(0)] [-webkit-backface-visibility:hidden]">
          <img
            src={image}
            alt={alt ?? label}
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1 text-sm text-white backdrop-blur-sm">
            {label}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl bg-[var(--color-bg-primary,#111214)] p-8 [backface-visibility:hidden] [transform:rotateY(180deg)] [-webkit-backface-visibility:hidden]">
          <p className="text-center text-[15px] leading-relaxed text-[var(--color-text-1,#f9fbfc)]">
            {backText}
          </p>
        </div>
      </div>
    </div>
  )
}
