import Image from 'next/image'
import { MousePointer2, MessageSquare, Users, BarChart3 } from 'lucide-react'
import { SectionLabel } from '@/components/section-label'
import { EvidenceCard } from '@/components/evidence-card'
import { QuoteCard } from '@/components/quote-card'
import { AutoDetectedPill, RoofDetectionCard } from '@/components/roof-detection-card'

const evidenceSources = [
  { icon: Users, label: 'Customer research', iconClassName: 'bg-lavender-light text-navy-950' },
  { icon: BarChart3, label: 'Website analytics', iconClassName: 'bg-mint-light text-navy-950' },
  { icon: MousePointer2, label: 'Hotjar', iconClassName: 'bg-peach text-navy-950' },
  { icon: MessageSquare, label: 'Sales feedback', iconClassName: 'bg-blue-soft text-navy-950' },
]

export function TestingSection() {
  return (
    <section className="relative overflow-x-hidden bg-off-white py-24 md:py-32">
      {/* Soft, secondary background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-lavender-light/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 h-[320px] w-[320px] rounded-full bg-mint-light/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-16">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          {/* Left column: editorial content */}
          <div className="max-w-[620px]">
            <SectionLabel number="07" label="Testing & Iteration" />

            <h2 className="mt-6 text-pretty text-[52px] font-extrabold leading-[0.98] tracking-[-0.03em] text-navy-950 md:text-[64px]">
              Testing with
              <br />
              real customers.
            </h2>

            <p className="mt-6 max-w-[460px] text-lg leading-relaxed text-navy-text">
              We tested the redesigned calculator with customers using multiple sources of feedback.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-nowrap">
              {evidenceSources.map(({ icon, label, iconClassName }) => (
                <EvidenceCard key={label} icon={icon} iconClassName={iconClassName} label={label} />
              ))}
            </div>
          </div>

          {/* Right column: visual composition */}
          <div className="relative mx-auto w-full max-w-[560px] pt-28 lg:mx-0 lg:ml-auto lg:pt-32">
            {/* Handwritten annotation */}
            <div className="absolute left-0 top-0 z-20 hidden w-[190px] -rotate-2 md:block lg:-left-8">
              <Image
                src="./eon/images/eon 08 text.png"
                alt=""
                width={1456}
                height={1160}
                className="h-auto w-full select-none"
              />
            </div>

            {/* Quote card, overlapping the top-left of the photograph */}
            <QuoteCard
              quote="It was so much easier than I expected."
              attribution="Test user, Germany"
              className="absolute left-0 top-16 z-20 w-[230px] md:left-8 lg:top-20"
            />

            {/* Primary photograph */}
            <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(5,20,30,0.16)]">
              <Image
                src="./eon/images/eon 08 woman.png"
                alt="Woman smiling while looking at the solar calculator on her laptop"
                width={1372}
                height={1148}
                className="h-[420px] w-full object-cover md:h-[480px]"
                priority
              />
            </div>

            {/* Angled solar-roof card, overlapping the photograph */}
            <div className="absolute -bottom-10 -right-4 z-20 w-[220px] rotate-6 md:-right-10 md:w-[240px]">
              <div className="overflow-hidden rounded-3xl border-4 border-background shadow-[0_30px_70px_rgba(5,20,30,0.22)]">
                <Image
                  src="./eon/images/eon 08 house.png"
                  alt="Aerial view of a house with solar panels installed on its roof"
                  width={1035}
                  height={1516}
                  className="h-[300px] w-full object-cover md:h-[330px]"
                />
              </div>

              <div className="absolute right-3 top-3 -rotate-6">
                <AutoDetectedPill />
              </div>

              <div className="absolute -bottom-8 -left-10 -rotate-6">
                <RoofDetectionCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
