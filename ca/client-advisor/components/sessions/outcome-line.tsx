'use client'

/** Overlay coordinates are measured in the original card-02/03 image space. */
export function OutcomeLine({ index }: { index: number }) {
  if (index === 2) {
    return (
      <svg aria-hidden="true" className="ca-outcome-trace" viewBox="0 0 800 974" preserveAspectRatio="xMidYMax meet">
        <g className="ca-outcome-orbit-dot">
          <circle r="15" fill="#00aaff" opacity="0.16" />
          <circle r="8" fill="#38d9ff" opacity="0.5" />
          <circle r="4" fill="#e7ffff" />
        </g>
      </svg>
    )
  }
  return null
}
