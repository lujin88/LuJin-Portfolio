# CA05 approved hover integration

Authority: Lu #10917 approved the sequence and requested faster motion; PM #10924 specified 20% shorter; #10947 presented the new GIF; visualqa #10952 approved the standalone speed revision; PM #10953/#10981 assigned page integration.

## Source and implementation

Approved prototype: `/Users/lu/.buzz/OUTBOX/CA_HOVER_REVISION_1112/v4-faster/review.html` (GIF attached to chat #10947). Independent candidate review: `/Users/lu/.buzz/OUTBOX/VISUALQA_CA05_V4_1113/REVIEW.md`.

Each MP4 is rendered directly from that prototype's `renderMotion`, 87 frames at 20 fps (4.35 seconds), without changing paths, lettering, sequence or timing. No paid generation or new artwork. H.264 CRF14, silent, yuv420p, faststart; odd source heights rescaled down by one pixel for codec compatibility. The three files total about 444 KiB. Video encoding is lossy; this is not a pixel-identical export claim.

Reproduce with `node scripts/export-ca05-hover.cjs /absolute/path/to/v4-faster` under the browser test lock. Requires Playwright and ffmpeg. The prototype source remains with motion's approved handoff; no separate page prototype exists in this branch.

The existing Session05 component owns playback and preserves click/keyboard flip behavior, translated copy and WebKit face-visibility correction. Fine-pointer hover starts once; pointer exit, flipping, leaving the viewport, hiding the document, or changing motion/pointer preferences stops it. Ended/error restores the existing static artwork. Only an eligible first hover mounts a video, so initial rendering, touch and reduced-motion use existing static images without fetching these clips. The old whole-image hover zoom is replaced by the approved internal artwork sequence. No autoplay or loop.

No ARCHITECTURE.md exists on the base branch; component/module responsibilities and directory structure remain unchanged.

## Validation

Build, TypeScript and browser results are recorded in `/Users/lu/.buzz/OUTBOX/DEV_CA05_HOVER_1113/`. Page-level visualqa and legal/QA review remain required; standalone prototype approval does not replace page acceptance.

Current integration status: DRAFT. Frozen install/build/tsc passed. Chrome390 normal/reduce passed; synthetic-touch result does not establish real taps. Chrome700 completion wait timed out; cause unclassified. Browser run stopped at666MiB free under PM's1GiB limit. WebKit, remaining widths, actual tap checks and recordings are pending. Test script has added failure-state diagnostics for the next run. Do not treat this as ready for acceptance.
