# MAN: retain reading position when reduced motion changes

This follow-up is separate from PR #66. It targets that PR's 819376b revision and changes only the motion component. A/ and B/ contain editable replacements; MAN_REDUCED_A.patch and MAN_REDUCED_B.patch are incremental patches. Apply the matching patch after the full A or B patch from revision-2, never both. No route, CSS, asset or 3000 source change is included.

When the operating-system reduced-motion preference changes, configure captures the old section and visible stage rectangles before changing layout. The section's tall scroll spacer is not the reading surface; using its old scroll position after the section shrinks can put the entire section above the viewport.

- During the sticky animation, switching to reduced motion keeps the static stage at the same viewport top. Switching directly back resumes the stored scrub progress.
- After the stage has begun scrolling away, the boundary to the next content is the reading anchor. It stays at the same viewport position when the section changes height. This also works when B's static stage is taller than the animated sticky stage.
- When the whole section is above the viewport, compensate its height delta so downstream content stays in place.
- When it is below the viewport, retain scroll position. Mobile remains static, so changing the preference does not adjust scroll.
- If the reader scrolls in the static version and then turns motion back on, keep the lower content boundary; animation follows its native progress at the adjusted scroll position. A taller static stage (B at 1024px) can map to a partly completed animation, because its bottom edge cannot fit the shorter sticky stage. Reverse wheel input still follows the native scrub.

The correction is instantaneous. No smooth scrolling, animation of layout dimensions, new state-machine inputs, or new visual timing is added. The reduce media listener is wrapped so resize and width changes do not accidentally request scroll correction. Existing listeners are removed on cleanup.

This is a web integration change, not a Rive build. Project design-system/README.md remains absent; all existing styling and timing are inherited. Initial reduced-motion rendering is unchanged. Scroll correction for width/breakpoint resizing is outside this task.

Validation scripts use installed Google Chrome through harness-core/scripts/test-lock.sh. The check covers A/B × 1440×900 and 1024×768 × 25/50/85%, 390×844, before/after the section, static reading, and the released stage tail. A fixed-delay sampling failure and a static/animated-height mismatch in the first boundary assertion are retained in the evidence. The final algorithm anchors the next-content boundary after leaving the sticky position; tests wait for the media preference and component mode rather than an arbitrary delay. Recordings compare the original 85% toggle with the fixed A/B variants. Safari, real devices, and browser restoration while a preference changes off-page are not covered.

Local previews: http://localhost:4822/man-reduced-a and http://localhost:4822/man-reduced-b. Original #66 previews remain http://localhost:4822/man-truck-bus and /man-review-b.

Originating assignment: Buzz channel 4d529583-4dcf-4804-816e-94f63f30634b, event cabb570ad0c20f756db9dfa687d4500c905c84d80c5e56816f3a80f70b2c86ac. Evidence: OUTBOX/MAN_REDUCED_ANCHOR_20261105_249a/. Independent QA and Lu's A/B choice remain required.

Final verification: all 34 scenario records passed across A/B, 1440×900, 1024×768 and 390×844. Sticky toggles at 25/50/85% returned to the original scrollY; below-section, released-tail and static-reading checks preserved the following content boundary within 0.453px. No console/page errors in the six browser contexts. Final test-lock loads: 2.41/3.05/3.49 → 4.77/3.56/3.65. Recording loads: 3.82/3.37/3.70 → 3.82/3.40/3.69. Full-tree diagnostics remain byte-identical to the #66 run (ten baseline errors).

The 85% recordings were captured before the final normalization of the released-stage branch; they exercise the unchanged sticky-stage path. The final check exercises the delivered byte-matched component sources, including the normalized boundary handling.

## QA follow-up: static-origin round trips

QA found that the original boundary mapping was not reversible at B 1024×768, static section +100px: scrollY 660 → 1078 → 560. A direct static → animated → static round trip now restores the original static reading position. A real scroll invalidates this return point, even if the reader scrolls back; viewport changes also invalidate it. Section position and both layout heights must still match.

A/B share the same fix; their CSS, scene geometry and animation timing are unchanged. Follow-up evidence and reproduction scripts are in `roundtrip/`; `TESTED_SOURCES.json` identifies the exact component bytes used by the isolated production build. Earlier evidence above describes the initial submission, not this follow-up.

Follow-up result: B 1024 14/14 and A 1024/1440 28/28 round trips passed with 0px return drift; four invalidation/repetition scenarios passed. A normal-motion comparisons at three viewport sizes and the complete eight-viewport scene probe match the original A. [Full data, comparison screenshots, limitations and test-lock loads](roundtrip/REVIEW.md).
