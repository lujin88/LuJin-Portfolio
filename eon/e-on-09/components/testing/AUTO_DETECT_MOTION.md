# Auto detect motion — review round 3

Request: Buzz event `274250332f52bb6c85a0b71f66be5278daa3d02c0ccc64f50bbc4173cd064040` (2026-11-04), following Lu's reordered sequence.

This is a once-per-entry explanatory sequence, implemented with Web Animations API, transform and opacity. It uses `--sc-ease-out` and the card/micro timing ranges in `eon/EON_Solar_Lead_Generation_Design_System.md` §23. No Rive file or generated footage is part of this change.

| Stage | Start | Duration |
| --- | ---: | ---: |
| Whole roof image | 0 ms | 300 ms |
| Detection panel | 300 ms | 300 ms |
| Heading, then three text rows | 600 / 690 / 780 / 870 ms | 180 ms each |
| Three checkmarks | 1050 / 1230 / 1410 ms | 180 ms each |
| Auto-detected label | 1590 ms | 240 ms |
| White quote panel, quote mark and text scale together | 1830 ms | 300 ms |
| Quote types | 1830 ms | 30 ms per visible non-space character |
| Arrow and attribution | At typing completion | 240 / 180 ms |

English has 31 animated characters: 3000 ms total, previously 6900 ms. Other languages use their actual character count: `1830 + count × 30 + 240` ms. Times exclude the future smile clip. White uses the existing white palette and retains the supplied quote SVG silhouette.

The woman remains the existing still photograph. Video generation and integration are separate work. Updated coordination request: Buzz event `bdd380b5414abcde1e6829b7ab179ce15fbec5af4972e1b5942ce8f3e7506e1a`. The approved intended order is typing an address → whole Solar image → nod → consecutive checks → smile and speech → quote. The three provisional sync cues are roof at 0 ms, checks at 1050 / 1230 / 1410 ms, and quote at 1830 ms, relative to this UI sequence's start. These are review markers, not video timestamps; align them with the approved footage when it arrives. Do not assume an isolated smile clip must finish before speech/quote. No guessed video duration or completed media synchronization is shipped here.

Mobile B keeps the photograph above the quote; Lu's layout approval is pending. The arrow is also shown on mobile after typing. Desktop keeps its existing overlapping editorial composition. No new gestures.

The sequence pauses when the scene exits the viewport or the document becomes hidden; it does not repeat after completion. Reduced motion shows a complete static result. Deep links and content already visible before hydration remain static to avoid hiding readable content. Screen readers receive the complete sentence once; animated glyphs are hidden from the accessibility tree.

Not added: roof scanning line (Lu removed it); handwriting (Lu removed it); repeating detection/typing (would interrupt reading); simulated whole-photo movement (would not establish natural movement of the person).

Review evidence is stored outside Git at `OUTBOX/EON_AUTO_DETECT_20261104/R3/BRANCH/` in the Buzz workspace. The review PR links the normal-speed and CDP 0.25-speed recordings, reduced-motion still, and 390 screenshot. The source manifest identifies the exact working files recorded. Full package type checking is run from this worktree; package.json defines no test script. Visual approval and the woman footage remain open.
