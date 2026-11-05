# MAN A: compact ending and title alternatives

Review-only integration patches against QA's spacing-only preview on port 4811. Apply exactly one patch: `MAN_A_R2_A.patch` removes the repeated stage statement; `MAN_A_R2_B.patch` removes the same statement from the following body section. Both include the full motion insertion and replace the old MAN_A_INTEGRATION.patch. Do not apply them over that old patch or over each other. Neither modifies case.css. BASELINE.json identifies the exact inputs.

The editable A/ and B/ folders contain the three target files. They map to app/man-truck-bus/ in the developer's integration copy. The review server uses /man-truck-bus for A and /man-review-b for B; that alias is not part of either patch. The live 3000 site is unchanged.

## Ending geometry

The provenance note now participates in document flow, followed by 96px padding. The sticky stage ends there instead of reserving the unused bottom of a full viewport. The board and scattered cards retain the original 680–1000px scene coordinates. A normal-flow pseudo-element supplies the separate min(80vh, 900px) scroll distance. JavaScript reads the board top to recover scene height while calculating progress from the actual trimmed stage height. No layout values change during scrolling. Transform and opacity are still the only animated properties.

A removes the stage statement node entirely and promotes the final assembled heading to h2, preserving the section's accessible name. B keeps the stage statement and removes the body heading wrapper. The statement therefore occurs once in either version, including static/reduced-motion layouts.

The existing four screenshot crops, colours, fonts, native reversible scroll input, breakpoint at 1001px, and reduced-motion/no-JavaScript fallbacks are retained. This is a web integration prototype, not a Rive asset; no Rive build or runtime input was introduced. Project/worktree design-system/README.md is absent; existing MAN styling is the source.

## Validation

Run check.cjs then record.cjs, console.cjs and extra.cjs through harness-core/scripts/test-lock.sh, setting TEST_LOCK_CHANNEL and MAN_REVIEW to a new evidence directory. Installed Google Chrome is used. The recording script captures A/B × 1440/1024/390 × DOWN/UP: 12 separate normal-speed videos. Input is simulated native wheel, not physical hardware. check.cjs also checks 1440×1000, runtime reduced motion, no JavaScript, and original /index navigation followed by Back.

Full-tree TypeScript checks on the QA baseline and modified copy report the same 10 diagnostics outside MAN; that is not a passing project typecheck. Patch application and script syntax checks pass. Geometry, title count, overflow, runtime reduced motion, no JavaScript and original /index navigation checks passed on the isolated Turbopack preview. Both variants measured 120px at 1440×900/1000, 120.39px at 1024×768 and 66px at 390×844 (DOM edge gap). Console/page errors and HTTP failures were zero in that run. All 12 normal recordings are complete; see REVIEW.md for links. Screenshot pixel gaps are 129/129/130px, below 150px; see the external evidence directory OUTBOX/MAN_R2_20261105_249a and current WORK_LOGS/MAN_R2_20261105_249a.md.

The first browser attempt was blocked by the shared lock. The first actual browser run retained a /index manifest/500 failure under Next's webpack dev server. A screenshot before hydration also caused a caret-style mismatch; the capture script now waits for motion setup and preserves caret styling. These failed runs are retained. The isolated preview now uses Turbopack with local APFS copies of dependencies/public/assets. Both /index and its client navigation respond successfully; no application-route change was needed. A failed intermediate Turbopack run with external asset symlinks is also retained.

No tests are declared in the supplied package.json. Safari and physical phones remain untested. Phone check: scroll through the MAN case and back; four fields stay static, readable, and within the viewport. No custom gesture is added.

## Deliberate limits

- Hero and navigation remain stable to protect reading and orientation.
- No additional looping or per-section reveal effects: one assembly explains the relationship.
- Static mobile layout avoids squeezing scattered fields into a narrow viewport.
- Neither alternative is selected for production; PM takes A/B evidence to Lu, then QA reviews the chosen patch.

Recording prerequisite on this Mac: `PLAYWRIGHT_BROWSERS_PATH=/Users/lu/.buzz/.scratch/man-249a-r2-tools` points at a private ffmpeg-1013/ffmpeg-mac link to the installed system ffmpeg. No browser was downloaded. MP4 delivery copies clear encoder/handler metadata with bitexact flags; map_metadata alone was insufficient for the relay.
