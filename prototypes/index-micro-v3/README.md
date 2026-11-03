# Advisor V3 / solar V2 local review

Open `PREVIEW.html?scene=advisor` or `?scene=solar`. This isolated preview uses the current home scene at a 1440×900 viewport; no app entrypoint imports it. Editable source is `motion.js` and `PREVIEW.html`, with source photographs in `assets/`.

Advisor V3 addresses PM feedback in Buzz event `df1ad307410b8a0ab600656bc597e229af06fc0020824c3048b18bbd17648d5a`: existing water reflections move horizontally in the first second, while existing city lamps brighten and dim. The water uses a masked copy of the original photograph, with no generated or drawn light elements. Person, camera and composition stay fixed. Masks feather at the boundaries. Only opacity and transform animate; exposure filters are constant.

The 8-second cycle peaks early, returns to the unchanged baseline by 6 seconds and holds for 2 seconds. Reduced motion hides all overlays and pauses animations; `assets/ADVISOR_BEFORE.jpg` is the still fallback. Hidden tabs and offscreen scenes pause. Review-only controls: `window.micro.setTime(ms)`, `replay()`, `setBefore(boolean)`. There is no Rive rig or production input contract; developer integration is pending.

Solar retains the V2 house and motion submitted to PM on 2026-11-03, awaiting Lu's color decision. Reference and generation evidence are in `OUTBOX/INDEX_MICRO_MOTION_20261103/V2/` in the Buzz workspace. The copied legacy `GENERATION.json` describes V1 only; V2 generation is recorded in `SOLAR_GENERATION_V2.json`. V3 advisor is local only, with no generation cost.

## Verification

`OUTBOX/INDEX_MICRO_MOTION_20261103/V3/FINAL/` holds normal-speed, quarter-speed and reduced-motion browser recordings, a rendered 81-frame scan in 100 ms steps, comparison and check results. `RECORD.cjs` is the exact recording/check script. Normal video is real browser playback; the comparison samples the same timeline deterministically, so it is the largest sampled change, not a claim about all video frames.

The first V3 capture under `V3/` had stale/out-of-order screencast frames and inconsistent dimensions. `V3/VERIFIED/` was a visually rejected intermediate with excessive exposure. Neither is delivery evidence. Only `V3/FINAL/` corresponds to this final source.

`record.cjs` remains the portable preview capture helper. Run browser scripts via harness-core `scripts/test-lock.sh`, using installed Chrome. `rive doctor` succeeded; no Rive build was required. Project root AGENTS.md and harness-core motion rules were read. This checkout has no `design-system/README.md`; source imagery and shell styles are preserved rather than introducing tokens.

## Design boundaries

Purpose: requested ambient motion on an occasional portfolio visit. Reading and controls remain stationary. Rejected: facial/hand motion (identity), camera drift (composition), additional objects or lights (scope), moving text and metrics (reading). No mobile gestures to test. This preview omits site navigation and falls back to system fonts when Poppins is unavailable.

Pending: PM visibility review, Lu's acceptance, independent visual QA, mobile layout review and developer integration. No merge or deployment.
