# CA07 motion reconstruction

Request: #lu-portfolio message 153 (2026-11-08). Original QA wording: `/Users/lu/.buzz/WORK_LOGS/notion_backup/LU_TODO_NOTION_BEFORE_CLEANUP_20261105_2305.md:75`: second line must meet the plate edge; third highlight must remain unclipped. This is a reconstruction, not a recovered r4 patch.

## Motion plan

| Location | Before | Purpose | Frequency | Motion |
| --- | --- | --- | --- | --- |
| Card 2 upper plate edge | Static card-02.webp | Explanation of the layered illustration | Once on viewport entry | Reveal an SVG edge overlay through a mask transformed in X; 1100ms desktop / 700ms mobile, cubic-bezier(0.22,1,0.36,1) |
| Card 3 upper orbit | Static card-03.webp | Explanation of reach | Once on viewport entry | Transform/opacity highlight follows upper orbit into the existing endpoint; same timing |
| Reduced motion | Static source | Preserve readable final state | Always | No new displacement or reveal; static edge and endpoint |

Timing source: existing CA outcome artwork uses 1100ms transform, 700ms opacity, cubic-bezier(0.22,1,0.36,1) in `ca/client-advisor/app/globals.css`. There is no project `design-system/motion.md` in this checkout. These values reuse implementation evidence; they are not a new approved motion standard.

Both source images and overlays use identical aspect-preserving, bottom-aligned coordinate mapping. Image object-contain/object-bottom matches SVG xMidYMax meet: scale = min(containerWidth/sourceWidth, containerHeight/sourceHeight), offsetX = (containerWidth - sourceWidth × scale)/2, offsetY = containerHeight - sourceHeight × scale. This retains intrinsic proportions and converts all overlay coordinates with the same uniform scale and offsets. Card 2 is 800×987; card 3 is 800×974. The full image no longer uses the old lower artwork crop for these cards. The orbit halo radius is 15 source pixels and its entire path stays inside the source bounds. The original assets are unchanged.

## Rejected candidates

- Loop the orbital dot: frequency gate; repeated movement distracts from the adjacent outcome text.
- Move or bounce outcome numbers: function gate; readers need stable claims. No additional numerical animation is introduced.
- Replay on keyboard focus or hover: frequency gate; no new interaction handlers.
- Animate the whole globe or layer stack: purpose gate; the edge and orbit already explain the relevant relationship.

## Validation and handoff

PR 79 commit 6198e27 evidence is in `.ca07-review-20261108/vercel-6198e27/`, captured from its actual Vercel preview. Earlier `final/` recordings came from a 3000 copy and are not evidence for the PR. The QA revision restores ca-outcome-art entry behavior, delays the edge/dot by the existing card delay plus 250ms, and preserves image proportions. Revised local evidence is stored separately in `.ca07-review-20261108/qa-revision/`; a new Vercel capture is required after pushing.

Record at 1440 and 390: normal, CDP Animation.setPlaybackRate=0.25, and reducedMotion=reduce. Verify overlay geometry and halo bounds throughout sampled frames. No new gestures. Existing page scrolling on a real phone remains untested. Visual QA must judge plate-edge alignment and whether the shorter mobile pass reads clearly. Do not treat automated samples as every-frame performance or Lu approval.

Source branch: motion/ca07-rebuild-20261108. Runtime identity is available. GitHub writes remain paused by the shared HALT; local commits only until it is lifted. Design PR and Visual QA required; Lu merges. Safari mask-animation behavior and real iPhone rendering remain untested because no Safari test tool is available locally.
