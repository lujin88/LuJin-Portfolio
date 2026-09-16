export function ClosingSection() {
  return (
    <section
      aria-labelledby="closing-statement"
      className="ca-closing relative isolate flex min-h-[100svh] w-full items-center justify-center bg-[var(--ca-bg)] px-6 py-24 text-[var(--ca-text)] sm:px-10"
    >
      <div aria-hidden="true" className="ca-closing-atmosphere pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/images/closing-earth.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="ca-closing-floor" />
      </div>

      <div aria-hidden="true" className="ca-closing-join" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <p
          id="closing-statement"
          className="max-w-[22ch] text-balance font-sans text-[1.75rem] font-normal leading-[1.3] tracking-[-0.01em] text-[var(--ca-text)] sm:max-w-[32ch] sm:text-[2.125rem] lg:text-[2.5rem] lg:leading-[1.3]"
        >
          {
            "Complexity doesn't disappear. It gets a place to land — so advisors spend less time managing tools, and more time with the client on the phone."
          }
        </p>
      </div>
    </section>
  )
}
