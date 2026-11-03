# Index micro motion review

Two isolated photographic motion previews requested by Lu through PM, Buzz event `05d6fab3e406a04afff4b9a50f0cf9f4e6d8632b8dc2022ae90e398e1e722630`. Open `PREVIEW.html?scene=advisor` or `PREVIEW.html?scene=solar`; use **Before / After** and **Replay**. No app entrypoint imports these files. No production page or port 3000 server was changed by this work.

## What changes

| Before | After | Why |
| --- | --- | --- |
| Advisor: static `public/assets/images/home-motion/ubs.jpg` | The same pixels, with localized city-light glow and a 4 px source-coordinate reflection shift | Adds atmosphere while face, hand, body and camera remain fixed |
| Solar: static `public/assets/images/home-motion/eon.jpg` | New Jimeng house photograph; soft panel reflection passes once, restrained pool ripple and warm window light | Regenerates the house as requested, then focuses motion on the energy surface and its environment |

The home text and styles are copied for context from the current local homepage. This is an isolated review layout, not a screenshot of a production change. It omits site navigation and uses a system fallback when Poppins is unavailable. Original sources are kept in `assets/`; all generated pixels are confined to `SOLAR_AFTER.png`.

## Motion contract

- One 8-second loop per visible scene. All effects reach the baseline by 6 seconds; 6–8 seconds remain static. At 8 seconds the loop hard-cuts to the same baseline, without a dissolve or reversed footage.
- Advisor: light groups peak at 0.8 and 0.65 opacity (the radial-gradient pixels are themselves translucent); water peaks at 0.6. Motion stays behind the person.
- Solar: the clipped panel highlight traverses 850 source pixels outside-to-outside over 5.6 seconds; its gradient peak is only 0.24 alpha. Pool lines move 9 source pixels, max 0.38 alpha; warm glow's maximum effective alpha is 0.084.
- Each segment uses Emil's `cubic-bezier(0.77,0,0.175,1)`. Only opacity and transform animate.
- Reduced motion: no overlay, static advisor original or static new solar photograph. These are also the still-frame fallbacks.
- Page hidden or article outside the viewport: animation pauses. No gesture-driven interactions; mobile gestures for Lu to test: none.
- `window.micro` is a review/testing handle only (`setTime`, `replay`, `setBefore`), not a proposed production API. Developer integration remains pending. This is not a Rive character rig; no `.riv`, state machine or input names are claimed.

## Four gates and rejected motion

Frequency: only the visible marketing scene runs; reduce shows stills. Purpose: the requested atmospheric delight and solar surface emphasis. Speed: long ambient timing belongs to marketing media, not interaction response. Function: text and metrics remain stationary; nothing blocks reading or controls. Timing and visible amplitude are review proposals, not approved design tokens.

Rejected: face/head/hand morphing (likeness and function); whole-image rotation/zoom (camera drift distracts); animated text/metrics (reading function); flashing or synchronized strong effects (frequency and reading function).

## Generation and provenance

`GENERATION.json` records the two submissions. Reference upload failed without an observed credit deduction; text-to-image succeeded with reported cost 3 credits. Balance checked afterward: 470. The generated photograph was visually inspected at full image size; no visible watermark was observed. No generative video was submitted; micro motion is implemented locally to preserve geometry and an exact baseline at the seam.

Read: harness-core `AGENTS.md`, `docs/motion.md`, `docs/design-skills.md`, `docs/web-video.md`, `roles/motion-designer.md`; local `emil-design-eng` and `find-animation-opportunities` skills. Project root `AGENTS.md` read. The project has no root `design-system/README.md` or motion token file, so source imagery and copied shell styling are preserved. `rive doctor` exited 0; no Rive build was needed.

## Review evidence

1440×900 recordings, before/after stills, reduced-motion stills, seam measurements and browser logs are in `OUTBOX/INDEX_MICRO_MOTION_20261103/` in the Buzz workspace. `record.cjs` uses installed Chrome through harness-core's test lock; configure `PLAYWRIGHT_ROOT` and `MICRO_OUT` to reproduce on another machine. Capture output is not bundled in Git. Videos are review recordings of the browser, not production MP4 exports.

Pending: Lu's visual decision, independent visual QA, mobile layout review and developer integration. No production suite was run because this branch adds an isolated prototype only.
