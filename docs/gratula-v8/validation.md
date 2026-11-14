# Author validation — 12 November 2026

Haiku test-runner passed frozen pnpm installation, production build, TypeScript (`tsc --noEmit`), `git diff --check`, three-width screenshot checks and `scripts/check-gratula-v8.mjs`. Tests ran against the exact application and static-prototype files in this commit; only this evidence note was added afterward.

Both `/lab/party-planner` and `/lab/party-planner/gratula.html` passed at 390, 700 and 1440 px. Assertions cover runtime errors, horizontal overflow, image decoding, continuous section paint, translucent cards, reduced motion, CTA route, exact supplier names/prices/source links, query date, non-affiliation disclosure and approved decoration size. A normal-motion 390 screenshot was captured as an additional author check.

The author inspected full-page and supplier screenshots for desktop and mobile. The approved decoration stays out of the supplier list, and restrictions remain readable. `screenshots/` contains the live before capture and the three after captures. Independent QA, legal and visual QA remain pending; keep `hold`.

```text
[test-lock] 开始 14:04:57 负载 7.45 9.00 8.95 排队 213 秒
[test-lock] 结束 14:05:16 负载 7.20 8.87 8.90 退出码 0
[test-lock] 开始 14:08:53 负载 6.07 7.28 8.19 排队 212 秒
[test-lock] 结束 14:09:03 负载 7.69 7.59 8.29 退出码 0
```

Full command logs remain at `/tmp/gratula-v8-validation/final-*.log`; author screenshots and metrics are at `~/.buzz/OUTBOX/DEV_GRATULA_V8_1112/`. Browser checks used installed Google Chrome through the shared test lock. `scripts/verify.sh` is absent in this repository, so the explicit build/type/browser checks above were used.


## Google Maps replacement — 13 November 2026

Real Google Maps source replaces the unverified embedded raster. The prototype uses a local PNG with `object-fit: contain` and square bottom corners to retain the complete logo and footer. `screen-step-5.png` was recaptured at 786 × 1672; all three current after-review screenshots were refreshed. PM #10336 subsequently rejected this first capture: the footer covered the lower part of the Google Maps logo. Its claim of complete attribution was incorrect and is superseded by the revision below. Independent legal and visual review are still required.

The correct branch preview is **http://localhost:4635/lab/party-planner**. Port 4622 now belongs to a different worktree; it was left running.

Haiku test-runner passed the corrected capture script, existing `scripts/check-gratula-v8.mjs` with `BASE_URL=http://localhost:4635`, `pnpm install --frozen-lockfile`, and `git diff --check`. Both live page and static prototype passed at 390 / 700 / 1440 with no runtime errors, horizontal overflow or broken images; source image dimensions and full-image fit were asserted. The original approved five-confirmed/three-waiting demo state was preserved in the capture fixture. No full build, TypeScript rerun or WebKit check was run for this static image/HTML change.

The initial attempt is invalid: temporary-script module resolution failed, then the old port timed out. Its generated PASS summary incorrectly captured shell status. A subsequent capture stopped correctly on a four-versus-five demo guest fixture mismatch; the fixture was corrected before the successful run below. None of those failed runs counts as passing evidence.

```text
[test-lock] 开始 00:20:46 负载 7.04 7.27 8.13 排队 0 秒
[test-lock] 结束 00:21:02 负载 7.21 7.29 8.12 退出码 0
[test-lock] 开始 00:21:06 负载 7.21 7.29 8.12 排队 0 秒
[test-lock] 结束 00:21:14 负载 7.11 7.26 8.10 退出码 0
```

Reproduction script, checked metrics and original command logs: `/Users/lu/.buzz/OUTBOX/GRATULA_GOOGLE_MAP_1113/` (`capture-and-check.cjs`, `capture-fixed.log`, `check-fixed.log`, `install.log`, `checked-metrics.json`). The original `validation-summary.json` there is explicitly superseded by `INVALID-FIRST-RUN.md`.


## Attribution clearance revision — 13 November 2026, PM #10336

The map was recaptured at the original 345 × 180 CSS px / DPR 2. The native logo artwork, colors and size are unchanged; only its DOM position was moved upward 13 CSS px to clear the wrapped footer. Recorded bounds put the logo bottom at y=148 and the footer top at y=154. The author visually inspected the new source, generated phone and 390 px page section: the entire Google Maps logo and two-line attribution are visible. This is development verification, not legal or visual QA approval.

Regenerated the actual party-day screen (five coming / three waiting), all three full-page review screenshots and all six live/static party-day section screenshots. OUTBOX/screen-step-5.png is now byte-identical to the product asset; the stale welcome capture is no longer used. The local capture entry point now uses the verified fixture and requires the visible party-day heading before saving.

Haiku test-runner: frozen install passed; the refreshed capture/assertion run passed live and static prototype at 390 / 700 / 1440 px, with no page errors, horizontal overflow or broken images. It also asserted source dimensions, contain fit and square bottom corners. No new full build, TypeScript or WebKit run for this raster-only product change. The pre-existing next-env.d.ts modification is excluded.

```text
[test-lock] 开始 00:30:58 负载 4.29 6.65 8.18 排队 0 秒
[test-lock] 结束 00:31:11 负载 4.07 6.49 8.10 退出码 0
[test-lock] 开始 00:31:36 负载 3.28 6.11 7.92 排队 0 秒
[test-lock] 结束 00:31:45 负载 3.38 6.04 7.87 退出码 0
```

Evidence: OUTBOX/GRATULA_GOOGLE_MAP_1113/{map-recapture-final.log,map-attribution-bounds.json,capture-revision.log,checked-metrics.json,install-revision.log,review.html}. Earlier wide-viewport captures were exploratory and are not the shipped source.


## Native wide-viewport revision — legal #10381 / PM #10384

The 00c0e4b logo translation was rejected by legal and is superseded. Recaptured the same Google Maps URL at 690 × 360 CSS px, DPR 2 (1380 × 720 raster), with **no change to the native logo position, size or colors**. The capture asserts that its bounding rectangle is identical before and after hiding non-map UI. Native logo bounds: x=292.5, y=319, width=105, height=22; footer top=347, giving 6 CSS px native clearance. Author inspected the source and generated step 5: Belvoirpark is unobscured, logo and footer are complete.

The existing MAP_IMG reference and both page variants consume the replacement raster; no HTML change was needed. Regenerated product/OUTBOX step 5, all three full-page review images, and six live/static section images. Updated source hashes. The wider source is scaled down within the existing phone map, so attribution text is smaller than in the rejected narrow capture; final displayed readability remains for legal/visual QA to assess.

Haiku capture/assertion checks passed at 390/700/1440 for live and static pages, with expected 1380 × 720 source, contain fit, intact bottom corners, no runtime errors, overflow or broken images. Frozen-install pass from this session remains applicable: package.json and pnpm-lock.yaml are unchanged. No build/TypeScript/WebKit rerun.

```text
[test-lock] 开始 00:37:36 负载 4.28 4.45 6.46 排队 31 秒
[test-lock] 结束 00:37:53 负载 5.30 4.66 6.50 退出码 0
[test-lock] 开始 00:38:40 负载 4.32 4.50 6.33 排队 0 秒
[test-lock] 结束 00:38:48 负载 4.29 4.49 6.32 退出码 0
```

Evidence in OUTBOX/GRATULA_GOOGLE_MAP_1113/: recapture-native-wide.cjs, wide-native-page.png (before hiding overlays), google-maps-native-wide.png, map-native-wide-bounds.json, native-wide-source.log, native-wide-validation.log, checked-metrics.json, review.html. Legal approval is pending.


## Readable HTML attribution — PM #10401 / #10420

Added exactly “Map data ©2026 Google” beside the clickable prototype map and beneath the step 5 stage on the live and static case pages. It uses existing body-caption styling, measured at 15 px on all three surfaces at 390 / 700 / 1440, equal to adjacent explanation text. The Google Maps source remains byte-identical to 1cba5ea (SHA-256 in assets.md). Refreshed the phone, three full-page review images and six live/static party-day images; updated hashes.

Haiku test-runner passed the nine attribution checks (exact text, visibility, font size and overflow), real phone recapture and live/static three-width image/runtime checks, frozen pnpm install, and diff check. Author inspected the mobile finale screenshot: the external HTML attribution is legible independently of the reduced phone image. No build, TypeScript or WebKit rerun for this three-line HTML/JSX change. Independent legal/QA/visual review remains pending; hold stays. The pre-existing next-env.d.ts change is excluded.

Evidence: OUTBOX/GRATULA_GOOGLE_MAP_1113/{review.html,verify-attribution.cjs,attribution-verification.json,checked-metrics.json,html-attribution-baseline.log,html-attribution-verify.log,install-frozen.log}.

```text
[test-lock] 开始 00:47:59 负载 5.12 4.33 5.25 排队 30 秒
[test-lock] 结束 00:48:00 负载 5.12 4.33 5.25 退出码 0
[test-lock] 开始 00:48:02 负载 4.87 4.30 5.23 排队 0 秒
[test-lock] 结束 00:48:11 负载 5.13 4.37 5.24 退出码 0
[test-lock] 开始 00:48:12 负载 5.13 4.37 5.24 排队 0 秒
[test-lock] 结束 00:48:21 负载 8.23 5.05 5.47 退出码 0
```

The existing `scripts/check-gratula-v8.mjs` regression also passed both live/static routes at all three widths. The first queued attempt ended before execution and is not a pass; `html-attribution-regression.log` is the completed run.

```text
[test-lock] 开始 00:54:18 负载 4.52 5.12 5.48 排队 137 秒
[test-lock] 结束 00:54:27 负载 6.10 5.43 5.58 退出码 0
```


## Privacy design-intent revision — PM #11330 (13 November)

Applied the A wording from `GRATULA_PRIVACY_COPY_ROW29_1112/copy.en.json`, including the revised guest-separation sentence accepted by legal #10594. The live story and static landing now name design intent, invited co-editors, guests' own replies and planned removal of guest replies 30 days after the party date. The linked prototype FAQ and RSVP hint use the same approved wording. Alt text identifies prototype examples. No access or deletion implementation was changed.

Source inspection found no remaining old host-only/phone/absolute deletion strings in the party-planner page and prototype sources. The allergy and reply crops were visually inspected: neither contains host-only or deletion promises; Mia/Nuts and Elias/Lactose match the prototype's demo fixtures. The allergy crop still describes demo cake suggestions; this update does not certify production recommendations. Pip, map assets and animations are unchanged.

Lu #11414 and PM #11417 authorized Codex test-runner for this PR on 13 November, replacing the exhausted Haiku runner. The authorization blocker is resolved. Codex tested source commit `e80517c5058c8661b90a5c8632202be207fe59c0` through the shared test lock against this worktree's preview on port 4635; the follow-up commit changes only this validation note.

Frozen pnpm installation, diff check and `scripts/check-gratula-v8.mjs` passed. Both live and static pages passed the updated privacy assertions at 390/700/1440. Additional checks passed privacy-card horizontal/vertical fit, page overflow, FAQ expand/collapse with approved wording, RSVP No hiding the dietary hint and Yes restoring it, and name input enabling Send reply. No page errors were observed. Fresh full-page, privacy-card, FAQ and RSVP screenshots were captured for all three widths; earlier screenshots are not evidence for this revision.

Evidence: `/Users/lu/.buzz/OUTBOX/GRATULA_175_CODEX_1113/` contains `REPORT.md`, `browser.log`, `install.log`, `metrics.json`, `source-version.json`, `check.cjs` and screenshots. Source hashes identify the tested files. Headless installed Google Chrome used viewport height 900 and reduced motion.

```text
[test-lock] 开始 16:39:21 负载 8.59 5.55 4.03 排队 0 秒
[test-lock] 结束 16:39:54 负载 7.60 5.66 4.13 退出码 0
```

Limits: FAQ/RSVP views were entered through the prototype's existing `A.go` state navigation before exercising real DOM clicks and input; the complete journey from the welcome screen was not tested. No new production build, TypeScript, lint, WebKit, normal-motion, text-zoom or production access/deletion checks were run. Legal approved the wording at e80517c; independent QA/visual review and current-HEAD acceptance remain pending. Keep `hold`. No product code, artwork, Pip or map changes were made by this validation follow-up. The pre-existing next-env.d.ts change is excluded.
