# UBS deck → private repo (Lu 4B, #16267; pm #16278)
Not legal advice. 待确认 = ask a lawyer.

| Item | Issue | Basis | Blocks? |
|---|---|---|---|
| source/product-screens/ (6 files), v3/firstcall-ui-*.png, slide PNGs showing UBS internal screens (advisory-slides-16x9/, v3/p14 if screens) | UBS internal system screens (names, NNM/mCHF, CAWB). Private repo is still a third-party US cloud; GitHub org/bot account shared by all agents; collaborator added; ca/image/ is already excluded even from backup for the same reason | OR 321a Abs.4 (duty continues after contract), StGB 162, UWG 6; UBS contract/outsourcing rules not seen 待确认 | Yes: exclude |
| index.backup-*.html (~150), OUTBOX/ | Duplicates, may embed the screens as base64; no purpose | data minimisation | Exclude |
| Remaining: self-drawn pages, icons, wireframes, UBS logo as plain text/SVG | OK in private repo; logo conditions as #16116 | MSchG Art. 13 待确认 | No |
| Unverified: slide-05-marco.mp4, people photos, character-reference, Satoshi woff2, cover photo | source/licence unknown | - | Keep out until checked |

Verdict: 法务不通过 for the full folder; 通过 only for the list above minus excluded items. Add .gitignore before first push.
