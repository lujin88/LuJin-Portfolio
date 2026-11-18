# Client Advisory section seams

Task: row 6, PM #9834/#9848/#9859 in #lu-portfolio, thread #9815.
Branch: `design/ca-seams-main-1112`, based on main `af1017a`.
This is a local review candidate; PM requested QA/visual QA before pushing.

## Changes

- 02→03: fade the mandate atmosphere before its bottom edge; fade the advisor photo in from the existing background.
- 03→04: fade the photo and tint together at the bottom and, on desktop, at the right edge. The section ends at `#070e1a`, matching 04. Remove the unused joinFloor CSS; its JSX node is already absent from main.
- 04→05: start 05 at 04's final `#06101f`; place 05's decorative glows in a masked pseudo-element beneath the content.
- 05→06: fade 05's bottom glow out and 06's top glow in over 6rem. Both sides then meet at the existing base colour across the full width. No guessed solid colour or new global background override is needed.
- 06→07: retain main's existing outcome glow mask.

This ports the relevant static seam treatment from PR #168 onto current main without replacing the later CA03 advisor media. No copy, image, video, confidentiality flag, section spacing, sticky height or motion logic changes. Four runtime files change: three CSS modules and the decorative background class in `concept-scroll-story.tsx`.

No `ARCHITECTURE.md` exists in this checkout. Ownership was traced through the current session imports. The previous seam PR and recent CA03/media commits were inspected before modifying the local candidate. There is no new module or component.

## Validation and review

Haiku test-runner passed production build and `pnpm exec tsc --noEmit` for the final source. Logs and the final before/after report are in `/Users/lu/.buzz/OUTBOX/CA_SEAMS_MAIN_1112/v3/`.

The earlier draft passed geometry/error checks but still showed a phone 05→06 colour step. Its screenshots and the intermediate v2 are retained as history, not accepted as final seam validation. The v3 browser check adds pixel samples immediately above and below that boundary at three horizontal positions on 390/700 widths, in addition to the existing Chrome/WebKit 390/700/1440 comparisons of geometry, text, advisor media presence, overflow and page errors.

Final v3 result: 12 route/engine/width/phase cases, 60 screenshots, zero failures. Six section geometries and text content match the baseline in each after case. At the three sampled 05/06 positions, Chrome's maximum RGB-channel step is 0 at both 390 and 700px; WebKit's maximum is 1 at both widths. The baseline maximum was 16. This is a targeted boundary measurement, not a whole-page visual score.

```text
[test-lock] 开始 22:24:25 负载 5.33 5.40 4.75 排队 0 秒
[test-lock] 结束 22:25:01 负载 4.98 5.32 4.75 退出码 0
```

Review links: baseline `http://localhost:4626/client-advisory`; revised `http://localhost:4625/client-advisory`; final comparison `/Users/lu/.buzz/OUTBOX/CA_SEAMS_MAIN_1112/v3/review.html`. Static screenshots use reduced motion for matching positions; they are developer evidence, not independent visual approval or a full motion audit. Final source hashes accompany the report.

QA and visual QA must review this candidate. It touches `ca/`, so legal must review the eventual PR HEAD. The old PR #168 sign-offs do not cover this revision. Nothing has been pushed, merged, deployed or synced to port 3000 for row 6.
