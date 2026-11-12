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
