'use client'

import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'
import { EonLogo } from '@eon/components/overview/eon-logo'
import { useTranslation } from '@i18n/use-translation'

export function HeroImage() {
  const { t } = useTranslation()
  const frameRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const [overscan, setOverscan] = useState(0)

  // Frame lag on the way out: the photo travels slower than the page inside
  // its frame. Caption and logo are separate layers and stay put. The photo
  // is pre-extended upward by exactly the distance it will lag before the
  // frame leaves the viewport, so it never uncovers the frame.
  useLayoutEffect(() => {
    const frame = frameRef.current
    const layer = layerRef.current
    if (!frame || !layer) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const lag = 0.12

    const start = () => {
      let max = 0
      let frameId = 0
      const measure = () => {
        const r = frame.getBoundingClientRect()
        max = Math.round(lag * (r.bottom + window.scrollY))
        setOverscan(max)
      }
      const write = () => {
        frameId = 0
        const y = Math.min(lag * window.scrollY, max)
        layer.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
      }
      const onScroll = () => {
        if (!frameId) frameId = requestAnimationFrame(write)
      }
      const onResize = () => {
        measure()
        onScroll()
      }
      measure()
      write()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize)
      return () => {
        cancelAnimationFrame(frameId)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
        layer.style.transform = ''
        setOverscan(0)
      }
    }

    // Reduced motion can be switched on after load: stop at once and put the
    // photo back to its static framing; resume if it is switched off again.
    let stop: (() => void) | null = null
    const apply = () => {
      stop?.()
      stop = reduced.matches ? null : start()
    }
    apply()
    reduced.addEventListener('change', apply)
    return () => {
      reduced.removeEventListener('change', apply)
      stop?.()
    }
  }, [])

  return (
    <div className="relative">
      <img
        src="/assets/images/eon/eon 01-lavender_shape_vector.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10%] -top-[6%] z-0 h-auto w-[52%] max-w-none"
      />
      <img
        src="/assets/images/eon/eon 01 - mint_shape_editable_vector.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-[9%] top-[38%] z-0 h-auto w-[42%] max-w-none"
      />

      {/* Photo */}
      <div
        ref={frameRef}
        className="relative z-10 aspect-square overflow-hidden rounded-[2rem] shadow-lg shadow-navy-950/20"
      >
        <div
          ref={layerRef}
          className="absolute inset-x-0 bottom-0 top-0"
          style={{ top: overscan ? -overscan : undefined }}
        >
          <Image
            src="/assets/images/eon/solar-house.png"
            alt={t('eon.overview.photoAlt')}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Handwritten caption */}
        <div className="pointer-events-none absolute right-5 top-6 text-right sm:right-8 sm:top-8">
          <p className="font-hand text-2xl leading-tight text-white/95 drop-shadow-sm sm:text-3xl">
            {t('eon.overview.hand1')}
            <br />
            <span className="ml-4">{t('eon.overview.hand2')}</span>
            <br />
            <span className="ml-8">{t('eon.overview.hand3')}</span>
            <br />
            <span className="ml-6">{t('eon.overview.hand4')}</span>
          </p>
        </div>

        {/* E.ON logo, integrated into the image */}
        <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6">
          <EonLogo className="h-6 w-auto drop-shadow-md sm:h-7" />
        </div>
      </div>
    </div>
  )
}
