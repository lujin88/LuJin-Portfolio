# R9 caption hold — SPEED 2 / HOLD 2 review

Request: Buzz `189b2823d38900185cc45189599d5748bbff8ad526898478b1a564123ccb496c`, resumed by `cbc60da1cac447ba6a7344c0ca3be87c8ae02d3bbb02a5ccb33f89e539d0669e`.

This revision supersedes the parent R9 README's caption-entry behavior **when used with the developer's new controller**. DECIDE and “Human judgment in every step” use their original image pixels at the completed position and scale, opacity 1 throughout the source timeline, including frame 0. Only Fox contains those layers. Bear and Rabbit source/binaries remain unchanged; rebuilding them is unnecessary.

Interface unchanged: `ReviewAutoplay`, no inputs, entry to `RespondOnce`, no blended transition. Internal timeline remains 60fps/720 frames/12s; `playback-complete` at frame720 is retained. Developer controller SPEED=2/HOLD=2 restarts all three machines at source8.6s, before the reverse-pose section. Expected wall cycle4.3s, including2s completed hold; normal1440/390 recorded restart intervals are about4.31s (see validation below). Caption opacity and transform never reset to hidden. Initial load also shows the complete caption; the PM explicitly allowed frame0 to contain it.

Source: `../Fox/scene.rml` plus `../SEQUENCE_LAYERS.py`. Build: `rive ../Fox --once --format=json` from this directory, after a successful doctor check. Binary: `../Fox/build/fox.riv` (1,775,144 bytes). Build completed with zero errors/warnings. The original artwork is unchanged; no new colors, character shape, states or input names.

`developer-controller.js` is a byte-identical snapshot of `.scratch/hiw-s2-20261105/hiw-r9.js`, preserving the developer-owned guard/fallback. `home.html` is the existing captured review document. `serve.cjs` serves them at `http://127.0.0.1:4696/index`, routes the three Rive requests to the local bands, and reads remaining assets from3000. Set `HIW_PUBLIC_ROOT` to the canonical public directory for read-only static assets if3000 is down after reboot. It does not write to3000. Start with `node serve.cjs`.

Reduced motion remains the developer's original complete still and requests no Rive file. The three bands retain transparent unused areas and the inherited dark raster interior; this revision does not separate that background. No new gesture. Rejected: changing character timing (developer owns pacing); overlaying new HTML lettering (duplicates raster styling); fading the whole scene (contradicts the request).

Static comparison confirms that only caption base opacity and caption position/scale/opacity keys changed in Fox; all other XML is identical. Evidence: `OUTBOX/HIW_CAPTION_HOLD_20261105/SOURCE_CHECKS.json`. Normal and slow three-cycle caption checks and reduced-motion capture are complete (see validation below). No watermark is visible in inspected review stills. Cross-canvas reset alignment, independent QA and Lu's visual review remain pending. Port3000 is unchanged.

The prepared `capture.cjs` must run through harness-core test-lock with `REVIEW_OUT` pointing at a new directory. It refuses to start at five-minute load≥30. It samples the actual Fox canvas caption crop on each animation frame for three restart boundaries at1440 and390, requiring a visible caption and max channel difference≤1. Reduced mode asserts zero Rive requests. Slow review uses the same copied developer script with a test-only route substitution (SPEED0.5/HOLD8), preserving the source8.6s restart point while slowing Rive time4×; CDP stays at1 because Rive also reads document.timeline.currentTime. This substitution is never written into the normal controller. Slow mode is diagnostic, not a production timing change.

## Recording gate updated 2026-11-05

PM event `9c836aeddc6ac7821b8c98dff45ba0132a6154e2de71798ae560a11f23999ec4` supersedes the old load10 limit: index work may record below five-minute load30, through the global test lock. `frame-quality.cjs` uses timestamped Chrome frames within declared moving intervals only. Output target is30fps (33.33ms budget); a gap above50ms counts as a stall, and missing slots are estimated as round(gap/budget)−1. Either estimated missing-slot rate or long-gap interval rate above5% marks `load-affected`; such a movie is not a deliverable and must be recorded again once. Static/reduced intervals are explicitly marked static because Chrome need not emit duplicate still frames. Counts, windows and raw timestamps are retained alongside each movie. The recorder requests every Chrome screencast frame;30fps encoding does not by itself prove30 unique frames per second.

## Validated delivery, 2026-11-05

Recorded at HEAD `07a9da5972eff0a22c56a3153df924fb41f895d3` with this working-tree revision; `validation/SOURCE_MANIFEST.json` identifies the actual files, not the old HEAD binary.

- Final normal1440: FINAL_R4, three restart boundaries,783 caption samples, max channel difference0; recorded intervals4308.1–4312.5ms. Moving-window estimated missing frames0%, long gaps0%, no page/Rive errors.
- Final normal390: FINAL_R3, three restart boundaries,774 samples, max difference0; intervals4309.9–4317.6ms. Missing frames0%, long gaps0%, no page/Rive errors.
- Reduced1440: FINAL_R3, playing=false, zeroRive requests, original static fallback visible.
- Slow1440 diagnostic: RECOVERY_R2, three boundaries and3073 samples, caption difference0; missing frames1.05%. Its test-lock load lines were not retained, so it is supplementary evidence only.
- Rejected FINAL_R3 desktop movie:25% estimated missing frames, retained with its failure log. The required one-time repeat FINAL_R4 passed; do not use the rejected desktop movie.

Global test lock: FINAL_R3 start01:45:55 load6.26/8.22/16.61, end01:46:57 load11.05/9.24/16.37, exit1 for desktop frame quality; FINAL_R4 start01:47:15 load10.37/9.17/16.22, end01:47:48 load9.00/8.92/15.84, exit0. Raw logs and reports are in validation/. Timestamps are local Europe/Zurich.

This proves caption continuity on the reviewed copy, not same-frame resets across all three canvases. Developer must combine the Fox asset and approved JS patch in their integration copy, record1440/390 two rounds, then QA recheck cross-canvas/bulb alignment before Lu approval. Safari, real-device behavior and background-tab behavior were not tested here. Existing dark raster interior remains; only unused areas are transparent.

`rive doctor` passed the relevant local build checks (update/mobile-tool warnings only). Existing rebuiltFox reports zero errors/warnings. `pnpm install --frozen-lockfile --ignore-scripts` and `git diff --check` passed. No application code,3000 assets, design-system or inputs changed. Project design-system/README.md is absent from this worktree; existing original pixels were retained.

Normal recordings: [1440](https://buzz-wwbf.srv2056990.hstgr.cloud/media/3387264f1e7a96a11afdef797effd18b1ccbc886459f9f158c2400f24f568edb.mp4), [390](https://buzz-wwbf.srv2056990.hstgr.cloud/media/10734bd1fbdcd3e42bada147197cfde6caa8aa537fcf307c265a40c6661cfc4a.mp4). [Current still](https://buzz-wwbf.srv2056990.hstgr.cloud/media/d089f6bd28fe6eea1fe1c52588f9ce7883b2d9b905544bd31dae325ebfcb7042.png).
