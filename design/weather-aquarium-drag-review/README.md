# Weather Aquarium drag review

Standalone review only. Serve this directory with `python3 -m http.server 3187 --bind 127.0.0.1`, then open `/preview.html`. Does not change the running portfolio on port 3000.

The scene is 1392 × 650 at a 1440px viewport, with 24px page gutters. Smaller viewports scale proportionally. Drag the vertical handle left to right for Spring → Summer → Autumn → Winter; reverse to return. No visible season labels. This preserves the earlier four-zone SeasonPreview behavior, using a 125ms opacity transition rather than moving the landscape. It is not a two-image comparison wipe. The four quarters select four complete images.

Inputs: primary pointer drag or tap, horizontal touch drag, arrow keys (one season), Home (spring), End (winter). Vertical touch movement remains page scrolling. Pointer cancel/lost capture ends dragging. Accessible slider exposes current season to screen readers. Reduced motion disables the opacity transition; the initial spring image is the still fallback, including without JavaScript. No automatic motion, loop, momentum or Rive build.

Sources: `OUTBOX/WEATHER_AQUARIUM_ALIGNED_SEASONS_20261101/{SPRING,SUMMER,AUTUMN}_MASTER.png`; winter is `OUTBOX/WEATHER_AQUARIUM_UNDERWATER_FIX_20261101/WINTER_MASTER_V3.png`. The latter directory contains only the corrected winter master plus composite review sheets, not four individual seasonal masters. All four files were copied byte-for-byte; source art was not changed.

Validation: system Chrome via CDP under harness-core test-lock; real mouse drag spring → winter → spring, all four seasons observed; desktop width 1392; keyboard End/Home/arrows; reduced-motion transition duration 0s; 390px touch simulation returns to spring without horizontal overflow; no runtime exceptions. Recording uses Chrome screencast timestamps, encoded to H.264 at 30 fps. Artifacts: `OUTBOX/WEATHER_AQUARIUM_DRAG_REVIEW_20261101/SPRING_WINTER_RETURN.mp4`, `CHECKS.json`, desktop spring/winter and mobile reduced-motion stills. This standalone HTML has no package test suite; production package code is untouched.

Motion purpose: occasional visitor interaction, immediate state feedback. Rejected: autoplay (distracts from user control), landscape parallax (breaks source alignment), inertial handle movement (delays deliberate selection). No custom motion curve or library is required. Used local animate skill.

Project lacks `design-system/README.md`; references are `docs/portfolio-consistency-guide.md` and existing source art. No design-system files changed.

Remaining: Lu review of the recording; real phone check at this preview URL, drag left/right and scroll vertically, expect season changes only during horizontal gestures. Production integration belongs to the developer after approval. Do not merge this review PR yet.

Final browser check load: `[test-lock] 开始 21:32:24 负载 4.18 2.99 2.10 排队 0 秒`; `[test-lock] 结束 21:32:38 负载 4.60 3.15 2.17 退出码 0`.
