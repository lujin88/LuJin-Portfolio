# Homepage H-A / S-A / P-A

Implements Lu's selections relayed in portfolio channel on 2026-10-29 (events `df0768d8`, `368bea8b`, `575fcad6`). Base: `9fd96bc309cf38bd70cfc01a571ad6a16454877a`. Preview: http://localhost:3016/index. No changes to the separate Desktop working tree or port 3000.

## Behavior

- H-A: `turn-head.mp4` is paused throughout. Pointer position chooses its time. One writer waits for `seeked`, coalesces intermediate pointer samples and ignores differences under 1/30 second. No autoplay or ambient zoom. Offscreen/hidden tabs stop new seeks. Touch and reduced motion use the supplied still.
- S-A: native sticky scroll; only the images fan apart. Case copy fades without translating/rotating. No wheel interception, timeout, autoplay or continuous rendering loop. Stop scrolling to stop the transition. Both original main case descriptions and translation keys remain. The E.ON link advances keyboard users to the second case.
- S allocation is a **suggested value**: 350vh section; 30% UBS hold / 40% handover / 30% E.ON hold, linear mapping to scroll; up to ±5° rotation. This is implemented behavior, not a measured performance claim. Main's longer copy differs from the selected local screenshot; its text was not silently replaced.
- P-A: three image columns, Weather Aquarium / AI Pet / Gratula; all link to `/lab` as requested. One column below 640px. Visible immediately, including reduced motion; no delayed stagger.
- Desktop pin requires at least 1100px width, 760px height, and enough space for both complete text blocks plus 96px. Otherwise cases follow normal document flow. Reduced motion always uses normal flow. Existing shell tokens supply color/type; no design-system directory exists in this base.
- Logo markup and styles remain unchanged.

## Rejected motion

- Hero autoplay plus pointer scrubbing: competing state controllers, fails state clarity.
- Case text rotation or automatic advancement: interferes with reading.
- Playground stagger/tilt: delays navigation and adds competing attention; static cards suffice.

## Integration gaps

`app/lab/page.tsx` redirects `/lab` to `/lab/action-center`; this PR does not create a project directory. Main has no Weather Aquarium case page. Main **does have** `/ai-companion-pet`, but it is the older “默默” setup experience, not the local portfolio case. These need separate integration before the cards lead to the expected local project versions. The three thumbnails reproduce the approved review material; they do not imply those project versions have shipped on main.

## Asset sources

`public/assets/images/home-motion/`:

- `hero-still.jpg`: 2.5s frame of repository `public/assets/videos/about/turn-head.mp4` (duration 5.166667s).
- `ubs.jpg`: existing CA video, previously captured at 1.2s, `OUTBOX/PORTFOLIO_MOTION_REAL_20261029/evidence/UBS_VIDEO_SOURCE_1200.png`.
- `eon.jpg`: existing E.ON video first frame, crop below baked-in question, `EON_VIDEO_SOURCE_0000.png` in the same evidence folder.
- `weather.jpg`, `gratula.jpg`: crops of the approved local-page screenshots `lab-weather-aquarium.png` / `lab-party-planner.png`.
- `pet.jpg`: the existing local AI Pet listen poster, preserved as `AI_PET_SOURCE_POSTER.jpg`.

Source review notes: `/Users/lu/.buzz/OUTBOX/PORTFOLIO_MOTION_REAL_20261029/README.md`. No generated replacement artwork, no additional video dependency.

## Validation

Full `npm run build` passed at base `9fd96bc` plus this working diff (22 static pages). Package has no test/lint script. Browser checks and visual evidence are delivered in the same project thread, with exact tested commit and test-lock load lines. Those checks cover paused seeking, stopped case copy, E.ON keyboard link, reduced-motion changes, narrow/short layouts, card destinations and unchanged logo dimensions. They do not establish measured frame rate or mobile Safari behavior.

Manual device check remaining: open `/index` on a phone, scroll through cases and Playground; both case texts must remain fully readable in normal flow, cards must open `/lab`. No custom drag gesture.
