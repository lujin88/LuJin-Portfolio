'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './session-03-research.module.css'

const advisorQuotes = [
  '"I know the data exists — it\u2019s just hard to find."',
  '"The client calls, and I have seconds to answer. Finding the data still takes time."',
]

const bodyText =
  'font-sans text-[15px] leading-[1.6] text-[var(--s3-body)] xl:text-base'

function sectionIsSettled(section: HTMLElement, entry?: IntersectionObserverEntry) {
  const rect = entry?.boundingClientRect ?? section.getBoundingClientRect()
  const vh = window.innerHeight || 1
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
  const viewportCover = visible / vh
  const desktop = window.matchMedia('(min-width: 1024px)').matches

  if (desktop) {
    return rect.top <= vh * 0.16 && viewportCover >= 0.64
  }

  return rect.top <= vh * 0.4 && viewportCover >= 0.24
}

export function Session03Research() {
  const sectionRef = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionMq.matches) {
      setRevealed(true)
      return
    }

    let settleTimer = 0

    const apply = (entry?: IntersectionObserverEntry) => {
      window.clearTimeout(settleTimer)
      if (sectionIsSettled(section, entry)) {
        settleTimer = window.setTimeout(() => setRevealed(true), 140)
        return
      }
      setRevealed(false)
    }

    const observer = new IntersectionObserver(
      ([entry]) => apply(entry),
      {
        threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      },
    )

    observer.observe(section)
    apply()

    return () => {
      window.clearTimeout(settleTimer)
      observer.disconnect()
    }
  }, [])

  const copyState = `${styles.copy} ${revealed ? styles.copyIn : ''}`

  return (
    <section
      ref={sectionRef}
      id="session-03-research"
      aria-labelledby="session-03-heading"
      className="session-03 relative isolate flex min-h-svh w-full overflow-hidden bg-[var(--s3-bg)] text-[var(--s3-text)]"
      data-research-revealed={revealed ? 'true' : 'false'}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/session-03-advisor.png"
          alt="An advisor seen from behind, resting her chin on her hand while looking out of a dark office window."
          fill
          priority
          sizes="100vw"
          className={`object-cover ${styles.photo}`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,19,38,0.45)_0%,rgba(9,19,38,0.7)_32%,rgba(9,19,38,0.94)_48%,rgba(9,19,38,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(9,19,38,0.3)_0%,rgba(9,19,38,0.55)_40%,rgba(9,19,38,0.94)_60%,rgba(9,19,38,0.98)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,var(--s3-bg))]" />
      </div>

      <div
        className={`${styles.grid} mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-y-14 px-6 pb-16 pt-[max(6rem,14svh)] sm:px-10 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:px-16 lg:py-0 xl:px-20`}
      >
        <div className={`${styles.quotesCol} flex flex-col justify-center lg:min-h-svh lg:py-24`}>
          <ul
            aria-label="Advisor quotes"
            className={`${copyState} ${styles.quotes} flex w-full flex-col gap-y-10 pl-0 font-sans text-[1.15rem] font-normal leading-[1.4] tracking-[-0.005em] text-[var(--s3-text)] sm:text-[1.35rem] lg:gap-y-16 lg:text-[clamp(1.25rem,1.55vw,1.55rem)]`}
          >
            {advisorQuotes.map((quote, i) => (
              <li
                key={quote}
                className={
                  i === 0
                    ? 'max-w-[24ch] text-pretty [text-shadow:0_1px_18px_rgba(9,19,38,0.7)] lg:ml-[22%] lg:-mt-8'
                    : 'max-w-[24ch] text-pretty [text-shadow:0_1px_18px_rgba(9,19,38,0.7)] lg:ml-[44%] lg:mt-2'
                }
              >
                <blockquote className="m-0">{quote}</blockquote>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`${copyState} ${styles.copyCol} flex flex-col justify-center border-t border-[var(--s3-rule)] pt-12 lg:min-h-svh lg:border-t-0 lg:py-24 lg:pt-24`}
        >
          <p className="ca-eyebrow">
            <span className="ca-eyebrow-index">03</span>
            <span aria-hidden="true" className="ca-eyebrow-rule" />
            <span>The Research</span>
          </p>

          <h2
            id="session-03-heading"
            className="ca-h2 mt-[var(--ca-heading-gap)] max-w-[16ch] font-sans"
          >
            Understanding the work.
          </h2>

          <p className="mt-4 max-w-[20ch] text-balance font-sans text-[2rem] font-semibold leading-[1.15] tracking-[-0.015em] sm:text-[2.25rem] lg:text-[clamp(2.1rem,2.9vw,2.5rem)]">
            One need. A whole service behind it.
          </p>

          <p className={`mt-6 max-w-[46ch] text-pretty ${bodyText}`}>
            I set out to understand how advisors actually work — interviewing 17 Client Advisors primarily across Switzerland Wealth Management, with EMEA and APAC
            <sup className="ml-px text-[0.65em] leading-none">*</sup> advisors included for comparison, to see how they moved across 10+ different tools, collaborated with others, and turned what they gathered into a decision for the client.
          </p>

          <h3 className="mt-12 max-w-[22ch] text-balance font-sans text-[2rem] font-semibold leading-[1.15] tracking-[-0.015em] sm:text-[2.25rem] lg:mt-14 lg:text-[clamp(2.1rem,2.9vw,2.5rem)]">
            The information existed. The advisor had to connect it.
          </h3>

          <p className={`mt-6 max-w-[46ch] text-pretty ${bodyText}`}>
            The friction wasn&apos;t only access. It was stitching together 10+ disconnected tools — in the moment, under pressure.
          </p>
        </div>
      </div>
    </section>
  )
}
