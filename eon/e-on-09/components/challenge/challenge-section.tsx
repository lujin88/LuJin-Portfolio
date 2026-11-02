'use client'

import Image from "next/image"
import { ContentContainer } from "@eon/components/content-container"
import { SectionLabel } from "@eon/components/section-label"
import { LayerScrollGroup } from "@eon/components/motion/layer-scroll-group"
import { useTranslation } from '@i18n/use-translation'

export function ChallengeSection() {
  const { t } = useTranslation()
  return (
    <LayerScrollGroup
      as="section"
      className="case-study-section relative w-full overflow-hidden bg-navy-950"
    >
      {/* restrained, low-contrast organic color shapes */}
      <div
        aria-hidden="true"
        data-move="8"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_12%_-10%,rgba(160,140,224,0.06),transparent_60%),radial-gradient(60%_50%_at_100%_105%,rgba(126,231,199,0.035),transparent_60%)]"
      />
      <ContentContainer className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* LEFT — editorial image */}
        <div data-move="100" data-from-opacity="0.92">
          <div className="relative overflow-hidden rounded-[28px]">
            <Image
              src="/assets/images/eon/eon-challenge-woman-laptop.webp"
              alt={t('eon.challenge.photoAlt')}
              width={1400}
              height={788}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT — editorial text block */}
        <div className="max-w-xl" data-move="18">
          {/* section number + label */}
          <SectionLabel
            number="02"
            label={t('eon.challenge.eyebrow')}
            surface="dark"
            emphasis="soft"
          />

          {/* headline */}
          <h2 className="mt-8 text-balance text-4xl font-extrabold leading-[1.02] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
            {t('eon.challenge.title1')}
            <br />
            {t('eon.challenge.title2')}
          </h2>

          {/* body copy */}
          <div className="mt-8 space-y-6 text-base leading-relaxed text-[#9aa7ba] md:text-[1.0625rem]">
            <p>
              {t('eon.challenge.body1')}
            </p>
            <p>
              {t('eon.challenge.body2Lead')}{" "}
              <span className="font-semibold text-white">
                {t('eon.challenge.body2Strong')}
              </span>
            </p>
          </div>
        </div>
      </ContentContainer>
    </LayerScrollGroup>
  )
}
