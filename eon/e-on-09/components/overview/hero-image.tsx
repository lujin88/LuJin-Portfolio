'use client'

import Image from 'next/image'
import { EonLogo } from '@eon/components/overview/eon-logo'
import { useTranslation } from '@i18n/use-translation'

export function HeroImage() {
  const { t } = useTranslation()
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
      <div className="relative z-10 overflow-hidden rounded-[2rem] shadow-lg shadow-navy-950/20">
        <Image
          src="/assets/images/eon/solar-house.webp"
          alt={t('eon.overview.photoAlt')}
          width={1000}
          height={1100}
          priority
          className="h-full w-full object-cover"
        />

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
