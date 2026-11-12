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

Real Google Maps source replaces the unverified embedded raster. The prototype uses a local PNG with `object-fit: contain` and square bottom corners to retain the complete logo and footer. `screen-step-5.png` was recaptured at 786 × 1672; all three current after-review screenshots were refreshed. The author inspected the phone image and mobile page; Google Maps / Map data ©2026 Google remain present and readable in the source phone image. Independent legal and visual review are still required.

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
