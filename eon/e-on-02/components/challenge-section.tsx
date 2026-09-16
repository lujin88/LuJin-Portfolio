import Image from "next/image"

export function ChallengeSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a1822] py-20 md:py-28 lg:py-32">
      {/* restrained, low-contrast organic color shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_12%_-10%,rgba(160,140,224,0.06),transparent_60%),radial-gradient(60%_50%_at_100%_105%,rgba(126,231,199,0.035),transparent_60%)]"
      />
      {/* thin horizontal divider near the top */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-white/[0.06]"
      />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16">
        {/* LEFT — editorial image */}
        <div className="relative overflow-hidden rounded-[28px]">
          <Image
            src="./eon/images/eon-challenge-woman-laptop.png"
            alt="A person researching solar options on a laptop showing an E.ON website, with a handwritten note reading 'Same visitors. More impact.'"
            width={1672}
            height={941}
            priority
            className="h-auto w-full object-cover"
          />
        </div>

        {/* RIGHT — editorial text block */}
        <div className="max-w-xl">
          {/* section number + label */}
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a08ce0] text-sm font-semibold tracking-wide text-[#0a1822]">
              02
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-[#8b98ab]">
              The Challenge
            </span>
          </div>

          {/* headline */}
          <h2 className="mt-8 text-balance text-4xl font-extrabold leading-[1.02] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
            We had the traffic.
            <br />
            Not the leads.
          </h2>

          {/* body copy */}
          <div className="mt-8 space-y-6 text-base leading-relaxed text-[#9aa7ba] md:text-[1.0625rem]">
            <p>
              E.ON was investing in paid traffic, but too few visitors converted
              {" — "}baseline lead conversion sat around 5.1%. People were
              researching solar, comparing options{" — "}but dropping off before
              finishing the calculator. We never got their information.
            </p>
            <p>
              The opportunity wasn&apos;t more traffic.{" "}
              <span className="font-semibold text-white">
                It was more value from the traffic we already had.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
