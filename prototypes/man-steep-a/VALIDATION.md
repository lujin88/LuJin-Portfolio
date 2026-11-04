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
