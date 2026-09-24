/**
 * Single reconstructed purple band spanning Problem → Constraint → Decisions.
 * One instance, one global position. Constraint’s navy surface masks the mid-band.
 *
 * The supplied SVG is used once as a mask so fill stays a soft lilac
 * without painting the reconstruction stroke. Geometry is unchanged.
 */
const PURPLE_BG_SRC = '/assets/images/eon/eon 04-06 - purple-bg-reconstructed.svg'

export function PurpleContinuitySvg() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-visible"
    >
      <div
        className="absolute top-[-5.5rem] left-[41%] h-full max-w-none select-none"
        style={{
          aspectRatio: '2652 / 4129',
          backgroundColor: '#E2DFF8',
          WebkitMaskImage: `url("${PURPLE_BG_SRC}")`,
          maskImage: `url("${PURPLE_BG_SRC}")`,
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'left top',
          maskPosition: 'left top',
        }}
      />
    </div>
  )
}
