import { ArrowRight, Check, MapPin, Scan, Sun, Triangle } from 'lucide-react'
import Image from 'next/image'

const manualFields = [
  { label: 'Roof size?', icon: Scan },
  { label: 'Roof inclination?', icon: Triangle },
  { label: 'Sunlight exposure?', icon: Sun },
]

const resolvedFields = [
  { label: 'Roof size', icon: Scan },
  { label: 'Roof inclination', icon: Triangle },
  { label: 'Sunlight exposure', icon: Sun },
]

export function ComparisonPanel() {
  return (
    <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-center">
      {/* Before */}
      <div className="flex flex-1 flex-col gap-6 rounded-2xl bg-card p-3 shadow-sm sm:flex-row sm:items-center">
        <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-xl sm:h-48 sm:w-48">
          <Image
            src="./eon/images/roof-base.png"
            alt="Aerial view of a house roof before analysis"
            fill
            className="object-cover"
          />
          <span className="absolute top-3 left-3 rounded-full bg-card px-4 py-1.5 text-sm font-semibold text-foreground">
            Before
          </span>
        </div>
        <div className="flex flex-col gap-4 px-3 py-2 sm:px-2">
          <h3 className="text-xl font-bold text-foreground">Manual input</h3>
          <ul className="flex flex-col gap-3">
            {manualFields.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon className="size-5 shrink-0 text-muted-foreground" strokeWidth={1.75} aria-hidden="true" />
                <span className="text-base text-muted-foreground">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex items-center justify-center py-2 lg:px-2">
        <ArrowRight className="size-6 rotate-90 text-foreground/70 lg:rotate-0" aria-hidden="true" />
      </div>

      {/* After */}
      <div className="flex flex-1 flex-col gap-6 rounded-2xl bg-card p-3 shadow-sm sm:flex-row sm:items-center">
        <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-xl sm:h-48 sm:w-48">
          <Image
            src="./eon/images/roof-base.png"
            alt="Aerial view of the same house roof with sunlight exposure highlighted and a location pin"
            fill
            className="object-cover"
          />
          {/* roof detection heatmap overlay (diamond mimics the hip roof) */}
          <div
            className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-xl opacity-85 mix-blend-hard-light"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(255,220,0,0.98), rgba(255,140,0,0.9) 55%, rgba(255,90,0,0.55) 100%)',
            }}
            aria-hidden="true"
          />
          <span className="absolute top-3 left-3 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
            After
          </span>
          <MapPin
            className="absolute top-1/2 left-1/2 size-9 -translate-x-1/2 -translate-y-[85%] text-accent drop-shadow-md"
            fill="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-col gap-4 px-3 py-2 sm:px-2">
          <h3 className="text-xl font-bold text-foreground">We found your roof</h3>
          <ul className="flex flex-col gap-3">
            {resolvedFields.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-3">
                  <Icon className="size-5 shrink-0 text-foreground" strokeWidth={1.75} aria-hidden="true" />
                  <span className="text-base font-medium text-foreground">{label}</span>
                </span>
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Check className="size-3.5 text-accent-foreground" strokeWidth={3} aria-hidden="true" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
