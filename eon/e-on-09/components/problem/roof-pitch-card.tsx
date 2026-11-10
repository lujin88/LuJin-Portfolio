'use client'

import { useId, useState } from 'react'
import { cn } from '@eon/lib/utils'
import { useTranslation } from '@i18n/use-translation'

/*
 * Interactive version of the former `eon-04-05-house.png` card.
 * Click a house → it turns colored, its degree turns red, the others fade; the input follows.
 * Type a number → the closest house is highlighted.
 * House art: one colored PNG per pitch (same canvas and baseline); unselected = 35% opacity.
 */

const PITCHES = [15, 30, 45, 60] as const
type Pitch = (typeof PITCHES)[number]

const houseSrc = (deg: Pitch) => `/assets/images/eon/roof-pitch/house-${deg}-on.webp`

function closestPitch(value: number): Pitch {
  return PITCHES.reduce((best, p) => (Math.abs(p - value) < Math.abs(best - value) ? p : best), PITCHES[0])
}

export function RoofPitchCard({ className, alt }: { className?: string; alt: string }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<Pitch>(30)
  const [text, setText] = useState('30')
  const inputId = useId()
  const groupId = useId()
  const radioName = useId()

  const pick = (deg: Pitch) => {
    setSelected(deg)
    setText(String(deg))
  }

  const onType = (raw: string) => {
    const clean = raw.replace(/[^\d]/g, '').slice(0, 2)
    setText(clean)
    if (clean === '') return
    const n = Math.min(90, Number(clean))
    setSelected(closestPitch(n))
  }

  return (
    <div
      role="group"
      aria-label={alt}
      className={cn(
        'aspect-[560/505] rounded-[28px] bg-white px-[7.1%] pt-[10.6%] text-[#3c3c3c] [container-type:inline-size]',
        className,
      )}
    >
      <p id={groupId} className="text-[3cqw] font-semibold leading-none">
        {t('eon.problem.pitch.select')}
      </p>

      <div role="radiogroup" aria-labelledby={groupId} className="-mx-[7.1cqw] mt-[3.4cqw] grid grid-cols-4 items-end">
        {PITCHES.map((deg) => {
          const on = deg === selected
          return (
            <label
              key={deg}
              className="group relative flex cursor-pointer flex-col items-center gap-[2.2cqw] rounded-2xl has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#f32717]/50"
            >
              {/* Native radio: arrow keys, Tab and screen readers work without extra ARIA. */}
              <input
                type="radio"
                name={radioName}
                value={deg}
                checked={on}
                onChange={() => pick(deg)}
                className="sr-only"
              />
              {/* One image per pitch; the unselected state is the same art faded, so nothing shifts. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={houseSrc(deg)}
                alt=""
                aria-hidden="true"
                className={cn(
                  'block aspect-square w-[19cqw] object-contain transition-opacity duration-200 ease-out',
                  on ? 'opacity-100' : 'opacity-35 group-hover:opacity-55',
                )}
              />
              <span
                className={cn(
                  'text-[3.1cqw] leading-none tabular-nums transition-colors duration-200',
                  on ? 'text-[#f32717]' : 'text-[#8c8c8c] group-hover:text-[#5c5c5c]',
                )}
              >
                {deg}°
              </span>
            </label>
          )
        })}
      </div>

      <div className="mt-[11cqw] flex items-center gap-[2.6cqw] text-[2.7cqw] leading-none text-[#b5b5b5]" aria-hidden="true">
        <span className="h-px flex-1 bg-[#d9d9d9]" />
        {t('eon.problem.pitch.or')}
        <span className="h-px flex-1 bg-[#d9d9d9]" />
      </div>

      <label htmlFor={inputId} className="mt-[11.5cqw] block text-[3cqw] font-semibold leading-none">
        {t('eon.problem.pitch.enter')}
      </label>
      <div className="relative mt-[2.4cqw] w-[29.5cqw]">
        <input
          id={inputId}
          inputMode="numeric"
          value={text}
          onChange={(e) => onType(e.target.value)}
          className="w-full h-[9cqw] rounded-[0.6cqw] border-2 border-[#c8c8c8] bg-white px-[2.6cqw] text-[3cqw] text-[#3c3c3c] outline-none focus:border-[#f32717]"
        />
        <span className="pointer-events-none absolute right-[2.4cqw] top-[1.8cqw] text-[2.6cqw] text-[#8c8c8c]">
          {t('eon.problem.pitch.unit')}
        </span>
      </div>
    </div>
  )
}
