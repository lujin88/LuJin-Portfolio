/** Handwriting + mint arrow (OUTBOX/EON_LOOP_PREP_1113). Sits above the loop video, not in the clip. */
export function ChallengeWomanLaptopHandOverlay({ className }: { className?: string }) {
  const layer = 'pointer-events-none absolute inset-0 h-full w-full object-cover'
  return (
    <p className={className} aria-hidden>
      <img
        src="/assets/images/eon/eon-challenge-woman-laptop-hand-text.png"
        alt=""
        width={1672}
        height={941}
        className={layer}
        decoding="async"
      />
      <img
        src="/assets/images/eon/eon-challenge-woman-laptop-hand-arrow.png"
        alt=""
        width={1672}
        height={941}
        className={layer}
        decoding="async"
      />
    </p>
  )
}