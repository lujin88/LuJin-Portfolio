import Image from 'next/image'

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Mint metric card */}
      <div className="flex items-center gap-4 rounded-2xl bg-eon-mint px-5 py-5 text-eon-navy">
        <Image
          src="./eon/images/icon-chart.png"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 shrink-0"
        />
        <div className="leading-tight">
          <p className="text-3xl font-extrabold tracking-tight">+300%</p>
          <p className="text-sm font-medium text-eon-navy/80">Lead conversion uplift</p>
        </div>
      </div>

      {/* Lilac rollout card */}
      <div className="flex items-center gap-4 rounded-2xl bg-eon-lilac px-5 py-5 text-eon-navy">
        <Image
          src="./eon/images/icon-world.png"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 shrink-0"
        />
        <div className="leading-tight">
          <p className="text-lg font-bold tracking-tight">UK rollout</p>
          <p className="text-sm font-medium text-eon-navy/80 text-balance">
            Similar experience rolled out to the UK market.
          </p>
        </div>
      </div>
    </div>
  )
}
