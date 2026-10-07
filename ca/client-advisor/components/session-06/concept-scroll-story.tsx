'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

export type ConceptItem = {
  title: string
  body: ReactNode
}

/**
 * Scroll-driven accordion — mirrors public/home.html `.pin-wrap` / `.pin-sticky`
 * (#model-series, #omni-model):
 *
 *   pin wrap  → tall scroll budget (count × 120vh, same ratio as home's 360vh / 3)
 *   sticky    → one visual page (100svh), overflow visible, no clip pairing
 *   progress  → clamp(-rect.top / (height - vh), 0, 1)
 *   active    → min(count - 1, floor(progress * count))  // discrete, index-only commits
 *   body      → CSS grid 0fr → 1fr (same transition as .accordion-body-wrap)
 *   titles    → muted when inactive, bright when active (home .accordion-title)
 *
 * Stage is top-biased (items-start), not safe_center: opening a tall body grows
 * downward instead of re-centering the whole stage (~90px jump on step 2).
 * `--p` still drifts the left stack between steps without React state.
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

  useLayoutEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wideMq = window.matchMedia('(min-width: 1024px)')
    // Below 900px tall, the open step can run past the pinned viewport and stay
    // off-screen while the stage is sticky, so fall back to the static layout.
    const tallMq = window.matchMedia('(min-height: 900px)')

    let ticking = false
    let last = -1

    const shouldRun = () => !motionMq.matches && wideMq.matches && tallMq.matches

    const update = () => {
      ticking = false
      const wrap = wrapRef.current
      if (!wrap || !shouldRun()) return
      const rect = wrap.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0
      // Parallax only — direct DOM write, no React render on every frame.
      wrap.style.setProperty('--p', progress.toFixed(4))
      // Equal slices; clamp so progress=1 stays on the last item (never closes it).
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
        // Wait a frame so the tall wrapper height is applied before measuring.
        requestAnimationFrame(update)
      } else {
        last = -1
        setActiveIndex(0)
        wrapRef.current?.style.removeProperty('--p')
      }
    }

    applyMode()

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    motionMq.addEventListener('change', applyMode)
    wideMq.addEventListener('change', applyMode)
    tallMq.addEventListener('change', applyMode)

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      motionMq.removeEventListener('change', applyMode)
      wideMq.removeEventListener('change', applyMode)
      tallMq.removeEventListener('change', applyMode)
    }
  }, [count])

  return (
    <section
      ref={wrapRef}
      id="session-06"
      aria-labelledby="session-06-heading"
      className="ca-s06 relative isolate w-full text-[var(--ca-text)]"
      /* Home uses 360vh for 3 accordion items → 120vh × count. */
      style={enabled ? { height: `${count * 120}vh` } : undefined}
    >
      {/*
        Sticky stage — mirror .pin-sticky: no overflow clip (x-clip + y-visible
        pairs to clipping in CSS), top-biased so accordion growth does not
        re-center the stage. Vertical paint may extend past the box; that is
        intentional so long step copy is never mid-clipped by the stage.
      */}
      <div
        className={
          enabled
            ? 'ca-s06-stage sticky top-0 flex h-svh w-full items-start pt-[clamp(6.5rem,12vh,8rem)] pb-[clamp(2rem,5vh,3.5rem)]'
            : 'flex min-h-svh w-full items-center py-24 md:py-28'
        }
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_42%_at_50%_22%,rgba(28,74,150,0.3),transparent_68%),radial-gradient(ellipse_60%_55%_at_30%_52%,rgba(30,74,140,0.36),transparent_70%),radial-gradient(ellipse_45%_50%_at_72%_32%,rgba(20,50,110,0.22),transparent_70%)]"
        />

        <div className={`mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-[minmax(0,1.32fr)_minmax(0,0.9fr)] lg:gap-16 lg:px-14 xl:gap-20 xl:px-20 ${enabled ? 'items-start' : 'items-center'}`}>
          <div
            style={
              enabled
                ? {
                    transform: 'translate3d(0, calc(var(--p, 0) * -48px), 0)',
                    willChange: 'transform',
                  }
                : undefined
            }
          >
            {visual}
          </div>

          <div className="flex max-w-[560px] flex-col lg:max-w-none">
            {header}

            <div className="mt-7 flex flex-col lg:mt-8">
              {items.map((item, i) => {
                const open = enabled ? i === activeIndex : true
                return (
                  <div
                    key={item.title}
                    className="relative flex flex-col py-[0.85rem] pl-5"
                    data-active={open ? 'true' : 'false'}
                  >
                    {/*
                      Active bar — always in layout (opacity), same idea as
                      home .accordion-bar staying in the flex row.
                    */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-[0.85rem] left-0 w-0.5 rounded-full bg-[var(--ca-text)] transition-opacity duration-300 ease"
                      style={{ opacity: open ? 1 : 0 }}
                    />
                    <h3
                      className={
                        open
                          ? 'font-sans text-[26px] font-semibold leading-[1.2] text-[var(--ca-text)] transition-colors duration-300 ease xl:text-[28px]'
                          : 'font-sans text-[26px] font-semibold leading-[1.2] text-[var(--ca-text-2)] transition-colors duration-300 ease xl:text-[28px]'
                      }
                    >
                      {item.title}
                    </h3>
                    {/* Body: proven home .accordion-body-wrap 0fr → 1fr. */}
                    <div
                      className="ca-s06-body"
                      style={{
                        display: 'grid',
                        gridTemplateRows: open ? '1fr' : '0fr',
                        opacity: open ? 1 : 0,
                        transition: enabled
                          ? 'grid-template-rows 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 350ms ease'
                          : undefined,
                      }}
                    >
                      <div style={{ overflow: 'hidden', minHeight: 0 }}>
                        {typeof item.body === 'string' ? (
                          <p className="mt-[0.85rem] max-w-[34rem] text-pretty text-[15px] font-normal leading-[1.65] text-[var(--ca-text-2)] xl:text-base">
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
