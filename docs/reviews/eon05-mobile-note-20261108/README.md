# E.ON 05 mobile annotation

PM assignment: #lu-portfolio #551. At 390px, “Finding these details takes time” is positioned relative to the floor plan, beyond the viewport's right edge and behind the roof-pitch card's stacking context.

Below 768px the translated note now occupies normal document flow above the collage. It is static and reserves space as English or German wraps. At desktop widths the existing positioned note, arrow and reveal remain. CSS display selects one visible/accessibility-tree copy at a time; no copy or image assets change.

Motion decision: no new animation. Reject moving the note during reading (function); reject raising z-index alone (still clips and overlays the image); reject shrinking the handwriting to fit the old position (readability). No new timing or curve. No new gestures.

Before image: research's production audit, 2026-11-08, 390px. After image: local branch at 390px. These screenshots have different framing; compare the first handwritten note relative to the roof-pitch image.

Validation results and remaining limits are recorded in the PR. Safari and physical devices are not tested. The existing E.ON base stylesheet has html min-width:360px: 320px viewports therefore retain page-level overflow outside this fix; the note itself fits. Only Lu merges this design change.

Checks: frozen install, tsc --noEmit and diff --check passed. Eight browser cases: 320 EN normal; 390 EN normal/4×slow/reduce; 390 DE normal/reduce; 767 DE normal; 1440 EN normal. Each has exactly one visible note and no page errors. Mobile note bounds remain inside the viewport and do not intersect either image. 320 retains the known global 360px minimum; other tested mobile widths have no document overflow. Existing desktop reveal is preserved; no claim of pixel-identical desktop rendering.

First run stopped on the pre-existing 320px document-width assertion (14:40:38–14:40:47, exit 1); inspection traced it to the existing html min-width. Revised run records page width separately, while continuing to assert annotation bounds/overlap and errors: 14:41:07 load10.30/10.83/10.60 →14:41:43 load15.79/12.19/11.11, exit0. Full recordings/scripts: motion/.motion-review-20261108/eon05/verified/. CDP slow playback applies to CSS animation; the new mobile note is intentionally static.


Evidence storage: PNGs and results.json are preserved on `backup/eon05-review-20261108` at `3b7698f`, not included in this PR final tree. [Screenshots and raw results](https://github.com/lujin88/LuJin-Portfolio/tree/backup/eon05-review-20261108/docs/reviews/eon05-mobile-note-20261108). Source implementation is unchanged by this evidence-only follow-up.
