export function BackgroundShapes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* solid lavender organic shape anchored to the top-right corner */}
      <svg
        className="absolute -top-24 -right-24 h-[420px] w-[560px] text-primary/20 md:h-[560px] md:w-[760px]"
        viewBox="0 0 600 480"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          fill="currentColor"
          d="M120 40C220-20 380-10 470 60c92 72 150 190 96 288-52 94-206 118-330 108C130 446 34 388 12 286-8 190 20 100 120 40Z"
        />
      </svg>

      {/* softer lavender wash in the lower-left */}
      <svg
        className="absolute -bottom-40 -left-40 h-[420px] w-[560px] text-primary/12 md:h-[520px] md:w-[680px]"
        viewBox="0 0 600 480"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          fill="currentColor"
          d="M90 60C200 0 360 20 448 96c96 82 118 214 40 300-78 86-236 96-352 40C40 388-8 276 4 176 12 118 40 88 90 60Z"
        />
      </svg>
    </div>
  )
}
