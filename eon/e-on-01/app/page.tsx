import { HeroImage } from '@/components/hero-image'
import { MetricCards } from '@/components/metric-cards'
import { SectionLabel } from '@/components/section-label'

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-eon-navy text-white">
      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
        {/* Left column */}
        <div className="order-2 lg:order-1">
          <SectionLabel number="01" eyebrow="The" label="Overview" />

          <h1 className="mt-8 text-5xl font-extrabold leading-[0.98] tracking-tight text-balance sm:text-6xl">
            Turning paid traffic into{' '}
            <span className="text-eon-lilac">solar leads.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70 text-pretty">
            Redesigning a high-friction journey — turning existing traffic into
            qualified solar leads.
          </p>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            My Role
          </p>
          <p className="mt-4 text-lg font-semibold text-white">
            Led design end-to-end
          </p>
          <p className="mt-2 max-w-md text-base leading-relaxed text-white/60">
            From research through testing, with a junior designer — partnering
            with PM, dev, and PO on strategy and delivery.
          </p>

          <div className="mt-8 max-w-lg">
            <MetricCards />
          </div>
        </div>

        {/* Right column */}
        <div className="order-1 lg:order-2">
          <HeroImage />
        </div>
      </section>
    </main>
  )
}
