# Home BMW case card — drive-in video (PR #178)

2026-11-12 · thread **#8673** · legal **#9285** / **#9290** · PM **#9296**.

## Published asset

| Item | Value |
|---|---|
| Path | `public/assets/videos/home/bmw-drivein-web.mp4` |
| Poster (reduce / fallback) | `public/assets/images/bmw-system/i4-services-car.webp` (unchanged on this PR) |
| Playback | `advisory-office.js` (same as UBS/E.ON); muted loop; reduced motion = still only |
| Pixel source | `~/.buzz/OUTBOX/BMW_DRIVEIN_1112/C2/video-v2-fix-r1/bmw-c2-front-r1-3x2.mp4` (motion R1 front-wheel repair; visualqa **#9238**) |
| SHA-256 (web) | `b1f2f8b93bd100c05580b64f710a4a35486bff2b2cbd62af868b26b0524fa0f2` (R1 pixels + `exiftool` tags; was `1807a5c4…` on `534a31c`) |

## Background still (legal #9285 item 1)

| Asset | Notes |
|---|---|
| `~/.buzz/OUTBOX/BMW_DRIVEIN_1112/BACKGROUND_ORIGINAL.webp` | Work copy of site background; SHA-256 `60af2a71506ccafc18140c534136621dc523811202b921d3f3df1cd8533167af` |
| Repo path | `public/assets/images/bmw-system/i4-alpine-sunset.webp` (same hash as `BACKGROUND_ORIGINAL.webp`) |
| First in repo | commit `cd5e944` (2026-11-08, BMW hero C) |
| Home card on #178 | **Does not** swap poster to alpine; card still uses `i4-services-car.webp`. Alpine is the **composition source** for drive-in generation in OUTBOX, not a new stock download for this PR. |
| Route / still generation | `BMW_DRIVEIN_1112/README.md`: GPT built-in `image_gen` for route drafts (1536×1024); A/B edits from alpine base. `C2/README.md`: deterministic pixel move of existing car RGB from alpine; GPT used only for old-slot infill mask, not full background replacement. |
| External ref / license file | No separate stock-license file in repo for alpine sunset. Prior visual brief `BMW_HOME_VISUAL_1111_8034/README.md` documents **reuse of existing** `i4-alpine-sunset.webp`, no newly licensed asset for the home BMW board. Public-edit rights for **this PR’s loop** are Jimeng + downstream motion edits (below), not a new rights grant on alpine itself. |

## Jimeng video + derivatives (legal #9285 item 2, #9290)

| Stage | Path / record |
|---|---|
| Platform | 即梦 / Dreamina (Jimeng); user submit via harness `jimeng-submit.sh` |
| Raw download | `~/.buzz/OUTBOX/BMW_DRIVEIN_1112/C2/video-v1/generated/40ead6b7-885e-451f-8144-a79ea9cfbd6e_video_1.mp4` |
| Container tags on **raw download** (ffprobe, 2026-11-12) | `UserComment`: `{"aigc_label_type":0,"source_info":"dreamina"}` · `LvMetaInfo`: Dreamina `exportType":"generation"`, `originItemId":"7707276788031900990"` · `comment`: `vid:v02870g10004dbqs0027dld823qsekb0` |
| Meaning of `aigc_label_type":0` | Metadata / platform AI identification present in file; **not** a separate in-frame watermark on spot-check of delivery frames from motion R1 (see below). |
| Derivative 1 | Motion encode + compositing pipeline → `C2/video-v2-fix-r1/bmw-c2-front-r1-3x2.mp4` (4s, 1110×740, 30fps). **Only** front-wheel mask/repair changed vs prior v2; background, route, hold frame unchanged per `C2/video-v2-fix-r1/check.md`. |
| Derivative 2 (web pixels) | **Binary copy** of R1 MP4 → `public/assets/videos/home/bmw-drivein-web.mp4` (no re-encode). |
| Derivative 3 (web metadata) | R1 pixel copy, then `exiftool -config scripts/legal/exiftool-jimeng-keys.config -TagsFromFile` Jimeng raw → `-Keys:all>Keys:all` (restores **`Keys:UserComment`** + **`Keys:LvMetaInfo`**; stock exiftool cannot write those keys). `Title` = derivative chain. Verify: `exiftool -a -G1 -s` must show `[Keys] UserComment` and `[Keys] LvMetaInfo` (not XMP-only). |
| Site playback | `advisory-office.js`: in-view muted **loop** (same as cards 1–2); `preload=none`; reduce-motion → poster still only. |
| Prior gap (#9290 / PM #9296 / legal #9314) | `534a31c` no tags; `6d91102` ffmpeg packed `comment`; `bfae271` put `UserComment` in **XMP-exif** only — **rejected** (#9314). Fixed with Jimeng Keys config + `-Keys:all`. |

### In-frame AI label / crop

- Jimeng source is 1112×834; published loop is 1110×740 (R1 delivery crop/aspect for home card). Motion `delivery-proof.cjs` / `review/delivery-frames/` are the acceptance frames for the **published** loop.
- Jimeng → R1 reframes 1112×834 → 1110×740 (aspect for home card). Corner spot-check @t≈3.5s: no readable Dreamina **画面角标** on raw vs R1 (dark scenery dominates corners; `aigc_label_type":0` = metadata label). Motion delivery strip also shows no corner badge.
- Primary compliance record: **container metadata** from raw download, re-copied with `exiftool` on publish file (not removed by silent re-encode).

## Sidecar for 法务

`docs/research/legal/jimeng-metadata-sidecar.json` — raw-download tags + derivative chain + `exiftool` verification on PR HEAD SHA.

## Sign-off

Re-request **法务通过** on PR HEAD after exiftool tags. **QA 通过** on new HEAD (metadata+tag container; pixels = R1). Visualqa: same picture as R1 #9238 unless SHA-only regression check needed.
