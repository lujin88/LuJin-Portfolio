# PR #177 — `session-03-advisor.webp` provenance (webdev)

2026-11-12 · replies legal #9246 · CA03 thread #8610 · HEAD `9b19c60` at time of writing.

This file records what the repo and OUTBOX can prove about the **base still** (pre–western-face edit) and the **Lu pick B** replacement. It is not a legal opinion and does not replace a stock licence, model release, or portfolio-owner source declaration.

## Files in scope

| Role | Path | Dimensions | SHA-256 |
|---|---|---|---|
| **Published (PR #177)** | `public/assets/images/client-advisory/session-03-advisor.webp` | 1400×755 | `0cd7dcb0fabaf1ff94859cbab1d6bfee3205e268b80c02546d99805ffba99682` |
| **Prior production still (main before #177)** | same path on `origin/main` | 1400×755 | `63121f2e5af12b86d592503c525418b17ecc2ba18e88b8bad8a60ce145d795d9` |
| **OUTBOX copy of prior still** | `~/.buzz/OUTBOX/CA03_NOD_MOTION_1112/SOURCE_ADVISOR.webp` | 1400×755 | `63121f2e…` (byte-identical to main pre-PR) |
| **OUTBOX prior still (duplicate)** | `~/.buzz/OUTBOX/CA03_WESTERN_1112/original.webp` | 1400×755 | `63121f2e…` |
| **Lu pick B (PNG before cwebp)** | `~/.buzz/OUTBOX/CA03_WESTERN_1112/advisor-B.png` | 1400×755 | `5ae0378c0cd3e6ea1b7a8d6dce5460f5edfd2c8a1b42777e57aa229a10f5d4b1` |
| **Git master (historical)** | `ca/client-advisor/public/images/session-03-advisor.png` @ `3b663d1` | 1708×921 | `364d942bf7e1c41d71cd3c294fbc9337fe6bdaf00e688bf3c3af189a28ff6d6d` |

Referenced in code: `ca/client-advisor/components/sessions/session-03-research.tsx`. Alt (EN): fictional staged advisor at a window — not a named UBS employee (contrast `docs/research/legal/2026-11-09-portfolio-confidentiality.md` rows on concept mockups / Paul Donovan).

## Base still — verifiable chain

1. **First commit in repo:** `3b663d1` (*Initial commit of the live showcase…*) adds `ca/client-advisor/public/images/session-03-advisor.png` (1708×921, SHA above). No separate licence file in that commit.
2. **WebP production path:** `7d4bb08` (*perf: serve resized WebP…*) introduces `public/assets/images/client-advisory/session-03-advisor.webp` at 1400×755 (resize/re-encode of the same picture). Still on lujin.me via main; sync PR notes kept main’s WebP when merging 3000 (`~/.buzz/OUTBOX/SYNC_3000_20261107_PR_BODY.md` table).
3. **No embedded provenance metadata** on the production WebP or on archived PNG copy (`replay_site_2026-09-18/images/session-03-advisor.png`, byte-identical to `3b663d1` PNG): no EXIF author, copyright, or download URL in macOS metadata.
4. **Repository search (2026-11-12):** no `docs/research/legal` entry, OUTBOX README, or commit message stating stock agency, licence type, AI tool, or model release for this still before today.

**Gap for legal:** original **creation** rights (stock + licence URL, commissioned shoot + release, or generative tool + applicable terms). Webdev cannot infer this from git; needs **portfolio owner or visual** declaration (sensitive receipts not in public PR).

## Western-face edit (Lu pick B) — documented

| Item | Location |
|---|---|
| Task / method | `~/.buzz/OUTBOX/CA03_WESTERN_1112/README.md` |
| GPT prompts + mode | `~/.buzz/OUTBOX/CA03_WESTERN_1112/prompts.json` |
| Mask composite + pixel check | `build.cjs`, `face-mask.png`, `validation.json` (mask-outside delta 0 per visual delivery) |
| Prior still input | `SOURCE_ADVISOR.webp` in `CA03_NOD_MOTION_1112` (= main pre-PR bytes) |

PR #177 only re-encodes `advisor-B.png` → WebP (`cwebp -q 90`); no TS/CSS/copy change.

## Suggested closure (for @legal / @pm)

| Option | Action |
|---|---|
| A (推荐) | Lu (via PM, not public chat) supplies one line: stock ID + licence allowing portfolio/modification **or** AI tool + personal-account terms **or** model release path; legal maps to IPI/Google/etc. and signs PR. |
| B | If no record exists, treat as legacy debt: replace base with newly documented still in a follow-up design PR before merge. |

Webdev role for #177 stops at this chain-of-custody record + OUTBOX pointers; does not assert ownership.
