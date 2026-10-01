'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

/**
 * Body openness for step i across the pin.
 * Steps still split the scroll into equal slices. The next body grows through
 * the slice before its boundary, and the previous body closes just after, so
 * the handoff tracks the wheel instead of popping on one threshold.
 */
function openAmount(i: number, progress: number, count: number) {
  const pos = progress * count
  const lead = 0.72
  const openStart = i === 0 ? -1 : i - lead
  const openEnd = i === 0 ? 0 : i
  const closeStart = i + 1
  const closeEnd = i + 1 + lead * 0.35
  if (pos <= openStart) return 0
  if (pos < openEnd) return clamp((pos - openStart) / (openEnd - openStart), 0, 1)
  if (pos < closeStart) return 1
  if (pos < closeEnd) return clamp(1 - (pos - closeStart) / (closeEnd - closeStart), 0, 1)
  return 0
}

export type ConceptItem = {
  title: string
  body: ReactNode
}

/**
 * Scroll-driven accordion. Session 06 stays one visual page (sticky 100svh)
 * while extra scroll height scrubs the right-hand items open one by one.
 * `--p` also drifts the concept stack so the pin keeps moving between steps.
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
  // Refs on the outer overflow:hidden panel divs (not the inner bodyRef). The
  // outer div is the BFC that captures the first-child top-margin which collapses
  // out of the inner div's scrollHeight, so measuring it here gives the correct
  // full height needed by the maxHeight animation.
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const [enabled, setEnabled] = useState(false)

  useLayoutEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wideMq = window.matchMedia('(min-width: 1024px)')
    // The sticky accordion requires a minimum viewport height to fit the
    // tallest expanded panel (item 1 body) without overflow clipping.
    // Below 900 px the section falls back to the fully-expanded static layout.
    const tallMq = window.matchMedia('(min-height: 900px)')

    let ticking = false

    const shouldRun = () => !motionMq.matches && wideMq.matches && tallMq.matches

    const update = () => {
      ticking = false
      const wrap = wrapRef.current
      if (!wrap || !shouldRun()) return
      const rect = wrap.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0
      wrap.style.setProperty('--p', progress.toFixed(4))
      panelRefs.current.forEach((node, i) => {
        if (!node) return
        wrap.style.setProperty(`--s06-h-${i}`, `${node.scrollHeight}px`)
        wrap.style.setProperty(`--s06-o-${i}`, openAmount(i, progress, count).toFixed(4))
      })
    }

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    const clearScrub = () => {
      const wrap = wrapRef.current
      if (!wrap) return
      wrap.style.removeProperty('--p')
      for (let i = 0; i < count; i += 1) {
        wrap.style.removeProperty(`--s06-h-${i}`)
        wrap.style.removeProperty(`--s06-o-${i}`)
      }
    }

    const applyMode = () => {
      const on = shouldRun()
      setEnabled(on)
      if (on) update()
      else clearScrub()
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
      style={enabled ? { height: `${(count + 1) * 100}svh` } : undefined}
    >
      <div
        className={
          enabled
            ? 'ca-s06-stage sticky top-0 flex h-svh w-full items-center pt-[clamp(1.25rem,3.5svh,2.25rem)] pb-[clamp(3rem,8svh,5rem)]'
            : 'flex min-h-svh w-full items-center py-24 md:py-28'
        }
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_42%_at_50%_22%,rgba(28,74,150,0.3),transparent_68%),radial-gradient(ellipse_60%_55%_at_30%_52%,rgba(30,74,140,0.36),transparent_70%),radial-gradient(ellipse_45%_50%_at_72%_32%,rgba(20,50,110,0.22),transparent_70%)]"
        />

        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-[minmax(0,1.32fr)_minmax(0,0.9fr)] lg:gap-16 lg:px-14 xl:gap-20 xl:px-20">
          <div
            style={
              enabled
                ? { transform: 'translate3d(0, calc(var(--p, 0) * -72px), 0)' }
                : undefined
            }
          >
            {visual}
          </div>

          <div className="flex max-w-[560px] flex-col lg:max-w-none">
            {header}

            <div className={enabled ? 'mt-8 flex flex-col' : 'mt-10 flex flex-col'}>
              {items.map((item, i) => {
                const open = `var(--s06-o-${i}, ${i === 0 ? 1 : 0})`
                return (
                  <div
                    key={item.title}
                    className={`relative flex flex-col pl-5 ${enabled ? 'py-[0.8rem]' : 'py-[1.1rem]'}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute left-0 w-0.5 rounded-full bg-[var(--ca-text)] ${enabled ? 'inset-y-[0.8rem]' : 'inset-y-[1.1rem]'}`}
                      style={{ opacity: enabled ? open : 1 }}
                    />
                    <h3 className="font-sans text-[28px] font-semibold leading-[1.15] text-[var(--ca-text)]">
                      {item.title}
                    </h3>
                    <div
                      ref={(node) => {
                        panelRefs.current[i] = node
                      }}
                      style={{
                        overflow: 'hidden',
                        maxHeight: enabled ? `calc(${open} * var(--s06-h-${i}, 600px))` : 'none',
                        opacity: enabled ? open : 1,
                      }}
                    >
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
