# How I Work → Playground Tools · selected A · v3

Lu selected A in #7357: two cards plus a third-card peek and arrows on desktop, vertical on mobile. B is removed. PM #7356/#7358/#7360 and visualqa #7355 are addressed in this revision. This package changes design artifacts only, not production routes or port 3000.

Open `a.html` and `landing.html`. The entrance cards link to three separate vertical sections in the same Tools page. The final production URL is for webdev to set. Review annotations and contextual header are not a proposed replacement for the shared site header.

## Actual application screenshots

Both tool images now come from independent application instances in the visual designer’s own clones. No DOM redraws, screenshot reconstruction or response interception is used in v3. Only fictional backend data is seeded. No live tasks, workspace data or access keys are included.

- Scranton: `/Users/lu/Scranton-worktrees/visual-demo-1111`, branch `visual/hiw-demo-1111`, source `2b1f064`; actual app on localhost:8341 (MCP 8240/8241). Separate data/uploads under OUTBOX/HIW_AGENT_PROJECTS_1111/scranton-isolated. Fictional channels demo-studio/demo-launch/demo-library and members Robin/Sage/Ember. Agents have autostart=false and command /usr/bin/false; no schedules. Real UI onboarding set to Ask me first, then demo-studio selected. No changes to the live Scranton folder or instance.
- Agent Monitor: `/Users/lu/agent-monitor-worktrees/visual-demo-1111`, branch `visual/hiw-demo-1111`, source `331bc41`; actual server.js on localhost:7781. Fictional tasks and usage (24/36/18/42%) in separate state.json/usage.json. All usage collectors/watchers and notifications disabled. Screenshot uses this isolated server’s own generated access token, never included in artifacts. No connection to the live 7777 instance.
- `demo/` includes only the fictional seed data for reproduction. Independent Scranton uses the same renderer, not the removed hand-built HTML fixture.
- Pixel Office: unchanged v18 room with bear v4, from OUTBOX/ROOM_PIXEL_EDIT_1110/avatar/motion-bear-typing-room-v18-v4-1x.gif.
- How I Work: unchanged worktable.webp and Poppins files from canonical site. Original palette #f5f1e4 / #272a25 / #2455cc and spacing/radii follow field-notes.css and design-system-foundation.css.

## Layout and evidence

Experience mode: Lu’s original illustration connects the process to its three tools; real application interfaces provide the evidence. Reference https://styles.refero.design/style/00537a20-e99e-4ef2-b119-c6f532c44cc9 supplies typography-led hierarchy, fine separators and outlined pills. Horizontal peek/arrows follow Lu #7316; do not copy GSAP’s dark palette or category colors. Research’s bar is merged in #164.

Landing sections are vertical, each with its own screenshot, heading and short description. `review/landing-1440-full.png` shows all three. Individual `anchor-*-1440.png` images show each actual destination; 390 and 700 evidence is also included. `checks-v3.json` records no document overflow, all images loaded, and distinct anchors:

- 1440: monitor y574, scranton y1374, office y2174.
- 700: monitor y622, scranton y1362, office y2102.
- 390: monitor y668, scranton y1408, office y2148.

All nine anchor clicks land 24px below the viewport top. Six viewport combinations rendered. Author checks do not replace independent visual QA.

## Motion and production handoff

Desktop entrance reveals the horizontal track once as a group; arrows move by one card. Mobile uses normal vertical flow and a one-time vertical section reveal. Breakpoint change is immediate reflow, not a morph; reduced motion is instant. Exact timing must use project motion tokens and remains to be set by motion. Production must handle arrow end disabling and keep keyboard-focused cards in view; the static preview demonstrates links and arrow movement.

Remaining: independent visual QA; legal review of fictional demo assets before publication; final copy/localisation; motion timing; webdev implementation. Lu has already chosen A. PM schedules the Obsidian backup record at 21:00; this document does not claim that backup is done.
