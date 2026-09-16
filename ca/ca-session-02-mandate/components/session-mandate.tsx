export function SessionMandate() {
  return (
    <section
      aria-labelledby="mandate-heading"
      className="relative isolate min-h-screen w-full overflow-hidden bg-mandate-bg text-mandate-fg"
      style={{ fontFamily: "var(--font-poppins), var(--font-sans)" }}
    >
      {/* Layer 1 + 2: dark navy canvas + background asset (navy gradient with the blue
          curved light + glow node baked in). Full-section cover, responsive, undistorted. */}
      <img
        src="/images/ca-02-bg.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover object-center"
      />

      {/* Layer 4: large transparent UI visual (interface panels + white vertical line +
          node). Sits above the background/light, anchored to the right half and vertically
          centered. Aspect ratio preserved; entire visual stays visible. */}
      <img
        src="/images/ca-02-ui.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-[7%] top-1/2 z-10 hidden h-auto w-[64%] max-w-[1040px] -translate-y-1/2 select-none mix-blend-screen lg:block xl:w-[60%]"
      />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="max-w-[540px] lg:max-w-[760px]">
          <div className="flex items-center gap-4 text-xs font-medium tracking-[0.2em] text-mandate-muted">
            <span className="text-mandate-fg">02</span>
            <span className="text-mandate-muted/40">|</span>
            <span>THE MANDATE</span>
          </div>

          <h2
            id="mandate-heading"
            className="mt-10 max-w-[470px] text-pretty text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]"
          >
            Finding where AI could make a difference.
          </h2>

          <p className="mt-8 max-w-md text-pretty text-base font-normal leading-[1.55] text-mandate-muted sm:text-lg">
            As AI moved deeper into banking, I saw an opportunity to rethink
            efficiency across Advisory and Sales.
          </p>

          <div className="mt-16 text-xs font-medium tracking-[0.2em] text-mandate-accent">
            THE KEY QUESTION
          </div>

          <h3 className="mt-6 max-w-[540px] text-[2rem] font-semibold leading-[1.15] tracking-[-0.015em] sm:text-4xl lg:max-w-[720px] lg:text-[2.6rem] xl:text-[2.75rem]">
            Where could{" "}
            <span className="font-medium text-mandate-accent">AI create</span> the
            most{" "}
            <span className="font-medium text-mandate-accent">
              meaningful impact?
            </span>
          </h3>

          <p className="mt-8 max-w-[560px] text-pretty text-base font-normal leading-[1.55] text-mandate-muted sm:text-lg">
            Before optimising anything, I needed to understand where advisors
            were actually losing time — and why.
          </p>
        </div>

        {/* Layer 5: right-side annotation, aligned just right of the visual's white
            vertical line. */}
        <div className="relative z-20 mt-16 max-w-[150px] lg:absolute lg:right-1 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 xl:right-4">
          <p className="text-pretty text-[15px] font-normal leading-[1.55] text-mandate-fg/90">
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
