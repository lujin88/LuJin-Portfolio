# Arrow pre-entry residue correction

Replaces the visual conclusion from 93b2fcd for the pre-arrow frames. QA found three dark horizontal bars at 153/193ms; the earlier direct-scrub screenshot did not cover those frames.

The generator now restores a continuous cloud boundary instead of selecting a backdrop color independently on each stroke scanline. The full-page preview also applies its existing edge gradient to the composed plane once, rather than independently fading overlapping canvases and revealing the original arrow in the layer underneath. Runtime, animation timing and production files are unchanged.

## Validation

- Fox Rive compilation: zero errors/warnings.
- Real playback sampled at 0–300ms in 20ms increments. To avoid initial-render frame jumps, the real WAAPI clock runs at 0.1x and is paused after the first rendered frame crossing each target. The test never assigns currentTime or calls the Rive scrub API. Actual times are recorded in SAMPLES.json; largest overshoot 1.67ms. All 16 pages had zero errors.
- Inspected the 16-frame contact sheet and baseline/old/new comparison: no horizontal bars or underlying faint arrow arc before entry. From about 200ms the intended arrow pop begins. This is a visual background comparison, not a claim of pixel identity to the original always-visible arrow.
- 1440 and 390 natural-play smoke: reduced motion pauses immediately, remains stable for 150ms, resumes afterward; zero page errors. Existing independent 210-second long-play QA covered the unchanged runtime.
- Capture under test-lock: 17:59:08–18:00:52, load 2.14/3.32/4.45 → 5.06/4.05/4.60, exit 0. Smoke 18:00:54–18:01:32, load 4.90/4.03/4.59 → 4.70/4.07/4.59, exit 0.
- pnpm install --frozen-lockfile passed. Safari/physical devices not tested. Pending independent QA and Lu approval.
