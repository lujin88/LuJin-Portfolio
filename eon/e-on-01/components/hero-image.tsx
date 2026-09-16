import Image from 'next/image'
import { EonLogo } from '@/components/eon-logo'

export function HeroImage() {
  return (
    <div className="relative">
      {/* Solid lilac graphic circle, top-left */}
      <div
        aria-hidden="true"
        className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-eon-lilac sm:h-80 sm:w-80"
      />
      {/* Solid mint graphic circle, bottom-right */}
      <div
        aria-hidden="true"
        className="absolute -bottom-10 -right-8 h-52 w-52 rounded-full bg-eon-mint sm:h-64 sm:w-64"
      />

      {/* Photo */}
      <div className="relative overflow-hidden rounded-[2rem] shadow-lg shadow-black/20">
        <Image
          src="./eon/images/solar-house.png"
          alt="A modern house with black solar panels on the roof at sunset, surrounded by greenery"
          width={1000}
          height={1100}
          priority
          className="h-full w-full object-cover"
        />

        {/* Handwritten caption */}
        <div className="pointer-events-none absolute right-5 top-6 text-right sm:right-8 sm:top-8">
          <p className="font-hand text-2xl leading-tight text-white/95 drop-shadow-sm sm:text-3xl">
            More
            <br />
            <span className="ml-4">sun for a</span>
            <br />
            <span className="ml-8">brighter</span>
            <br />
            <span className="ml-6">tomorrow.</span>
          </p>
        </div>

        {/* E.ON logo, integrated into the image */}
        <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6">
          <EonLogo className="h-6 w-auto drop-shadow-md sm:h-7" />
        </div>
      </div>
    </div>
  )
}
