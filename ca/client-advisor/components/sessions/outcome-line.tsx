'use client'

import { useId } from 'react'

/** Overlay coordinates are measured in the original card-02/03 image space. */
export function OutcomeLine({ index }: { index: number }) {
  const id = useId().replace(/:/g, '')
  if (index === 1) {
    return (
      <svg aria-hidden="true" className="ca-outcome-trace" viewBox="0 0 800 987" preserveAspectRatio="xMidYMax meet">
        <defs>
          <mask id={`${id}-edge`} maskUnits="userSpaceOnUse" x="220" y="630" width="430" height="185">
            <rect className="ca-outcome-edge-reveal" x="220" y="630" width="430" height="185" fill="white" />
          </mask>
        </defs>
        <path className="ca-outcome-edge" mask={`url(#${id}-edge)`} d="M233 726 Q234 737 255 744 L400 798 Q435 812 467 799 L619 731 Q634 725 636 715" fill="none" stroke="#a3f4ff" strokeWidth="4" strokeLinecap="round" />
      </svg>
    )
  }
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
