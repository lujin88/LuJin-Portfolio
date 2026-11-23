# Deck 5defd99 (study-case-presentation → private repo lujin88/study-case-presentation)
Result: 法务不通过 5defd99. Not legal advice; 待确认 = ask a lawyer.

## Blocking
- Real UBS CAWB product screenshots are in the commit: v3/assets/1-book-view.png, 2-client-view.png, 3-us-tech.png, 4-proposal-options.png, 5-proposal.png and identical blobs v3/p14/1..5 (same git hashes). I opened 1, 2, 4: UBS logo, "CAWB 2020+", UBS CIO content, UBS Investment Intelligence; 2-client-view shows a named client record (Pierre Brandtner, account/ID header). Referenced by v3/client-view.html, p14/*.html, cwb-overlay.js, evidence.html, embedded-insight.html, placements-motion-v6.html.
- v3/assets/team-setup-screen.png: UBS-branded recreation, labelled "Illustrative concept · fictional clients & figures". Lower risk, still UBS marks; keep only if Lu confirms it is her own redraw.
- advisory-slides-16x9/*.png (about 40 rendered slides incl. slide-02/03/07/09/12/13/15/17/18/23/25, marco-monitor-1920, three-screen-flow) and v3/assets/slide-*.png: 14 of them contain the string "ubs"; likely embed the screens above. Not all opened.
- README.md lists source/product-screens/ as "real product screenshots" (folder not in commit, but this confirms the PNGs above are real).
## Basis
Swiss UWG Art. 6 (trade secrets) and OR 321a Abs. 4 (employee confidentiality); NDA/client agreement not seen by me. 待确认: whether the UBS agreement allows portfolio use of screens. Client-name record: FADP Art. 5/6 if real person.
## Rest
assets/ubs-logo*.svg, v3/ubs-logo-*.svg: OK only in a private repo; replace before public/PDF. External: fontshare Satoshi CSS, jsdelivr remixicon, Figma embed link (Kn8wqrhR3UDgQhM98SuBMC): fine privately, check Figma file visibility. Not verified: people photos/cutouts (client-cutout, advisor-marco-cutout, team-setup-photo, slide-open-photo.jpg).
## Fix for webdev
Remove or replace with fictional redraws the 10 screenshot files + slide PNGs that embed them; remove source/ mention in README; re-sha, I recheck.
