# MAN A prototype validation — 2026-11-04

These checks cover the standalone prototype working files, not the main Next site or a deployed build. Source capture and fixture provenance are in SOURCE_MANIFEST.json. Review directory: `/Volumes/Extreme SSD/agent-scratch/man-steep-a-review-20261104/`.

- Chrome 1440, 1280, 1024, 768, 390: document horizontal overflow 0px; console errors 0; failed HTTP responses 0.
- Hero logo top positions: 150.39 / 140.80 / 125.44 / 98 / 98px respectively, preserving the new header spacing.
- Pixel comparison between captured live hero and prototype hero: 1440 × 634 and 390 × 670 regions each have 0 changed pixels and maximum RGB difference 0. Evidence: HERO_DIFF.json.
- Reduced motion: no scrubbed class, all four card transforms `none`. Static fallback also checked with JavaScript disabled. No automatic animation loop.
- Forward and reverse statement screenshots generated; the scroll progress can be reversed without waiting for a transition.
- Native 1440 × 1000 recording: normal, 0.25 CDP playback rate plus four-times-longer scroll traversal, and reduced motion. Each recorded with Playwright recordVideo in installed Google Chrome. No sped-up video or generated frames.
- Syntax checks passed for motion.js, build.cjs, record.cjs; git diff whitespace check passed. Frozen dependency consistency check passed (`pnpm install --frozen-lockfile --lockfile-only --ignore-scripts`); no dependencies or lockfile contents changed.

Final browser check load, verbatim:

```text
[test-lock] 开始 18:20:07 负载 4.03 5.32 6.84 排队 85 秒
[test-lock] 结束 18:20:28 负载 4.64 5.35 6.81 退出码 0
```

Successful normal recording:

```text
[test-lock] 开始 18:16:02 负载 3.45 6.69 7.68 排队 0 秒
[test-lock] 结束 18:16:33 负载 5.18 6.81 7.69 退出码 0
```

Successful slow recording:

```text
[test-lock] 开始 18:20:33 负载 4.67 5.35 6.80 排队 60 秒
[test-lock] 结束 18:21:36 负载 6.15 5.62 6.80 退出码 0
```

Successful reduced recording:

```text
[test-lock] 开始 18:19:36 负载 3.56 5.38 6.92 排队 95 秒
[test-lock] 结束 18:20:03 负载 4.03 5.32 6.84 退出码 0
```

Earlier failed attempts are preserved in the review directory, not claimed as passes: CSS inline SVG capture parser (fixed), unusable bundled FFmpeg (used system FFmpeg instead), and an abnormally extended slow recording (terminated; changed capture traversal timing to Date.now). MP4 exports are remuxed with encoder/SEI/container metadata removed for Buzz; original WebM recordings are retained.

Not tested: Safari, physical phone, production integration, full-site menu/language interactions. No independent QA or visual approval is claimed. The prototype remains for Lu's review.


## Timing revision R2 — 2026-11-04

Requested in Buzz 50a63377 and 646ef181: shorten timing only; retain card trajectories, layout, statement styling and the existing body statement. Review evidence is in the external review directory's `R2/`. Checks below apply to the revised working files; the prior section describes the original review.

| Same wheel gesture profile, 1440 × 1000 | Original | Revised |
|---|---:|---:|
| Pinned native scroll distance | 1900px | 800px |
| Measured pinned traversal | 6.4331s | 2.5999s |
| Average speed during pin | 295.35px/s | 307.70px/s |
| Complete unsped video | 16.20s | 10.84s |

The input is synthetic CDP wheel acceleration/inertia, not physical trackpad capture: 420px per pulse, 24 events per pulse, nominal 30ms between events and 140ms between pulses. The same deltas and requested intervals are used in both runs; actual dispatch timings vary with machine load and are retained in OLD_WHEEL.json / NEW_WHEEL.json. Videos are unsped. Pin duration is measured from the first animation frame reaching the section top to the first frame reaching its release point. The prior 15.04s normal video used a different, uniform scroll input and is not the controlled comparison.

- Seven widths (390, 768, 1000, 1001, 1024, 1280, 1440): overflow 0px, page/console errors 0, HTTP failures 0. Reduced-motion transforms remain none; no-JS static fallback passes.
- At viewport heights 740 / 1000 / 1400, progress distances are 592 / 800 / 900px. Both statements remain present in the published prototype. The optional body-statement omission is prepared only in the unserved review file R2/UNAPPROVED_NO_REPEAT.html; it is not part of this PR.
- R2 SCATTER_1440, SLOGAN_1440, REDUCED_1440, AFTER_1440 and AFTER_390 PNG files are byte-identical to their original counterparts (VISUAL_UNCHANGED.json). The final layout coordinates and motion interpolation are unchanged; only progress thresholds and section height differ.
- Both MP4s fully decode without error. Under the recorded machine load, animation-frame gap p95 was 16.8ms new / 16.7ms old, with a maximum ~350ms in both runs. This is timing evidence, not a claim of zero frame drops or physical-device performance approval.
- LaunchAgent com.buzz.man-motion-preview-4698 reports running and prototype.html returns HTTP 200. It starts at login and restarts the server; the external SSD must remain mounted. Full reboot persistence was not exercised.

Browser load logs, verbatim:

```text
CHECK.log
[test-lock] 开始 18:30:05 负载 14.39 10.02 8.20 排队 20 秒
[test-lock] 结束 18:30:39 负载 16.41 11.00 8.63 退出码 0
RECORD_NEW.log
[test-lock] 开始 18:30:40 负载 16.41 11.00 8.63 排队 5 秒
[test-lock] 结束 18:31:13 负载 15.78 11.40 8.87 退出码 0
RECORD_OLD.log
[test-lock] 开始 18:31:14 负载 15.78 11.40 8.87 排队 75 秒
[test-lock] 结束 18:31:51 负载 13.47 11.31 8.93 退出码 0
HEIGHT_CHECK.log
[test-lock] 开始 18:31:53 负载 12.79 11.21 8.91 排队 20 秒
[test-lock] 结束 18:32:13 负载 11.38 10.97 8.88 退出码 0
```

Remaining: Lu timing review, QA/visual review, production integration, Safari and physical-device testing. No production files changed.
