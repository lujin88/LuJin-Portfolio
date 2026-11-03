# AI Pet V6 — V2 artwork, unchanged V5 motion

This revision replaces the source with the visual designer's V2 frame: the Chinese key is rotated into its slot, and the upper-right ring gap is repaired. Assignment: Buzz event `5d0dc75e4974bc3fdfa9a738cdb88569d310893fb37c740791cc828405a87e4f`; source delivery `c4e0ad47d7c88995508530121dd3dc08fe8021f052dc41c89fc3bca3525c47d8`, portfolio channel `4d529583-4dcf-4804-816e-94f63f30634b`.

`FRAME0.png` is an unchanged copy of `OUTBOX/AI_PET_ZH_FR_DE_20261103/AI_PET_ZH_FR_DE_FRAME0_V2.png`, SHA-256 `42253c02bdb2e6eaa6e014b445e45e0792e8bbc708bd5502ab92ed8e32dea5b6`. The 192 motion parameter sets equal V5. Render, preview and check scripts match V5 except the output version name. V5 remains available in the parent directory for provenance; V6 is the current review candidate.

8 seconds, 24 fps, 896×622; 6–8 seconds are still. Same 2.8° peak tilt, 5 px nod, 13 px fin lift and 7 px tail lift at source size. No new expression, dissolve or reversal. The language console is outside the displacement field. Fixed-QP 18 all-intra H.264 preserves identical decoded endpoints, with a filesize tradeoff. No audio. The opaque card background comes from the supplied artwork; this is not a transparent character or a Rive state machine. `POSTER.png` is the static fallback. There are no integration input names or state-machine inputs.

Purpose and exclusions are unchanged from the parent README: an occasional homepage character preview; no whole-console rocking, changing language panels or regenerated expressions. No motion-design skill was needed for this source-only rerender. `rive doctor` passed before rendering. This checkout has no `design-system/README.md`. The homepage and port 3000 are untouched. No gestures require phone testing; real-device decoding remains unverified.

## Reproduce

Use Python with numpy, Pillow and OpenCV; FFmpeg with libx264; Playwright and installed Google Chrome. This session used `/Users/lu/.buzz/.scratch/hiw-stabilize/bin/python`. The default capture script also checks the existing WebKit runtime; missing WebKit is reported, not installed.

```sh
python render.py --out /absolute/path/to/new-output
python check.py /absolute/path/to/new-output
cp PREVIEW.html /absolute/path/to/new-output/PREVIEW.html
TEST_LOCK_CHANNEL=4d529583-4dcf-4804-816e-94f63f30634b /path/to/harness-core/scripts/test-lock.sh node capture.cjs /absolute/path/to/new-output
python check-browser.py /absolute/path/to/new-output
python prepare-share.py /absolute/path/to/new-output
```

`prepare-share.py` crops actual browser recordings to their measured card bounds and strips metadata without changing decoded frames. Slow recording uses video playbackRate 0.25 and crosses the loop seam. Reduced-motion recording checks that video is paused and hidden. `PREVIEW.html` pauses offscreen or when the tab is hidden.

Artifacts: `OUTBOX/AI_PET_HOME_VIDEO_20261103/ZH_FR_DE_LOCAL_V6/`. No paid generation or API submission was made: submit_id none, debit 0; no balance query was needed. This is media review, pending Lu's judgment, independent visual QA and developer integration. No package test script exists; direct media and browser checks validate this change. `pnpm install --frozen-lockfile` passed.

## V6 verification

- MP4: 192 frames, 24 fps, 896×622, no audio; share file 12,687,579 bytes. SPS and colr both encode primaries 1 / transfer 13 / matrix 1 / limited range 0.
- 432×300 decoded loop and hold-entry MAE: 0/255; adjacent median 0.388/255. All 48 hold frames equal frame zero. Maximum adjacent frame-mean luminance delta 0.0162/255. The fixed console can have codec differences up to 11/255 at source size; this is not a claim of bit-identical background pixels throughout.
- Chrome poster→frame-zero mean absolute R/G/B: 1.415 / 1.224 / 1.602. WebKit: 1.684 / 1.385 / 1.897. Browser frame zero was verified through currentSrc, readyState 4 and a completed seek. At 2 seconds the video differs from frame zero; 6 seconds and the last frame match it exactly.
- Normal, 4× seam and reduced-motion browser recordings have no page errors. Reduced motion pauses and hides the video; 390 px reduced-motion layout has no horizontal overflow. Contact-sheet inspection found no visible watermark.
- Test lock: `[test-lock] 开始 12:13:58 负载 8.44 8.79 7.85 排队 0 秒`; `[test-lock] 结束 12:15:06 负载 21.82 12.27 9.20 退出码 0`.
- Metadata-cleaned share copies have the same decoded frame hashes as their pre-cleaning files. Details in the JSON evidence alongside this README. These checks used base commit 4661980 plus the V6 files in this revision; they are media checks, not independent QA or a production build.

## Review assets

- [AI_PET_ZH_FR_DE_LOCAL_V6_SHARE.mp4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/858f54e9ca3a4995f524cb3151f6584f2fd2e01ff7a0fda5644fc4a031db4d2e.mp4)
- [NORMAL_CARD_SHARE.mp4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/668cf45f69a03490c6cab5a1e52d89a4481c6ca7e0d991829ed433f85deec7da.mp4)
- [SEAM_4X_CARD_SHARE.mp4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/5fa00f30059f5c07ce63b266ab09d8fbd9038323592471be12a6748cdbf13f22.mp4)
- [REDUCED_CARD_SHARE.mp4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/566026eab8f366cd44d2c483e2f05b2613571e8cd246afcd7e608eee987fba3e.mp4)
- [POSTER.png](https://buzz-wwbf.srv2056990.hstgr.cloud/media/37a71b932b9090ec0b88ba1f7f25d3a07d9e11862ab0c7d630da7e9433b72204.png)
- [CONTACT_SHEET.png](https://buzz-wwbf.srv2056990.hstgr.cloud/media/b5893fc84e53aeb219236c3e0f322a5703458ecd273d251d4bfc4ac72558de24.png)
