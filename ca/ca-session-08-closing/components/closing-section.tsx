const closingTokens = {
  '--closing-bg': '#071428',
  '--closing-bg-deep': '#040c1c',
  '--closing-text': '#e6ecf5',
} as React.CSSProperties

export function ClosingSection() {
  return (
    <section
      aria-labelledby="closing-statement"
      style={closingTokens}
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[var(--closing-bg)] px-6 py-24 text-[var(--closing-text)] sm:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[var(--closing-bg-deep)]"
      >
        <img
          src="/images/closing-earth.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, transparent 40%, rgba(4, 12, 28, 0.55) 72%, var(--closing-bg-deep) 100%)',
          }}
        />
      </div>

      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        <p
          id="closing-statement"
          className="max-w-[22ch] text-balance font-sans text-[1.75rem] font-normal leading-[1.3] tracking-[-0.01em] sm:max-w-[32ch] sm:text-[2.125rem] lg:text-[2.5rem] lg:leading-[1.3]"
        >
          {
            "Complexity doesn't disappear. It gets a place to land — so advisors spend less time managing tools, and more time with the client on the phone."
          }
        </p>
      </div>
    </section>
  )
}
