'use client'

import Image from 'next/image'
import { CountUp } from '@eon/components/motion/count-up'
import { useTranslation } from '@i18n/use-translation'

export function MetricCards() {
  const { t } = useTranslation()
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Mint metric card */}
      <div className="flex items-center gap-4 rounded-2xl bg-eon-mint px-5 py-5 text-eon-navy">
        <Image
          src="/assets/images/eon/icon-chart.png"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 shrink-0"
        />
        <div className="leading-tight">
          <CountUp className="text-3xl font-extrabold tracking-tight" />
          <p className="text-sm font-medium text-eon-navy/80">{t('eon.overview.uplift')}</p>
        </div>
      </div>

      {/* Lilac rollout card */}
      <div className="flex items-center gap-4 rounded-2xl bg-eon-lilac px-5 py-5 text-eon-navy">
        <Image
          src="/assets/images/eon/icon-world.png"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 shrink-0"
        />
        <div className="leading-tight">
          <p className="text-lg font-bold tracking-tight">{t('eon.overview.ukTitle')}</p>
          <p className="text-sm font-medium text-eon-navy/80 text-balance">
            {t('eon.overview.ukBody')}
          </p>
        </div>
      </div>
    </div>
  )
}
