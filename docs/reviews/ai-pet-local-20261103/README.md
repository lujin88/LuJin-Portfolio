# AI Pet local motion preview — 2026-11-03

Local motion from Lu's approved Chinese / French / German frame, for the homepage project card. PM assignment: Buzz event `28e2d179754106eab462eea6d97191dc5a4d4f4dcd5db6ebb943e34c9f437158` in channel `4d529583-4dcf-4804-816e-94f63f30634b`.

This is an isolated media review. No homepage, production assets, port 3000 service, or deployment was changed. No Rive state machine is used or proposed. `rive doctor` passed before rendering. Project root AGENTS.md and harness-core AGENTS.md, motion.md, web-video.md and motion-designer role were read; this checkout has no design-system/README.md or motion token file. Timings/amplitudes below are review parameters, based on the requested local-motion fallback and two-second hold, not new design tokens.

## Behavior and editable source

`FRAME0.png` is an unchanged copy of `OUTBOX/AI_PET_ZH_FR_DE_20261103/AI_PET_ZH_FR_DE_FRAME0.png`. `render.py` samples the original texture through a local displacement field: two small head tilts (peak 2.8 degrees), a 5 px nod, up to 13 px fin lift, and a 7 px tail lift. Units are at 896×622 source size; fin amplitude is about 6.3 px at the 432×300 review card. There is no whole-image transform, generated frame, dissolve, reverse playback, new feature or color. Expression pixels remain those of the approved cheerful face; this is a small idle performance, not three new facial expressions.

8 seconds at 24 fps; motion settles by 5.7 seconds, and 6–8 seconds are fully still. The loop hard-cuts to the same first image. The media is an opaque full-card image, as requested, rather than a transparent character cutout. `POSTER.png` is the static reduced-motion fallback. The isolated preview pauses when hidden/offscreen and displays the poster under reduced motion. There are no gestures requiring phone testing; actual phone decoding/performance still needs review.

The old V1–V3 source and GENERATION_PLAN.md were inspected and preserved. We reused the approved scene, 24 fps review approach and final-hold plan. V3's cut into the hold measured 2.594/255 against a full-clip adjacent median of 0.712 at 432×300, so its motion was not reused. The first new encode (V4) had exact source seams but CRF changed the reconstruction of identical frames; it was rejected. V5 uses fixed QP 18 and all-intra H.264 so identical source endpoints reconstruct identically. This trades filesize for deterministic seam validation; any later optimization needs fresh checks.

## Purpose and rejected alternatives

Frequency: one visible marketing card, with a pause and reduced-motion still. Purpose: show the pet's attentive presence. Speed: an ambient 8-second media loop, not an interaction response. Function: the card text and language buttons remain readable.

Rejected: whole-console rocking/zoom (spatial stability); glowing/changing flag panels (language readability and source fidelity); regenerated mouth/eye expressions (unnecessary model drift in the smallest fallback); blending back to frame zero or reversing footage (explicit brief prohibition).

## Reproduce

Python needs numpy, Pillow and OpenCV; encoding needs FFmpeg with libx264. Output directories are append-only per version; FFmpeg refuses to overwrite. The input is a source PNG, not an encoded YUV video, so there is no unknown input matrix. Conversion is explicitly RGB to BT.709 matrix, limited range, with sRGB transfer.

```sh
python render.py --out /absolute/path/to/output
python check.py /absolute/path/to/output
cp PREVIEW.html /absolute/path/to/output/PREVIEW.html
TEST_LOCK_CHANNEL=4d529583-4dcf-4804-816e-94f63f30634b /path/to/harness-core/scripts/test-lock.sh node capture.cjs /absolute/path/to/output
python check-browser.py /absolute/path/to/output
```

`capture.cjs` uses installed Chrome and the installed Playwright WebKit runtime; set PLAYWRIGHT_ROOT to the directory containing playwright and playwright-core. Native browser recordings: normal speed, loop seam at video playbackRate 0.25 (CDP animation rate does not slow a video element), and reduced motion. No site test suite exists in package.json; the isolated media workflow is validated directly. `pnpm install --frozen-lockfile` passed before push.

No paid generation was submitted this round: submit_id none, actual debit 0. This review still needs Lu's motion judgment, independent visual QA and developer integration. Large MP4s and recordings stay in OUTBOX and the linked review assets, not in Git.

## V5 evidence

- Source render: 896×622, 24 fps, 192 frames, 8 seconds. Original encode 12,584,229 bytes; metadata-clean share 12,583,567 bytes. All decoded frame hashes are identical after metadata cleaning (`SHARE_VERIFICATION.json`). No visible watermark was found in the sampled frames.
- At 432×300: loop and hold-entry MAE 0; adjacent-frame median 0.380/255. All 48 hold frames equal decoded frame zero. Maximum adjacent-frame mean luminance change 0.019/255; full-clip mean luminance drift from frame zero 0.146/255. This is frame-mean luminance, not a claim that every moving pixel differs by ≤2.
- SPS primaries/transfer/matrix/range = 1/13/1/0; MP4 colr = 1/13/1/0. No audio stream. Browser video state was confirmed at readyState 4, matching currentSrc, with seeked completed and currentTime 0; t=2 differs visibly and numerically.
- Chrome poster→frame-zero mean absolute RGB: 1.431 / 1.239 / 1.625. WebKit: 1.694 / 1.399 / 1.912. All channels below 2/255 at the review card size. Both browser endpoints/hold screenshots match frame zero exactly.
- The texture deformation is zero on the language console. In the encoded video, the fixed console region has isolated codec reconstruction differences (maximum 11/255 at source size); do not interpret that as a claim of bit-identical background pixels throughout motion.
- Browser recordVideo captured 432×300 card in a 960×720 review viewport; 390 px mobile reduced-motion layout has no horizontal overflow. This is an isolated review shell, not the live homepage.
- Test lock: start 11:40:27, load 22.07 16.57 17.08, queue 0 seconds; end 11:41:17, load 13.17 14.90 16.43, exit 0. These are media/browser checks, not an independent QA approval or production build.
- Dreamina balance query returned **422**; this round had no submit_id and spent **0** credits.

Artifacts live in `OUTBOX/AI_PET_HOME_VIDEO_20261103/ZH_FR_DE_LOCAL_V5/`. V1–V4 remain untouched for provenance and are not the deliverable. `share-media.py` (copied from the existing workspace helper) strips encoder/ancillary metadata without re-encoding and preserves sRGB color tags. Use SHARE files when posting to Buzz.

- [Final MP4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/ae05b8d226352be8cb87aec4283ef7bd5e02645a1f38488d3f5e2fd7720ae3a9.mp4)
- [Card-size normal-speed browser recording](https://buzz-wwbf.srv2056990.hstgr.cloud/media/4939f1ad8bdfd3db9d34840b1c8b65bd86d62696fdab201f06feda52b6222af4.mp4)
- [Loop seam at 4× slower speed](https://buzz-wwbf.srv2056990.hstgr.cloud/media/1bb7e438edd284f85492d85b49d9f420acd5b3299b56ffa255cae973d0ac3670.mp4)
- [Contact sheet](https://buzz-wwbf.srv2056990.hstgr.cloud/media/b85d8f2b1145bbf73b9d9771603905ac6ed17adbe20e6e7bec3c2425943feb2f.png)

For review without re-rendering, download the final MP4 alongside PREVIEW.html as `AI_PET_ZH_FR_DE_LOCAL_V5.mp4` and copy FRAME0.png alongside it as POSTER.png. The renderer produces a metadata-cleaned PNG poster with the same RGB pixels.
