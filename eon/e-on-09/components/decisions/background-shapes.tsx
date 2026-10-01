/**
 * Decorative shapes for Design Decisions + Testing.
 * Always rendered in a z-0 background layer. Section content stacks above.
 */
const GREEN_BG_SRC = '/assets/images/eon/eon 06_green background.svg'

const mintFill = {
  backgroundColor: '#b9f4d8',
  WebkitMaskImage: `url("${GREEN_BG_SRC}")`,
  maskImage: `url("${GREEN_BG_SRC}")`,
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
} as const

export function DecisionsPurpleShape() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-visible">
      <div
        className="absolute top-0 right-0 h-full w-[min(46%,44rem)] max-w-[700px]"
        style={{
          ...mintFill,
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskPosition: 'right top',
          maskPosition: 'right top',
        }}
      />
    </div>
  )
}

export function TestingBackgroundShapes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-visible">
      <img
        src={GREEN_BG_SRC}
        alt=""
        className="absolute -left-10 -top-36 h-[360px] w-[360px] max-w-none select-none md:-left-6 md:-top-40 md:h-[400px] md:w-[400px]"
      />
      <div
        className="absolute -left-44 -top-10 h-[400px] w-[400px] rounded-full md:-left-52 md:-top-12 md:h-[460px] md:w-[460px]"
        style={{ backgroundColor: '#E2DFF8' }}
      />
    </div>
  )
}
