import Image from "next/image"
import { ContentContainer } from "../../e-on-09/components/content-container"
import { SectionLabel } from "../../e-on-09/components/section-label"

export function AudienceSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slide-bg text-slide-text">
      {/* Decorative organic shapes — soft, low-contrast, atmospheric, behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-purple opacity-[0.07] blur-3xl"
      />

      <ContentContainer className="case-study-section relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[42%_58%] lg:gap-10">
        {/* Left column — narrative */}
        <div className="max-w-[560px]">
          <SectionLabel
            number="03"
            label="Our Audience"
            surface="dark"
            emphasis="strong"
          />

          <h1 className="mt-8 text-pretty text-[52px] font-bold leading-[1.04] tracking-[-0.03em] text-white sm:text-[64px] lg:text-[68px]">
            Who are we designing for?
          </h1>

          <div className="mt-14">
            <h2 className="text-2xl font-semibold text-white">The German market</h2>
            <p className="mt-4 max-w-md text-lg leading-[1.55] text-slide-muted">
              Our audience was primarily homeowners aged 40+, still early in their solar journey.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-lavender-insight">Key insight</h2>
            <p className="mt-4 text-lg leading-[1.55] text-white">
              Interest was there. Confidence wasn&apos;t.
            </p>
          </div>
        </div>

        {/* Right column — locked editorial evidence asset, presented as-is */}
        <div className="relative lg:pl-6">
          <img
            src="/eon/images/eon 03 green_shape_traced_path.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -left-6 top-[38%] z-0 h-auto w-[210px] max-w-none sm:-left-8 sm:w-[240px] lg:-left-10 lg:w-[280px]"
          />

          <div className="relative z-10 aspect-[7/5] w-full overflow-hidden rounded-[28px] border border-slide-line/60 shadow-[0_16px_40px_rgba(5,20,30,0.2)]">
            <Image
              src="./eon/images/audience-evidence.jpg"
              alt="Audience research summary: 66.7% of homeowners are aged 40+, alongside profiles of cost-conscious, sustainability-minded, and information-seeking homeowners, over a photo of a family looking at their solar-paneled home at dusk, annotated 'Still exploring. Still deciding.'"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
        </div>
      </ContentContainer>
    </section>
  )
}
