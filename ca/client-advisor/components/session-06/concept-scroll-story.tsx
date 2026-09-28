'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

export type ConceptItem = {
  title: string
  body: ReactNode
}

/**
 * Scroll-driven accordion. Session 06 stays one visual page (sticky 100svh)
 * while extra scroll height expands the right-hand items one by one.
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
  const count = items.length
  const wrapRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wideMq = window.matchMedia('(min-width: 1024px)')

    let ticking = false
    let last = -1

    const shouldRun = () => !motionMq.matches && wideMq.matches

    const update = () => {
      ticking = false
      const wrap = wrapRef.current
      if (!wrap) return
      const rect = wrap.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0
      wrap.style.setProperty('--p', String(progress))
      const idx = Math.min(count - 1, Math.floor(progress * count))
      if (idx !== last) {
        last = idx
        setActiveIndex(idx)
      }
    }

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    const applyMode = () => {
      const on = shouldRun()
      setEnabled(on)
      if (on) {
        requestAnimationFrame(update)
      } else {
        last = 0
        setActiveIndex(0)
        wrapRef.current?.style.removeProperty('--p')
      }
    }

    applyMode()

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    motionMq.addEventListener('change', applyMode)
    wideMq.addEventListener('change', applyMode)

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      motionMq.removeEventListener('change', applyMode)
      wideMq.removeEventListener('change', applyMode)
    }
  }, [count])

  return (
    <section
      ref={wrapRef}
      id="session-06"
      aria-labelledby="session-06-heading"
      className="ca-s06 relative isolate w-full text-[var(--ca-text)]"
      style={enabled ? { height: `${(count + 1) * 100}svh` } : undefined}
    >
      <div
        className={
          enabled
            ? 'ca-s06-stage sticky top-0 flex h-svh w-full items-center overflow-x-clip pt-[clamp(1.25rem,3.5vh,2.25rem)] pb-[clamp(4.5rem,12vh,7rem)]'
            : 'flex min-h-svh w-full items-center overflow-x-clip py-24 md:py-28'
        }
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_42%_at_50%_22%,rgba(28,74,150,0.3),transparent_68%),radial-gradient(ellipse_60%_55%_at_30%_52%,rgba(30,74,140,0.36),transparent_70%),radial-gradient(ellipse_45%_50%_at_72%_32%,rgba(20,50,110,0.22),transparent_70%)]"
        />

        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-[minmax(0,1.32fr)_minmax(0,0.9fr)] lg:gap-16 lg:px-14 xl:gap-20 xl:px-20">
          <div>{visual}</div>

          <div className="flex max-w-[560px] flex-col lg:max-w-none">
            {header}

            <div className="mt-10 flex flex-col">
              {items.map((item, i) => {
                const open = enabled ? i === activeIndex : true
                return (
                  <div key={item.title} className="relative flex flex-col py-[1.1rem] pl-5">
                    {open && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-[1.1rem] left-0 w-0.5 rounded-full bg-[var(--ca-text)]"
                      />
                    )}
                    <h3 className="font-sans text-[28px] font-semibold leading-[1.15] text-[var(--ca-text)]">
                      {item.title}
                    </h3>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateRows: open ? '1fr' : '0fr',
                        opacity: open ? 1 : 0,
                        transition:
                          'grid-template-rows 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 350ms ease',
                      }}
                    >
                      <div style={{ overflow: 'hidden' }}>
                        {typeof item.body === 'string' ? (
                          <p className="mt-[0.85rem] max-w-[34rem] text-pretty text-[15px] font-normal leading-[1.6] text-[var(--ca-text-2)] xl:text-base">
                            {item.body}
                          </p>
                        ) : (
                          item.body
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
