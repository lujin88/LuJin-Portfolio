# B proposal follow-up checks

State: implementation checks passed for the playback controller and standalone
prototype. Independent QA and Lu's visual approval are still required.

- Left arrow: the previous solid rectangular cover crossed the cloud silhouette.
  Its replacement covers only the old stroke. The animated sprite contains only
  stroke strips in a single mesh, so the cloud no longer translates with the arrow. Inspected
  screenshots at 0.20, 0.35, and 0.85 seconds are included.
- Reduced motion: 1440 and 390, five on/off cycles each in the full homepage
  snapshot and again in the standalone review. Pause observed 0–0.2 ms after
  the browser's media-query change notification; clock remained unchanged for
  a further 150 ms. This measures browser-event handling, not OS settings latency.
  Both sizes resumed after switching back. Zero page errors in these runs.
- Baseline: same homepage snapshot and public assets, swapping only original
  R9 runtime/animations versus B. Original and B both have scrollWidth 427 at
  viewport 390, and 1448 at viewport 1440. This is pre-existing full-page
  overflow. No layout fix is included in this motion proposal.
- Rive: all three projects compile with zero errors and warnings.
- Runtime: the prototype pins unmodified canvas 2.49.4 JS/WASM. The earlier
  2.32.0 preview reproduced detached-buffer exceptions during long playback;
  the temporary patch trial was rejected and is not included.
- Dependencies: `pnpm install --frozen-lockfile --ignore-scripts` passed; no
  dependency or lockfile changes. No package test command is defined.

Browser checks used system Chrome through the shared test lock. Final suite
covers normal (two cycles), 0.25x slow (one cycle), reduced-at-load, mobile,
and 1440/390 live preference changes, followed by original/B overflow comparison.
See FINAL_SUITE.log for start/end loads and exit status. Standalone check
completed at 17:19:30 (exit 0, ending load 6.22/8.00/7.71).
Exact tested assets are listed in SHA256.json. Later unrelated changes to the
live site's public directory are not covered by these snapshot comparisons.

Not tested: Safari, physical devices, independent visual review. The original
B proposal still includes the earlier 1.35x character displacement and proposed
pop timings; this follow-up does not imply approval of those design choices.
