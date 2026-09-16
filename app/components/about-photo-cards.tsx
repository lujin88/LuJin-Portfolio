'use client'

import { FlippablePhotoCard } from './flippable-photo-card'

const ABOUT_PHOTO_CARDS = [
  {
    image: '/assets/about/swimming.png',
    label: 'Reset',
    alt: 'Swimming underwater in a sunlit pool',
    backText:
      "Swimming is one of the few times I'm not making design decisions. Underwater, there's no sound — not even my phone can reach me.",
    frameClass:
      'z-20 hover:z-40 origin-bottom -mr-[3.5rem] sm:-mr-[5.5rem] md:-mr-[7rem] lg:-mr-[8rem] max-md:mr-0 max-md:rotate-0 md:[transform:rotate(-8deg)]',
  },
  {
    image: '/assets/about/workflow.png',
    label: 'Workflow',
    alt: '3D figure surrounded by ChatGPT, Gemini, Claude, and Perplexity',
    backText:
      'I wouldn\'t call myself "AI native," but this portfolio itself was built with v0, Cursor, and GitHub. I\'ve come to rely on AI as part of how I work, not just what I talk about.',
    frameClass:
      'z-30 hover:z-40 origin-bottom max-md:rotate-0 md:[transform:rotate(0deg)_scale(1.05)]',
  },
  {
    image: '/assets/about/tiles.png',
    label: 'Build',
    alt: 'Translucent magnetic tiles stacked into a colorful structure',
    backText:
      "No instructions, no user testing — just building until it stands up, and taking it apart when it doesn't. Turns out that's most of design too.",
    frameClass:
      'z-20 hover:z-40 origin-bottom -ml-[3.5rem] sm:-ml-[5.5rem] md:-ml-[7rem] lg:-ml-[8rem] max-md:ml-0 max-md:rotate-0 md:[transform:rotate(8deg)]',
  },
] as const

export function AboutPhotoCards() {
  return (
    <div className="cards-deck relative z-20 mt-6 flex w-full max-w-5xl items-center justify-center max-md:flex-col max-md:gap-6">
      {ABOUT_PHOTO_CARDS.map((card) => (
        <div
          key={card.label}
          className={`yoga-card aspect-[9/16] w-72 rounded-2xl sm:w-[21rem] md:w-[24rem] ${card.frameClass}`}
        >
          <FlippablePhotoCard
            image={card.image}
            label={card.label}
            backText={card.backText}
            alt={card.alt}
            className="h-full w-full"
          />
        </div>
      ))}
    </div>
  )
}
