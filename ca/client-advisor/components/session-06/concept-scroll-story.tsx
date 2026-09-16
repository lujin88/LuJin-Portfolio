'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

export type ConceptItem = {
  title: string
  body: ReactNode
}

/**
 * Scroll-driven accordion — technical source of truth: "Claude Working Scroll Effect Code".
 *
 * Architecture:
 *   pin-wrap (position: relative, height ≈ (N + 1) × 100svh)  → provides the scroll budget
 *     └ sticky stage (position: sticky; top: 0; height: 100svh) → stays fixed in the viewport
 *         └ accordion items → titles always present, only the ACTIVE body expands
 *
 * The scroll position (not clicks / IntersectionObserver) maps to a discrete active index:
 *   progress = clamp(-rect.top / (rect.height - innerHeight), 0, 1)
 *   activeIndex = min(count - 1, floor(progress * count))
 * State commits only when the index actually changes (the `last` guard).
 *
 * `enabled` gates the whole effect: true only on wide viewports without reduced-motion.
 * Otherwise the pin releases and every body stays open (progressive enhancement — correct
 * content is present before hydration).
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
      // Drives the left visual's parallax drift (GhostPanel reads var(--p)).
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
        // Wait a frame so the tall wrapper height is applied before measuring.
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
      className="relative isolate w-full bg-[var(--ca-bg)] text-[var(--ca-text)]"
      style={enabled ? { height: `${(count + 1) * 100}svh` } : undefined}
    >
      {/*
        Sticky stage. overflow-x-clip lives HERE (on the sticky element itself, which is
        allowed) rather than on any ancestor of the pin wrap — a clipping ancestor would
        break position: sticky. Vertical overflow stays visible so nothing is cut.
      */}
      <div
        className={
          enabled
            ? 'sticky top-0 flex h-svh w-full items-center overflow-x-clip'
            : 'flex min-h-svh w-full items-center overflow-x-clip py-24 md:py-28'
        }
      >
        {/* Atmospheric glow — kept inside the sticky stage so it stays fixed during the pin */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_30%_50%,rgba(30,74,140,0.42),transparent_70%),radial-gradient(ellipse_45%_50%_at_70%_20%,rgba(20,50,110,0.25),transparent_70%)]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-10 border-b border-[#132a4d]/60" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-10 border-t border-[#132a4d]/60" />

        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-[minmax(0,1.32fr)_minmax(0,0.9fr)] lg:gap-16 lg:px-14 xl:gap-20 xl:px-20">
          {/* Left: persistent concept visual */}
          <div>{visual}</div>

          {/* Right: fixed header + scroll-driven accordion */}
          <div className="flex max-w-[560px] flex-col lg:max-w-none">
            {header}

            <div className="mt-10 flex flex-col">
              {items.map((item, i) => {
                const open = enabled ? i === activeIndex : true
                return (
                  // Constant left padding (pl-5) reserves the line's gutter at every state,
                  // so titles never shift horizontally when the active item changes.
                  <div key={item.title} className="relative flex flex-col py-[1.1rem] pl-5">
                    {/*
                      Active indicator — rendered ONLY for the active item, never for inactive
                      ones (not a permanent border, not a faint/transparent line). It spans the
                      full item so it sits alongside both the title and its expanded description.
                    */}
                    {open && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-[1.1rem] left-0 w-0.5 rounded-full bg-[var(--ca-text)]"
                      />
                    )}
                    {/* Title stays in the layout at every state — always white, never scales, moves, or fades. */}
                    <h3 className="font-sans text-[28px] font-semibold leading-[1.15] text-[var(--ca-text)]">
                      {item.title}
                    </h3>
                    {/* Body wrap: the proven 0fr → 1fr grid-rows animation. Only the active body expands. */}
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
