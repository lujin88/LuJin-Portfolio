# WA R8 — line candidates and two review proposals

Request: Buzz `d69af728a72eb0c05bf974923a41e9599aa8da1885194dfc4bf9616c9bffefc2`, resumed by `cbc60da1cac447ba6a7344c0ca3be87c8ae02d3bbb02a5ccb33f89e539d0669e`. Isolated review; no production integration. Lu's intended line remains unconfirmed.

Start the parent `serve.py` on 4687. Review `/motion-r8/scene.html?option=A` or `?option=B`.

R7's twelve thin sun rays fade in over 700ms and then hold. The rain drops already fall. The numbered audit covers fish texture, church outlines, thin rays, original thick sun petals, rain drops, cloud contours, coat seams, hat knit lines and audio/control lines. See `RESEARCH/WA_LINES_R8_AUDIT_20261105.md` in the shared workspace for each reason.

Only the thin rays change in these proposals. A moves all twelve rays radially 0→36→0 source pixels over 1600ms, opacity 1→0.6→1. B moves them outward then returns while dim, 1800ms with 100ms stagger. Both use ease-in-out; original artwork, colors, native sun and ground shadow remain fixed. R7's 700ms group entry and 400ms exit remain. Leaving returns each ray from its current transform in 250ms ease-out; re-entry cancels that return. These are requested review proposals, not approved design-system values; this worktree has no `design-system/README.md`, `tokens.json` or `motion.md`.

Frequency: occasional portfolio exploration. Purpose: explain radiating sunlight. Text, reading order, labels and audio controls do not move. Fine mouse hover only; keyboard/touch retain stills. Reduced motion, hidden page and offscreen cards cancel movement. Reduced-motion image: `../assets/vocab-sun.webp`, the original transparent still. No new Rive file, state or developer input. Editable source is `line-options.js`, importing the existing R7.

Rejected: animating every contour (distracts from identifying objects); rotating the sun/shadow (breaks spatial consistency); pulsing speaker strokes on hover (falsely signals playback); adding rain lines (unconfirmed and changes the artwork).

Run `capture.cjs` through harness-core `scripts/test-lock.sh`, with a fresh `REVIEW_OUT`, only when the five-minute load average is below 30. It checks R7 static rays, A/B moving rays, card bounds, original-still restoration, interrupted hover, live reduced motion, then records normal/4×-slow/reduced at 1440×900. The recorder moves the pointer off the card before navigation: navigation preserves pointer coordinates and otherwise can miss `pointerenter` after async SVG installation.

Pre-restart captures failed and are not acceptance evidence. Browser evidence is now recorded below; independent visual review and direction selection remain pending. No watermark or generation service is involved. No new mobile gestures; phone audio/tap behavior and Safari are not yet verified.

## Recording gate updated 2026-11-05

PM event `9c836aeddc6ac7821b8c98dff45ba0132a6154e2de71798ae560a11f23999ec4` supersedes the old load10 limit: index work may record below five-minute load30, through the global test lock. `frame-quality.cjs` uses timestamped Chrome frames within declared moving intervals only. Output target is30fps (33.33ms budget); a gap above50ms counts as a stall, and missing slots are estimated as round(gap/budget)−1. Either estimated missing-slot rate or long-gap interval rate above5% marks `load-affected`; such a movie is not a deliverable and must be recorded again once. Static/reduced intervals are explicitly marked static because Chrome need not emit duplicate still frames. Counts, windows and raw timestamps are retained alongside each movie. The recorder requests every Chrome screencast frame;30fps encoding does not by itself prove30 unique frames per second.

## Completed review evidence

A and B normal/4×-slow/reduced captures completed across two locked runs. All four moving recordings show0% estimated dropped slots and0% long-gap intervals in the declared hover windows; reduced captures retain a still. Card bounds unchanged; restored still RGB difference A0, B≤1/255. Interrupted hover and live reduced-motion assertions passed. Browser before/active frames inspected; original sun/shadow remain fixed and no watermark is visible.

The first run completed A, then failed B setup because reduced motion from A was still enabled. The recorder now restores normal media before each option; B's complete rerun passed, with0 page errors. A's page-error counter was not serialized before that earlier failure; do not infer a full A console audit. Both runs used unchanged runtime sources recorded in `validation/RUNTIME_MANIFEST.json`.

Locks:01:33:59 load7.38/24.05/30.10 →01:35:06 load5.15/19.87/28.04, exit1 (A pass/B setup failure);01:36:14 load4.58/16.86/26.31 →01:37:15 load4.70/14.56/24.75, exit0 (B). Frozen offline pnpm install, JS syntax, whitespace and full decoding of all six metadata-clean movies passed. No package test script exists; this is the complete A/B prototype motion matrix, not a production-site acceptance test.

[A_NORMAL.mp4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/a39e2684c714e4a8ea654839ef5997d049f8a10ad48be23d74ed8a18caa2302e.mp4) | [B_NORMAL.mp4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/8a6a177f21f001ae81dd7bb4445b63209539be011c157f4b5a3b5ae24a1f9db0.mp4) | [A_SLOW.mp4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/68b0b4e14c725e1cc8dbfaa59b55ce78d73bc91eeff89325b899a00af17f051c.mp4) | [B_SLOW.mp4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/4b41748eb97b40ece7437f83282b71f6e9cbeba8a6338df93d41e9b5d1026bd9.mp4) | [A_REDUCED.mp4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/811c09016bf261557359e50cdd2e5f0d85dca852bae236cd475868386b97db20.mp4) | [B_REDUCED.mp4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/626f6d9a26e0a44ecb0d768adcd1cd392e272e2b37800631ee4e38892be88758.mp4)
