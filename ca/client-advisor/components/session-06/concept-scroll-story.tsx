import type { ReactNode } from 'react'

export type ConceptItem = {
  title: string
  body: ReactNode
}

/**
 * Section 06 layout: sticky mockup stack on the left, all copy fully visible
 * on the right. The left column pins within the section so the 3-D stack stays
 * in view while the reader scrolls through the three concept items.
 * No scroll-driven accordion — all copy is always readable.
 */
export function ConceptScrollStory({
  visual,
  header,
  items,
}: {
  visual: ReactNode
  header: ReactNode
  items: ConceptItem[]
}) {
  return (
    <section
      id="session-06"
      aria-labelledby="session-06-heading"
      className="ca-s06 relative isolate w-full text-[var(--ca-text)]"
    >
      <div className="flex w-full items-start py-24 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_42%_at_50%_22%,rgba(28,74,150,0.3),transparent_68%),radial-gradient(ellipse_60%_55%_at_30%_52%,rgba(30,74,140,0.36),transparent_70%),radial-gradient(ellipse_45%_50%_at_72%_32%,rgba(20,50,110,0.22),transparent_70%)]"
        />

        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-start gap-10 px-6 md:px-10 lg:grid-cols-[minmax(0,1.32fr)_minmax(0,0.9fr)] lg:gap-16 lg:px-14 xl:gap-20 xl:px-20">
          {/* Left column: sticky so the mockup stays in view while copy scrolls */}
          <div className="lg:sticky lg:top-[clamp(4rem,8svh,7rem)] lg:self-start">
            {visual}
          </div>

          <div className="flex max-w-[560px] flex-col lg:max-w-none">
            {header}

            <div className="mt-10 flex flex-col">
              {items.map((item) => (
                <div key={item.title} className="relative flex flex-col py-[1.1rem] pl-5">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-[1.1rem] left-0 w-0.5 rounded-full bg-[var(--ca-text)]"
                  />
                  <h3 className="font-sans text-[28px] font-semibold leading-[1.15] text-[var(--ca-text)]">
                    {item.title}
                  </h3>
                  <div>
                    {typeof item.body === 'string' ? (
                      <p className="mt-[0.85rem] max-w-[34rem] text-pretty text-[15px] font-normal leading-[1.6] text-[var(--ca-text-2)] xl:text-base">
                        {item.body}
                      </p>
                    ) : (
                      item.body
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
