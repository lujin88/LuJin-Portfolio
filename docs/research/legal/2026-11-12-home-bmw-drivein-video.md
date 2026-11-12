# Home BMW case card — drive-in video (PR #178)

2026-11-12 · thread **#8673** · legal **#9285** / **#9290** · PM **#9296** / **#9317** · QA **#9321**.

## Published asset

| Item | Value |
|---|---|
| Path | `public/assets/videos/home/bmw-drivein-web.mp4` |
| Poster (reduce / fallback) | `public/assets/images/bmw-system/i4-services-car.webp` (unchanged on this PR) |
| Playback | `advisory-office.js` (same as UBS/E.ON); muted loop; reduced motion = still only |
| Pixel source | `~/.buzz/OUTBOX/BMW_DRIVEIN_1112/C2/video-v2-fix-r1/bmw-c2-front-r1-3x2.mp4` (motion R1 front-wheel repair; visualqa **#9238**) |
| SHA-256 (web) | `d4a0c1f2a2fd74bf1eb9edad856e3006f5fcde6647486202397428b917645ee3` (`ffmpeg -map_metadata 1`; decoded video MD5 = R1) |

## Background still (legal #9285 item 1)

| Asset | Notes |
|---|---|
| `~/.buzz/OUTBOX/BMW_DRIVEIN_1112/BACKGROUND_ORIGINAL.webp` | Work copy of site background; SHA-256 `60af2a71506ccafc18140c534136621dc523811202b921d3f3df1cd8533167af` |
| Repo path | `public/assets/images/bmw-system/i4-alpine-sunset.webp` (same hash as `BACKGROUND_ORIGINAL.webp`) |
| First in repo | commit `cd5e944` (2026-11-08, BMW hero C) |
| Home card on #178 | **Does not** swap poster to alpine; card still uses `i4-services-car.webp`. Alpine is the **composition source** for drive-in generation in OUTBOX, not a new stock download for this PR. |
| Route / still generation | `BMW_DRIVEIN_1112/README.md`: GPT built-in `image_gen` for route drafts (1536×1024); A/B edits from alpine base. `C2/README.md`: deterministic pixel move of existing car RGB from alpine; GPT used only for old-slot infill mask, not full background replacement. |
| External ref / license file | No separate stock-license file in repo for alpine sunset. Prior visual brief `BMW_HOME_VISUAL_1111_8034/README.md` documents **reuse of existing** `i4-alpine-sunset.webp`, no newly licensed asset for the home BMW board. Public-edit rights for **this PR’s loop** are Jimeng + downstream motion edits (below), not a new rights grant on alpine itself. |
| Hero / alpine provenance (legal #9324, PM #9330) | OUTBOX chain documented separately — start `~/.buzz/OUTBOX/BMW_HERO_C_I4_20261108/README.md` (built-in **image_gen** edit of prior C; BMW HK page + Scene7 `g26_bev_positioning_image` as **morphology reference only**, not press photo). Repo first publish `cd5e944`. **Authorization judgment not claimed here**; visual/legal own completeness vs `ix3-landscape` upstream. |

## Jimeng video + derivatives (legal #9285 item 2, #9290)

| Stage | Path / record |
|---|---|
| Platform | 即梦 / Dreamina (Jimeng); user submit via harness `jimeng-submit.sh` |
| Raw download | `~/.buzz/OUTBOX/BMW_DRIVEIN_1112/C2/video-v1/generated/40ead6b7-885e-451f-8144-a79ea9cfbd6e_video_1.mp4` |
| Container tags on **raw download** (ffprobe, 2026-11-12) | `UserComment`: `{"aigc_label_type":0,"source_info":"dreamina"}` · `LvMetaInfo`: Dreamina `exportType":"generation"`, `originItemId":"7707276788031900990"` · `comment`: `vid:v02870g10004dbqs0027dld823qsekb0` |
| Meaning of `aigc_label_type":0` | Metadata / platform AI identification present in file; **not** a separate in-frame watermark on spot-check of delivery frames from motion R1 (see below). |
| Derivative 1 | Motion encode + compositing pipeline → `C2/video-v2-fix-r1/bmw-c2-front-r1-3x2.mp4` (4s, 1110×740, 30fps). **Only** front-wheel mask/repair changed vs prior v2; background, route, hold frame unchanged per `C2/video-v2-fix-r1/check.md`. |
| Derivative 2 (web deliverable) | `ffmpeg -i <R1> -i <jimeng_raw> -map 0 -c copy -map_metadata 1 -movflags use_metadata_tags+faststart` → `public/assets/videos/home/bmw-drivein-web.mp4` (PM **#9317** / QA **#9321**). Video stream copied only; container metadata from Jimeng raw. |
| Site playback | `advisory-office.js`: in-view muted **loop** (same as cards 1–2); `preload=none`; reduce-motion → poster still only. |
| Prior gap | `534a31c` no tags; `bfae271`/`48c23c55` exiftool paths — **rejected** (#9314, QA **#9321**). Canonical fix: `map_metadata 1` above. Optional `scripts/legal/exiftool-jimeng-keys.config` kept for non-ffmpeg replay only. |

### In-frame AI label / crop

- Jimeng source is 1112×834; published loop is 1110×740 (R1 delivery crop/aspect for home card). Motion `delivery-proof.cjs` / `review/delivery-frames/` are the acceptance frames for the **published** loop.
- Jimeng → R1 reframes 1112×834 → 1110×740 (aspect for home card). Corner spot-check @t≈3.5s: no readable Dreamina **画面角标** on raw vs R1 (dark scenery dominates corners; `aigc_label_type":0` = metadata label). Motion delivery strip also shows no corner badge.
- Primary compliance record: **container metadata** from raw download via `ffmpeg -map_metadata 1` (not removed by silent re-encode).

## Sidecar for 法务

`docs/research/legal/jimeng-metadata-sidecar.json` — publish command + verification (MD5 + `exiftool -a -G1 -s` Keys tags).

## Sign-off

Re-request **法务通过** / **QA 通过** on PR HEAD after `map_metadata` deliverable. Visualqa: same decoded frames as R1 #9238 (MD5 unchanged).
