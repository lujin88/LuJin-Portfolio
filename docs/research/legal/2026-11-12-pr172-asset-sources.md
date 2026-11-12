# PR #172 (`sync/3000-2026-11-12`) — HIW /lab/tools media sources

2026-11-12 · Author: webdev (Cursor) · Thread: #lu-portfolio #8545 · Legal ask: #8585 / PR comment on af5a6a5. **Not legal advice.** This manifest covers the 7 images and 8 videos added for `/lab/tools` and Work-menu nav art in that sync commit series. It does not certify the whole PR or the site.

## Third-party assets in this set

**None.** No stock photography, clipart, paid generative credits (Jimeng/Midjourney/DALL·E), Shadertoy shaders, or external icon packs. Capture tooling only: Playwright/Chromium, Google Chrome (local), ffmpeg — not shipped to visitors.

## Navigation icons (4 files)

Same as `~/.buzz/OUTBOX/NAV_AGENT_TOOLS_1111/README.md` (hashes verified by legal on af5a6a5):

| File | SHA-256 |
|------|---------|
| `public/assets/images/nav/light/playground/agent-tools-light.png` | `569f1fb4e471fc85aca368b22891ef309378583f9a8c9a618ae9f0c73655f35e` |
| `public/assets/images/nav/light/playground/agent-tools-light.webp` | `2466a83ac1ee481ffa4d014cbf2d53e4fdc3a27a6888e74f3636f8ecae342c85` |
| `public/assets/images/nav/dark/playground/agent-tools-dark.png` | `996e3b984431eb40a88af082417d6b5f3f987a5bc8d695080e07178dc5fa5701` |
| `public/assets/images/nav/dark/playground/agent-tools-dark.webp` | `65aaa2704d5430ef7aac3d9b5dc12b3f8054ef36c1b972e1d6755c8fefb2eba7` |

Self-drawn vector SVG → PNG/WebP; colours from existing approved Playground nav tokens.

## Posters (3 images)

| File | SHA-256 | Source |
|------|---------|--------|
| `monitor-real-demo-v3.png` | `68e17a2e9b40f3fc3b2d53409fb61ee55716cc676e8049404fde25d932ae74db` | Screenshot of **isolated** Agent Monitor (`~/agent-monitor-worktrees/visual-demo-1111`, `localhost:7781`) with fictional tasks/usage only. Matches `design/hiw-agent-projects-1111/README.md` § Actual application screenshots. Visible content: demo sample tasks and usage percentages — no live workspace. |
| `scranton-real-demo-v3.png` | `401575f765ed45ae30e2f98efbe00b48d4c46fd2b0000d5e28a9e267ae3d61c4` | Screenshot of **isolated** Scranton demo instance (`~/Scranton-worktrees/visual-demo-1111`, `localhost:8341`). Fictional channels `demo-studio` / `demo-launch` / `demo-library` and members Robin / Sage / Ember only (`design/hiw-agent-projects-1111/demo/scranton-messages.jsonl`). No real messages, tokens, or uploads. |
| `office-v4.gif` | `135af1dde053cc4d70eefd2c4c0d7c2cdb94b60a4abbb96eaa8cb86c7f90d0c2` | Unchanged copy of `~/.buzz/OUTBOX/ROOM_PIXEL_EDIT_1110/avatar/motion-bear-typing-room-v18-v4-1x.gif` (v18 pixel room + bear v4 typing loop). Room and character frames produced in-repo under Pixel Office / ROOM_PIXEL_EDIT work (Python compositing scripts, original pixel art; no external character IP). |

Canonical design copies: `design/hiw-agent-projects-1111/assets/` (same pixels as `public/assets/images/lab/hiw-tools/`).

## Card loop videos (8 files)

**PM spec:** lu-portfolio #7912 (Lu #7911): 8–12s loops, scripted UI on **demo data only** — Monitor: load → approval popup → approve; Scranton: Report → Activity → typed input → chat reply → resize. No real channel names, credentials, or usage. Paused off-screen / `prefers-reduced-motion` handled in `app/lab/tools/tools-card-media.tsx`.

**Production:** Screen recordings from the same isolated Monitor/Scranton instances above, on canonical `localhost:3000` `/lab/tools` card chrome (Nov 2026). **Light** pair = default tools-page theme; **dark** pair = dark-theme card variant for navigation parity. Encoded to paired MP4 (H.264) and WebM (VP9).

**Monitor re-record (2026-11-12, PM #8619 / QA #8650 / Lu #8669):** Only the four `monitor-card-loop-*` files were replaced (fourth take). Captured on `~/agent-monitor-worktrees/visual-demo-1111` at `127.0.0.1:7781` with **all** usage collectors off (`CLAUDE_USAGE` / `CODEX_USAGE` / `CURSOR_USAGE` / `GROK_USAGE` / watchers / `MONITOR_NOTIFICATIONS`), demo `state.json` + `usage.json` seeded from `design/hiw-agent-projects-1111/demo/` (24/36/18/42%, **Demo studio** tasks). Playwright/Chromium at **1120×720** (`scripts/record-hiw-monitor-loops.mjs`): held hook via `POST /ask` with `x-key` + `ack:1` → **Review & approve** → **Approve** + `POST /ack` (no unconfirmed-receipt banner); ~8.68s; light/dark via patched Monitor time-theme + `colorScheme`. Script self-check: YAVG @2s, usage OCR, no error text @7.8s. Scranton loops unchanged.

| File | SHA-256 |
|------|---------|
| `monitor-card-loop-light.mp4` | `da670b28ecead02947520464bee583f40504a8de24fdae580133cc7fd0a96a49` |
| `monitor-card-loop-light.webm` | `3918ae3612b788c4d144fa273997470b0fc412045d8646fc9f1ceae5a7fbc8fc` |
| `monitor-card-loop-dark.mp4` | `5370600179848c0b6f9da297c9cfe20b81ff7891cef8ddd033f80b75def22658` |
| `monitor-card-loop-dark.webm` | `b3a7e1aba5248920391c870a3e73e2ab8e584bf819fb982062389dc75d55b54b` |
| `scranton-card-loop-light.mp4` | `6a2c23af7aef0e608497269fcf366b9aa2f997f1e25eb7a1b8cb36bc4a8d796c` |
| `scranton-card-loop-light.webm` | `9520029d22594fb0867936c8ce95d80eec449b328a9ccb8b0e69c303322d313c` |
| `scranton-card-loop-dark.mp4` | `bd21cb26213601968197d0d5e825dbc0d120389fe60e679f6710bd47e0b76b70` |
| `scranton-card-loop-dark.webm` | `d1d9660f6b0575e323a64b94894e30818c00db1d4cee74ea9fb2435664a33363` |

**Demo-data confirmation (Monitor):** `design/hiw-agent-projects-1111/demo/monitor-state.json`, `monitor-usage.json` — fictional task titles and sample percentages.

**Demo-data confirmation (Scranton):** `design/hiw-agent-projects-1111/demo/scranton-messages.jsonl` — fictional Robin/Sage/Ember copy only.

Legal may continue frame-by-frame review (popups, transitions) on these hashes; this document is the production source statement for re-check, not a substitute for that review.

## Cross-references

- Design provenance (v3): `design/hiw-agent-projects-1111/README.md`
- v2 static study (superseded for posters, still useful context): `~/.buzz/OUTBOX/HIW_AGENT_PROJECTS_1111/README.md`
- Nav icons manifest: `~/.buzz/OUTBOX/NAV_AGENT_TOOLS_1111/README.md`
- Pixel office GIF lineage: `~/.buzz/OUTBOX/ROOM_PIXEL_EDIT_1110/avatar/motion-bear-typing-room-v18-v4-export.json`

## CA / confidentiality

This sync does **not** add files under `ca/image/`. Session 06 still uses neutral placeholders in `ca/client-advisor/components/session-06/concept-mockups.ts` per PM #8581.

## Transfer to PR #166 (PM #8859, 2026-11-12)

Branch `dev/tools172-media-for166` starts at `3153a8b` and preserves that commit's
reviewed CSS (exclusive themes, absolute media layers, contain sizing). Eight
Monitor/Scranton videos are copied byte-for-byte from `9afe9ba`; the three poster
images already match. The recording script is carried with its source record.

Monitor playback starts and loops at 0.5s to omit the empty initial loading frame;
the underlying video files and hashes remain unchanged. Hidden theme videos pause
and changing the system theme synchronizes playback. Scranton retains its full
loop, and reduced-motion keeps the existing static-poster behavior.

Validation: frozen install, tsc and Chrome at 390/700/1440 in light/dark passed,
including theme switching, hidden-video pause, first/loop start >=0.5s, contain,
and reduced-motion. Evidence: `/tmp/dev-tools-validation/browser166-final.log`
and `{monitor,scranton}-{390,700,1440}-{light,dark}.png` in that directory.

This is a handoff branch, not a new PR or approval. Webdev merges it into #166
after the layout work; QA/visualqa/legal recheck the resulting HEAD.
