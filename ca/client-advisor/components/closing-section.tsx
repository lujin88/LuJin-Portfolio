'use client'

import { LayerScrollGroup } from '@eon/components/motion/layer-scroll-group'
import { useTranslation } from '@i18n/use-translation'

export function ClosingSection() {
  const { t } = useTranslation()
  return (
    <section
      aria-labelledby="closing-statement"
      className="ca-closing relative isolate flex min-h-svh w-full items-center justify-center overflow-visible bg-[var(--ca-bg)] px-[var(--content-inset,24px)] py-28 text-[var(--ca-text)] lg:py-36"
    >
      <div className="ca-closing-atmosphere pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/assets/images/client-advisory/closing-earth.webp"
          loading="lazy"
          alt={t('ca.closingAlt')}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="ca-closing-floor" />
      </div>

      <div aria-hidden="true" className="ca-closing-join" />

      <LayerScrollGroup className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <p
          data-move="96"
          id="closing-statement"
          className="ca-h3 max-w-[22ch] font-sans sm:max-w-[32ch]"
        >
          {t('ca.closing')}
        </p>
      </LayerScrollGroup>
    </section>
  )
}
