# Home BMW case card — drive-in video (PR #178)

2026-11-12 · thread **#8673** · legal **#9285** / **#9290**.

## Published asset

| Item | Value |
|---|---|
| Path | `public/assets/videos/home/bmw-drivein-web.mp4` |
| Poster (reduce / fallback) | `public/assets/images/bmw-system/i4-services-car.webp` (unchanged on this PR) |
| Playback | `advisory-office.js` (same as UBS/E.ON); muted loop; reduced motion = still only |
| Pixel source | `~/.buzz/OUTBOX/BMW_DRIVEIN_1112/C2/video-v2-fix-r1/bmw-c2-front-r1-3x2.mp4` (motion R1 front-wheel repair; visualqa **#9238**) |
| SHA-256 (web) | `3d8539543038f38dcbbf4acb42aa1eccd72b6ddf8306c00cf23044fd06a3a007` (metadata remux; H.264 same as R1; was `1807a5c4…` on `534a31c`) |

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
| Derivative 2 (web) | Byte copy of R1 video stream + **metadata remux** (`-map 0:v -map_metadata 1 -c copy` from Jimeng raw; `title` + `comment` carry `UserComment`/`LvMetaInfo` verbatim for ffprobe). Pixels unchanged vs R1; **not** presented as unedited platform export. |
| Prior gap (#9290) | `534a31c` had copied R1 **without** Jimeng tags. Fixed on this branch by remux above + sidecar below. |

### In-frame AI label / crop

- Jimeng source is 1112×834; published loop is 1110×740 (R1 delivery crop/aspect for home card). Motion `delivery-proof.cjs` / `review/delivery-frames/` are the acceptance frames for the **published** loop.
- Spot review: no visible Dreamina corner badge on R1 delivery frame strip (`review/delivery-front-every-frame-020-080.png`); primary platform AI record for compliance is **container metadata** on the raw file, re-attached on the web remux per §4.2 retention (not removed and replaced by silent re-encode).

## Sidecar for 法务

`docs/research/legal/jimeng-metadata-sidecar.json` — frozen copy of raw-download tags + derivative chain + post-remux `ffprobe` tags for PR HEAD SHA. Use with `ffprobe -show_format public/assets/videos/home/bmw-drivein-web.mp4`.

## Sign-off

Re-request **法务通过** on PR HEAD after metadata remux. QA/visualqa unchanged scope: same pixels as R1 unless remux SHA differs from `1807a5c4…` (metadata-only).
