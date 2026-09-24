import Image from 'next/image'

export function EonLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/assets/images/eon/eon 01 - Logo.svg.webp"
      alt="E.ON"
      width={160}
      height={48}
      priority
      className={className ?? 'h-9 w-auto'}
    />
  )
}
