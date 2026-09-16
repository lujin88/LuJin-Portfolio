export function SessionMandate() {
  return (
    <section
      aria-labelledby="mandate-heading"
      className="relative isolate min-h-screen w-full overflow-hidden bg-[var(--ca-bg)] font-sans text-[var(--ca-text)]"
    >
      {/* Layer 1 + 2: dark navy canvas + background asset (navy gradient with the blue
          curved light + glow node baked in). Full-section cover, responsive, undistorted. */}
      <img
        src="/images/ca-02-bg.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover object-center"
      />

      {/* Layer 4: card stack + vertical line + node. Anchored to this section only
          (not the page). */}
      <img
        src="/images/ca-02-ui.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-[18%] top-[49%] z-10 hidden h-auto w-[64%] max-w-[1040px] origin-center -translate-y-1/2 scale-[1.1] select-none mix-blend-screen lg:block"
      />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="max-w-[540px] lg:max-w-[760px]">
          <div className="ca-eyebrow">
            <span className="ca-eyebrow-index">02</span>
            <span className="ca-eyebrow-rule" aria-hidden="true" />
            <span>The Mandate</span>
          </div>

          <h2
            id="mandate-heading"
            className="ca-h2 mt-[var(--ca-heading-gap)] max-w-[470px] text-pretty"
          >
            Finding where AI could make a difference.
          </h2>

          <p className="mt-[var(--ca-body-gap)] max-w-md text-pretty text-[15px] font-normal leading-[1.6] text-[var(--ca-text-2)] xl:text-base">
            As AI moved deeper into banking, I saw an opportunity to rethink
            efficiency across Advisory and Sales.
          </p>

          <div className="ca-eyebrow ca-eyebrow-accent mt-16">
            <span>The key question</span>
          </div>

          <h3 className="mt-6 max-w-[540px] text-[2rem] font-semibold leading-[1.15] tracking-[-0.015em] sm:text-4xl lg:max-w-[720px] lg:text-[2.6rem] xl:text-[2.75rem]">
            Where could{" "}
            <span className="font-medium text-[var(--ca-accent)]">AI create</span> the
            most{" "}
            <span className="font-medium text-[var(--ca-accent)]">
              meaningful impact?
            </span>
          </h3>

          <p className="mt-8 max-w-[560px] text-pretty text-[15px] font-normal leading-[1.6] text-[var(--ca-text-2)] xl:text-base">
            Before optimising anything, I needed to understand where advisors
            were actually losing time — and why.
          </p>
        </div>

        {/* Layer 5: right-side annotation, aligned just right of the visual's white
            vertical line. */}
        <div className="relative z-20 mt-16 max-w-[150px] lg:absolute lg:right-1 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 xl:right-4">
            <p className="text-pretty text-[15px] font-normal leading-[1.6] text-[var(--ca-text)]/90">
            Multiple tools.
            <br />
            Siloed data.
            <br />
            A higher cognitive load.
          </p>
        </div>
      </div>
    </section>
  )
}
