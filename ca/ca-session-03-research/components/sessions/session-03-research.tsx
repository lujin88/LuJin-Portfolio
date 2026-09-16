import Image from 'next/image'

const advisorQuotes = [
  '"I know the data exists — it\u2019s just hard to find."',
  '"The client calls, and I have seconds to answer. Finding the data still takes time."',
]

const bodyText =
  'font-sans text-[1rem] leading-[1.6] text-[var(--s3-body)]'

export function Session03Research() {
  return (
    <section
      id="session-03-research"
      aria-labelledby="session-03-heading"
      className="session-03 relative isolate flex min-h-svh w-full overflow-hidden bg-[var(--s3-bg)] text-[var(--s3-text)]"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/session-03-advisor.png"
          alt="An advisor seen from behind, resting her chin on her hand while looking out of a dark office window."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[22%_top] lg:object-[78%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,19,38,0.45)_0%,rgba(9,19,38,0.7)_32%,rgba(9,19,38,0.94)_48%,rgba(9,19,38,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(9,19,38,0.3)_0%,rgba(9,19,38,0.55)_40%,rgba(9,19,38,0.94)_60%,rgba(9,19,38,0.98)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,var(--s3-bg))]" />
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-y-14 px-6 pb-16 pt-[max(6rem,14svh)] sm:px-10 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:gap-x-12 lg:px-16 lg:py-0 xl:px-20">
        <div className="flex flex-col justify-center lg:min-h-svh lg:py-24">
          <ul
            aria-label="Advisor quotes"
            className="flex max-w-[30ch] flex-col gap-y-10 pl-0 font-sans text-[1.4rem] font-normal leading-[1.4] tracking-[-0.005em] text-[var(--s3-text)] sm:text-[1.65rem] lg:ml-[44%] lg:max-w-[24ch] lg:gap-y-12 lg:text-[clamp(1.5rem,1.9vw,1.9rem)] xl:ml-[48%]"
          >
            {advisorQuotes.map((quote) => (
              <li key={quote} className="text-pretty">
                <blockquote className="m-0">{quote}</blockquote>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center border-t border-[var(--s3-rule)] pt-12 lg:min-h-svh lg:border-t-0 lg:py-24 lg:pt-24">
          <p className="flex items-center gap-x-4 font-sans text-[0.75rem] font-medium uppercase leading-[1.3] tracking-[0.2em] text-[var(--s3-muted)]">
            <span className="text-[var(--s3-text)]">03</span>
            <span aria-hidden="true" className="h-3.5 w-px bg-[var(--s3-rule)]" />
            <span>The Research</span>
          </p>

          <h2
            id="session-03-heading"
            className="mt-7 max-w-[16ch] text-balance font-sans text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[2.75rem] lg:text-[clamp(2.75rem,3.7vw,3.25rem)]"
          >
            Understanding the work.
          </h2>

          <p className="mt-4 max-w-[20ch] text-balance font-sans text-[2rem] font-semibold leading-[1.15] tracking-[-0.015em] sm:text-[2.25rem] lg:text-[clamp(2.1rem,2.9vw,2.5rem)]">
            One need. A whole service behind it.
          </p>

          <p className={`mt-6 max-w-[46ch] text-pretty ${bodyText}`}>
            I set out to understand how advisors actually work — interviewing 17 Client Advisors primarily across Switzerland Wealth Management, with EMEA and APAC
            <sup className="ml-px text-[0.65em] leading-none">*</sup> advisors included for comparison, to see how they moved across 10+ different tools, collaborated with others, and turned what they gathered into a decision for the client.
          </p>

          <h3 className="mt-12 max-w-[22ch] text-balance font-sans text-[2rem] font-semibold leading-[1.15] tracking-[-0.015em] sm:text-[2.25rem] lg:mt-14 lg:text-[clamp(2.1rem,2.9vw,2.5rem)]">
            The information existed. The advisor had to connect it.
          </h3>

          <p className={`mt-6 max-w-[46ch] text-pretty ${bodyText}`}>
            The friction wasn&apos;t only access. It was stitching together 10+ disconnected tools — in the moment, under pressure.
          </p>
        </div>
      </div>
    </section>
  )
}
