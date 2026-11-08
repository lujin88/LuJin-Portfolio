# CA07 motion reconstruction

Request: #lu-portfolio message 153 (2026-11-08). Original QA wording: `/Users/lu/.buzz/WORK_LOGS/notion_backup/LU_TODO_NOTION_BEFORE_CLEANUP_20261105_2305.md:75`: second line must meet the plate edge; third highlight must remain unclipped. This is a reconstruction, not a recovered r4 patch.

## Motion plan

| Location | Before | Purpose | Frequency | Motion |
| --- | --- | --- | --- | --- |
| Card 2 upper plate edge | Static card-02.webp | Explanation of the layered illustration | Once on viewport entry | Reveal an SVG edge overlay through a mask transformed in X; 1100ms desktop / 700ms mobile, cubic-bezier(0.22,1,0.36,1) |
| Card 3 upper orbit | Static card-03.webp | Explanation of reach | Once on viewport entry | Transform/opacity highlight follows upper orbit into the existing endpoint; same timing |
| Reduced motion | Static source | Preserve readable final state | Always | No new displacement or reveal; static edge and endpoint |

Timing source: existing CA outcome artwork uses 1100ms transform, 700ms opacity, cubic-bezier(0.22,1,0.36,1) in `ca/client-advisor/app/globals.css`. There is no project `design-system/motion.md` in this checkout. These values reuse implementation evidence; they are not a new approved motion standard.

Both source images and overlays use identical full-card coordinate mapping. Card 2 is 800×987; card 3 is 800×974. The full image no longer uses the old lower artwork crop for these cards. The orbit halo radius is 15 source pixels and its entire path stays inside the source bounds. The original assets are unchanged.

## Rejected candidates

- Loop the orbital dot: frequency gate; repeated movement distracts from the adjacent outcome text.
- Move or bounce outcome numbers: function gate; readers need stable claims. No additional numerical animation is introduced.
- Replay on keyboard focus or hover: frequency gate; no new interaction handlers.
- Animate the whole globe or layer stack: purpose gate; the edge and orbit already explain the relevant relationship.

## Validation and handoff

Use `.ca07-review-20261108/final/` for final recording evidence. The earlier top-level recordings are superseded because the preview accidentally mixed main's text references with the 3000 copy. Final preview copies only this diff onto the current 3000 source; main-target edits remain in the three CA07 files in this worktree.

Record at 1440 and 390: normal, CDP Animation.setPlaybackRate=0.25, and reducedMotion=reduce. Verify overlay geometry and halo bounds throughout sampled frames. No new gestures. Existing page scrolling on a real phone remains untested. Visual QA must judge plate-edge alignment and whether the shorter mobile pass reads clearly. Do not treat automated samples as every-frame performance or Lu approval.

Source branch: motion/ca07-rebuild-20261108. No commit/push until runtime identity is available; design PR and Visual QA required, Lu merges.
