'use client'

import Image from 'next/image'
import { MousePointer2, MessageSquare, Users, BarChart3 } from 'lucide-react'
import { SectionLabel } from '@eon/components/section-label'
import { ContentContainer } from '@eon/components/content-container'
import { EvidenceCard } from '@eon/components/testing/evidence-card'
import { AutoDetectedPill, RoofDetectionCard } from '@eon/components/testing/roof-detection-card'
import { KineticLines } from '@eon/components/motion/kinetic-lines'
import { OnceReveal } from '@eon/components/motion/once-reveal'
import { useTranslation } from '@i18n/use-translation'

// Visual's redraw (Lu #1473): one arc from under the handwriting to the person at the laptop,
// in AnnotationGroup coordinates (OUTBOX/EON_ARROW_R2_20261108/arrow-1440.svg).
function AnnotationArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="345"
      height="250"
      viewBox="0 0 345 250"
      fill="none"
      overflow="visible"
      className={className}
    >
      <path
        d="M110.3 68.3C120.5 166.9 212.6 210 315 220"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M299 210Q309 217 315 220Q308 225 300 228"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AnnotationGroup({
  className,
  hand1,
  hand2,
}: {
  className?: string
  hand1: string
  hand2: string
}) {
  return (
    <div className={className}>
      <p className="w-[200px] -translate-y-3 -rotate-[9deg] font-hand text-[23px] font-normal leading-[1.06] text-[#5a6180] md:text-[25px]">
        {hand1}
        <br />
        {hand2}
      </p>
      {/* Below 1024 the photo sits elsewhere and the arc crossed the face (visualqa #1676): hidden there, PM #1678. */}
      <AnnotationArrow className="absolute left-0 top-0 z-40 hidden text-[#5a6180] lg:block" />
    </div>
  )
}

export function TestingSection() {
  const { t, ta } = useTranslation()
  const sources = ta('eon.testing.sources')
  const evidenceSources = [
    { icon: Users, label: sources[0], iconClassName: 'bg-lavender-light text-navy-950' },
    { icon: BarChart3, label: sources[1], iconClassName: 'bg-mint-light text-navy-950' },
    { icon: MousePointer2, label: sources[2], iconClassName: 'bg-peach text-navy-950' },
    { icon: MessageSquare, label: sources[3], iconClassName: 'bg-blue-soft text-navy-950' },
  ]
  return (
    <section className="case-study-section relative overflow-x-clip bg-off-white pb-20">
      <ContentContainer className="relative z-[1]">
        <div className="grid grid-cols-1 items-center gap-0 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,620px)] lg:gap-0">
          {/* Left column: editorial content */}
          <div className="max-w-[620px]">
            <SectionLabel
              number="08"
              label={t('eon.testing.eyebrow')}
              surface="light"
              emphasis="soft"
            />

            <KineticLines
              className="mt-6 text-pretty text-[52px] font-extrabold leading-[0.98] tracking-[-0.03em] text-navy-950 md:text-[64px] lg:max-xl:max-w-min"
              lines={[t('eon.testing.line1'), t('eon.testing.line2')]}
            />

            <OnceReveal>
            <p className="mt-6 max-w-[460px] text-lg leading-relaxed text-navy-text">
              {t('eon.testing.body')}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 md:flex md:flex-nowrap lg:grid xl:flex">
              {evidenceSources.map(({ icon, label, iconClassName }) => (
                <EvidenceCard key={label} icon={icon} iconClassName={iconClassName} label={label} />
              ))}
            </div>
            </OnceReveal>
          </div>

          {/* Right visual: photograph, handwritten note, roof overlay */}
          <OnceReveal className="relative mx-auto w-full max-w-[520px] pt-6 md:pt-16 lg:mx-0 lg:ml-auto lg:max-w-none lg:pt-2">
            <AnnotationGroup
              className="pointer-events-none absolute top-0 z-30 hidden w-[420px] md:block md:-left-2 lg:-left-[9.5rem] lg:max-xl:-left-[6rem] lg:top-2"
              hand1={t('eon.testing.hand1')}
              hand2={t('eon.testing.hand2')}
            />

            <div className="relative ml-auto w-full max-w-[500px] lg:mr-8">
              <div className="overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(5,20,30,0.14)]">
                <Image
                  src="/assets/images/eon/eon-08-woman.webp"
                  alt={t('eon.testing.womanAlt')}
                  width={1372}
                  height={1148}
                  className="h-[380px] w-full object-cover object-[48%_22%] md:h-[400px]"
                />
              </div>

              <div className="absolute bottom-0 right-[-0.75rem] z-20 w-[236px] bg-transparent md:w-[248px] lg:right-[-5.5rem]">
                <div className="relative bg-transparent">
                  <Image
                    src="/assets/images/eon/eon-08-house.webp"
                    alt={t('eon.testing.houseAlt')}
                    width={1122}
                    height={1402}
                    className="h-auto w-full bg-transparent"
                  />
                  {/* German label is longer and must stay on one line: centre it so it stays inside the card. */}
                  <div className="absolute left-[58%] top-[12.5%] z-20 -translate-x-1/2 [&:lang(de)]:left-1/2">
                    <AutoDetectedPill />
                  </div>
                  <div className="absolute bottom-[2.4%] left-[14.2%] right-[14.2%] z-20">
                    <RoofDetectionCard />
                  </div>
                </div>
              </div>
            </div>
          </OnceReveal>
        </div>
      </ContentContainer>
    </section>
  )
}
