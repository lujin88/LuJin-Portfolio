# MAN scroll prototype A

Review at http://localhost:4698/prototype.html. This is a static snapshot with a self-contained scroll study directly after the existing hero. The live site on 3000 is unchanged. Start locally with `python3 -m http.server 4698 --bind 127.0.0.1 --directory prototypes/man-steep-a`.

A preserves the Stuttgart depot story and gathers four fields from the same 10:00 dispatch record. B would replace that hero with workspace modules. A therefore follows Lu's updated hero without changing its content. The snapshot includes the 64px header offset applied on 2026-11-04. `SOURCE_MANIFEST.json` records source hashes and resource mappings; `before.html` preserves the same captured page without the inserted section.

## Motion contract

This is a web scroll prototype, not a Rive asset or production integration. No Rive input or developer integration changes are included. Editable sources are `motion.js`, `motion.css`, and `build.cjs`.

- Above 1000px, native scroll maps to progress 0–1 over the section height minus the stage height. The progress distance is `min(80vh, 900px)` plus a stage clamped to 680–1000px. At 1440 × 1000, the section starts at y=634 and has 800px of progress within its 1800px height (previously 1900px within 2900px).
- 0–8%: four real screenshot crops are scattered. 8–26%: the existing case-study statement appears. 26–32%: short reading interval (48px at a 1000px viewport height). 32–44%: statement leaves. 35–98%: fields gather into the same shared record. 75–94%: final heading appears. 80–96%: record frame appears. 92–100%: provenance caption appears. The section releases immediately at 100%, with no settled hold.
- No fixed playback duration or automatic loop: the reader controls time and can reverse immediately. No wheel/touch cancellation or synthetic scrolling in the prototype. On-screen interpolation uses `cubic-bezier(.77,0,.175,1)` from the animate skill. Only transform and opacity animate.
- At 1000px and below, or with `prefers-reduced-motion: reduce`, show the assembled layout in normal document flow. JavaScript disabled uses the same readable static baseline. Runtime preference changes clear transforms immediately.
- No continuous animation frame loop. A scroll event queues one render; resizing refreshes measured geometry.

The revised normal review uses `record-wheel.cjs new|old` and native browser wheel input via CDP, with acceleration and decaying inertia: each pulse totals 420 CSS px in 24 events, nominally 30ms apart, with 140ms between pulses. This is a simulated gesture, not a physical trackpad recording. The old comparison serves the saved pre-revision CSS/JS through request interception, using identical input. `MAN_REVIEW` must point to a review directory containing `OLD_motion.css` and `OLD_motion.js` for the old run. Actual input timing and pinned duration are saved in each `*_WHEEL.json`; no playback speed-up is applied. The older `record.cjs` remains available for slowed keyframe review; its fixed-duration scroll is not the current normal-speed evidence.

Preview persistence: `~/Library/LaunchAgents/com.buzz.man-motion-preview-4698.plist` starts the static server at login and restarts it on exit. Files remain on the external SSD; the tiny server log is `.scratch/man-preview-4698.log` on the internal drive because launchd could not open the external log path. The SSD must be mounted.

## Sources and design constraints

Hero, typography, colors and existing text: `/Users/lu/Desktop/portfolio_perfect/app/man-truck-bus/page.tsx` and `case.css`. Both project checkouts have no `design-system/README.md` or `tokens.json`; this study reuses existing MAN colors and typography. Snapshot taken 2026-11-04T17:11:42.948Z.

Reference: [Steep / Refero](https://styles.refero.design/style/75fdb89f-ca64-41b3-af36-7a78bd09448e), previously captured in `OUTBOX/GRATULA_DRAFT_RECOVERY_20261104/ssd_copy/refero_steep.jpg`. Direction and crops: `OUTBOX/MAN_STEEP_KEYFRAMES_20261104/V2_MENU/README.md`. Only the scatter → statement → assembly relationship is borrowed.

Crops all come from the existing `dispatch.webp`, a 1440 × 960 fictional case-study screen. Source coordinates `(x, y, width, height)`:

| Field | Source crop |
|---|---|
| Departure / commitment | 28, 461, 258, 95 |
| Blocking this shift | 330, 461, 225, 95 |
| Next action / owner | 634, 461, 308, 95 |
| Contact | 966, 461, 190, 95 |

The assembled frame is a presentation of those four fields, not a claim that the product has this exact layout. Each crop has equivalent alt text. Fonts and other page images are localized with their original resource URLs in the manifest.

## Decisions against extra motion

- Keep hero and navigation stable: moving them would compromise reading and orientation (function).
- Do not loop the depot and cards independently: two active stories would compete (purpose/function).
- Do not repeat gathering in later sections: the relationship needs explaining once (frequency).
- Use a static mobile layout: the wide scatter pattern would make the four fields harder to read (function).

## Validation and limits

Run `check.cjs` and each `record.cjs normal|slow|reduced` through harness-core `scripts/test-lock.sh`, with `TEST_LOCK_CHANNEL` set to the project channel. `PLAYWRIGHT_CORE` and `MAN_REVIEW` can override this Mac's paths. The capture uses installed Google Chrome; `capture-source.cjs` reads 3000 but does not modify it. `node build.cjs` rebuilds the prototype from the snapshot.

Review assets and logs: `/Volumes/Extreme SSD/agent-scratch/man-steep-a-review-20261104/`. No videos are committed. See `VALIDATION.md` for exact results and published files.

The navigation is preserved as snapshot markup; menus, translations, radio-step switching, and full-site interactive behavior are outside this motion study. Links lead to the existing site or copied images. Do not use this snapshot as a production route. No Next build or full-site integration test is claimed. No new dependencies were added; frozen lockfile validation used `pnpm install --frozen-lockfile --lockfile-only --ignore-scripts`.

Remaining: Lu reviews motion, then the developer owns any production integration. Safari and physical mobile devices are untested. Mobile gesture for Lu: open `/prototype.html` at phone width, scroll past the hero and back; all four fields should stay static and readable, with no horizontal page movement. No custom gesture was introduced.
