# PR #177 — `session-03-advisor.webp` provenance (webdev)

2026-11-12 · legal #9246/#9248 · visual #9250 · CA03 #8610 · image commit `9b19c60`; doc tracks latest branch HEAD.

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

1. **First commit in repo:** `3b663d1` (2026-09-16) adds the same PNG at `ca/client-advisor/public/images/session-03-advisor.png` and `ca/ca-session-03-research/public/images/session-03-advisor.png` (SHA above).
2. **Public assets path:** `a5a2e01` (2026-09-24) adds `public/assets/images/client-advisory/session-03-advisor.png` (same SHA).
3. **WebP production path:** `7d4bb08` (2026-10-07) serves `public/assets/images/client-advisory/session-03-advisor.webp` at 1400×755 (resize/re-encode). `SOURCE_ADVISOR.webp` in OUTBOX matches that WebP byte-for-byte (`chain.json` in visual delivery).
4. **Embedded declaration (PNG only):** legal #9248 and visual #9250 extracted the historical PNG’s **caBX / C2PA** payload: readable fields include `OpenAI Media Service API`, `gpt-image` `2.0`, `c2pa.created` `2026-09-07T00:00:00Z`, and IPTC `trainedAlgorithmicMedia`. Evidence pack: `~/.buzz/OUTBOX/CA03_WESTERN_1112/provenance/` (`original-advisor-with-c2pa.png`, `c2pa-caBX.bin`, `c2pa-readable-fields.txt`, `chain.json`, `README.md`). **Signature not verified**; embedded metadata is not a licence or account-attribution record.
5. **Production WebP** (main pre-PR and post-`7d4bb08`): no C2PA container after `cwebp` resize; chain rests on PNG → WebP hash continuity above.

**Remaining gap (per visual/legal, 2026-11-12):** September **generation account ownership**, original prompt, and whether **third-party or real-person reference inputs** were used. Git committer ≠ image API account. PM / original creator supplies that to legal if needed (no private auth docs in public PR).

## Western-face edit (Lu pick B) — documented

| Item | Location |
|---|---|
| Task / method | `~/.buzz/OUTBOX/CA03_WESTERN_1112/README.md` |
| GPT prompts + mode | `~/.buzz/OUTBOX/CA03_WESTERN_1112/prompts.json` |
| Mask composite + pixel check | `build.cjs`, `face-mask.png`, `validation.json` (mask-outside delta 0 per visual delivery) |
| Prior still input | `SOURCE_ADVISOR.webp` in `CA03_NOD_MOTION_1112` (= main pre-PR bytes) |

PR #177 only re-encodes `advisor-B.png` → WebP (`cwebp -q 90`); no TS/CSS/copy change.

## Webdev scope for #177

Chain-of-custody in this file + PR image swap (`9b19c60`). C2PA extraction and hash chain: visual OUTBOX `provenance/` (#9250). Western-face GPT edit: parent `CA03_WESTERN_1112/`. Does not assert permissions or sign 法务通过.
