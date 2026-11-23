# Concept section: layout research (2026-11-18)

Asked by: Lu #17964, assigned by pm #17970/#17973. Source of every reference: Mobbin (links below). Screenshots were viewed in Mobbin; image URLs expire after 30 days, so visual should open the links.

## What we must not look like
Read from `public/home.html` (not yet viewed on 4620):
- **Projects** (`#home-showcase`): one full-width case at a time, big media + copy, pinned scroll.
- **Playground** (`#home-playground`): 3-column grid of identical video cards, each = video, h3, meta line, one sentence, pill "Explore case study" CTA.
- Common thread: **media-first cards with a CTA**. Concept must not be a card grid or a stacked media+copy row.

Old A/B/C (11-13/11-17): I could not open pm #13357 or the images. From pm #10824 the earlier options were A image cards, B text-only list, C user reference. I do not judge them further without seeing them. pm or visual: please attach the three old images so I can say which parts overlap Playground.

## References (8)
| # | Site | Pattern | Why it suits "unbuilt ideas" | Link |
|---|---|---|---|---|
| 1 | Wise (public roadmap) | Columns Now / Next / Later, small text cards | Reads as "thinking, not shipped"; no hero images | https://mobbin.com/sites/sections/532f5de7-2a76-4082-9de0-1c207a2d3338 |
| 2 | Strut | Stage lanes (Ideas / Research / Outline) with cards | Shows idea → development state | https://mobbin.com/sites/sections/b874a81a-f2b2-4c67-8e76-a09d00c392d2 |
| 3 | A24 | Giant type-only title list with small year | Zero media; titles carry the section | https://mobbin.com/sites/sections/b645a881-adf5-43f3-a86c-758cd54f0b72 |
| 4 | Freshman | Centered huge serif names, images flank the hovered row | Index + preview; images appear on demand | https://mobbin.com/sites/sections/3641b988-b26c-471d-a177-c5fc2254b123 |
| 5 | Waka Waka | Numbered index table: N°, name, material, size | Reads as a catalogue or lab register | https://mobbin.com/sites/sections/fe089d5d-5adb-4849-a282-ae46d8fd7eac |
| 6 | Overmind | "A few ideas to get you started": one idea per slide, carousel with dots | One concept at a time, with a short argument | https://mobbin.com/sites/sections/d6f5ee04-be97-4c18-bd5e-450820bb5507 |
| 7 | MOUTHWASH Studio | Scattered artefacts on black; index row with codes RC-100…; tag filter | Experiment-lab feel; ID codes | https://mobbin.com/sites/sections/024883f8-107e-4034-8ba2-dfdd9de4dfde |
| 8 | Wild | Three tall tiles, centered title, tool chips under each | "Experiments" with a stated method | https://mobbin.com/sites/sections/bd58336d-6de6-4678-aafd-10089a509897 |

Not used: metic. "Selected work" (a large media + text card, which is Projects again) and Discord/Webflow idea boards (forum lists, too UI-heavy).

## Three directions for visual (none is a media card grid)
**A. Concept index (typographic list)** — refs 3, 4, 5. Each concept is one big row: title, year, one-line tag ("Self-initiated"), arrow. Hover or tap shows a single preview image; on 390 the preview becomes a small thumbnail inside the row. Strongest contrast to Playground; fits 2–5 concepts (ETF, MAN, later ones) and scales.

**B. Idea board (state columns)** — refs 1, 2. Small cards without hero media, grouped by a status label (e.g. Explored / In progress / Next). Needs honest statuses from Lu; reads as "thinking in progress". Weakness: weak imagery, and 2 concepts can look like an empty board.

**C. One concept at a time (focus stage)** — ref 6, plus 8's chips. One concept fills the stage with a short claim, 2–3 facts (role, method, outcome) and an image; the others are a numbered rail (01 ETF, 02 MAN). Risk: close to Projects' one-at-a-time stage. To stay different, put the rail left, text-led, and small media.

**Pick: A** as the primary (clearest difference, copes with few or many items). C only if Lu wants imagery.

## Open points
- Concept membership changes per Lu: MAN and ETF now (pm #17823); BMW moved to Projects.
- Every item needs a "self-initiated, public sources" line (research basis: Lu-approved copy direction #10343).
- I did not see localhost:4620/index; the Projects/Playground notes come from source only. visualqa or visual should confirm against the rendered page.
