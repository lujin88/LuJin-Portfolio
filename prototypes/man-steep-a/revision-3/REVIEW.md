Switching reduced motion on partway through MAN's scroll scene could move the entire scene above the viewport. The component now keeps the visible stage anchored while layout changes, resumes the old progress on a direct round trip, and compensates the height delta when the reader is already below the scene. When the stage is leaving the viewport, the boundary to the following content stays in place. B at 1024px has a taller static stage than the sticky animation, so the native animation may resume partway through when the reader has scrolled within the static stage.

This is a separate follow-up **based on #66 at 819376b**. It contains incremental A/B patches and editable components under `prototypes/man-steep-a/revision-3/`. Apply the matching delta after the matching revision-2 patch. No changes to #66's branch, CSS, routes, media, scroll timing, or port 3000.

At A 1440×900 / 85%, the intended correction is scrollY 1246 → 634 when reduced motion turns on, keeping the static scene visible; switching directly back returns to 1246. It does not preserve the absolute scrollY while the document shrinks. Card positions change to the existing static assembled layout, as expected for reduced motion.

Recordings at 85%: [Before A](https://buzz-wwbf.srv2056990.hstgr.cloud/media/9041496448f193db40f2e5ac92ee0163e58e5325876786ec7d1bc17daa892717.mp4) · [After A](https://buzz-wwbf.srv2056990.hstgr.cloud/media/358e9b885a811eee3877cdaff878ebec619ac4f5e0266519d5dcd1e9235c0a30.mp4) · [After B](https://buzz-wwbf.srv2056990.hstgr.cloud/media/618a6a1e97e4d171d3a546c82ecc61e47112e123c877ddc5fe87e98f7b559540.mp4). Each also switches back and scrolls both directions. All three recordings had zero console/page errors. They use synthetic preference changes in installed Google Chrome.

Before:

![Before](https://raw.githubusercontent.com/lujin88/LuJin-Portfolio/fix/man-reduced-scroll-20261105/prototypes/man-steep-a/revision-3/evidence/BEFORE_A_REDUCED.png)

After:

![After](https://raw.githubusercontent.com/lujin88/LuJin-Portfolio/fix/man-reduced-scroll-20261105/prototypes/man-steep-a/revision-3/evidence/AFTER_A_REDUCED.png)

A fixed-180ms sampling run failed before the media change had reached the component (the snapshot was still animated). That failure is retained. A later boundary check exposed B at 1024px: its static stage is taller than its animated stage, so the stage bottom cannot stay fixed. The implementation now anchors the following-content boundary after leaving the sticky position; that preserves the reading position. Both failed runs are retained. The final check waits for the requested media preference and component mode, then two animation frames, before measuring; the implementation was not changed in response to the first timing-only failure.

Validation: full-tree tsc has the same ten baseline diagnostic lines outside MAN; the project typecheck is still failing. A/B delta patches apply cleanly and reproduce the delivered source bytes. Frozen dependency installation passed on the isolated preview, and frozen lockfile-only verification passed in the source worktree. No package test script exists.

No Rive build. Safari, physical devices, and off-page preference changes during browser history restoration remain untested. Width/breakpoint resize anchoring is outside this task. Pending independent QA and Lu's A/B choice; no merge or production integration.

Originating Buzz channel: 4d529583-4dcf-4804-816e-94f63f30634b. Assignment: cabb570ad0c20f756db9dfa687d4500c905c84d80c5e56816f3a80f70b2c86ac. Local evidence: OUTBOX/MAN_REDUCED_ANCHOR_20261105_249a/.

Final verification: all 34 scenario records passed across A/B, 1440×900, 1024×768 and 390×844. Sticky toggles at 25/50/85% returned to the original scrollY; below-section, released-tail and static-reading checks preserved the following content boundary within 0.453px. No console/page errors in the six browser contexts. Final test-lock loads: 2.41/3.05/3.49 → 4.77/3.56/3.65. Recording loads: 3.82/3.37/3.70 → 3.82/3.40/3.69. Full-tree diagnostics remain byte-identical to the #66 run (ten baseline errors).

The 85% recordings were captured before the final normalization of the released-stage branch; they exercise the unchanged sticky-stage path. The final check exercises the delivered byte-matched component sources, including the normalized boundary handling.
