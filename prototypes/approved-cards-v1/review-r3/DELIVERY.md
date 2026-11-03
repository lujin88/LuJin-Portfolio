E.ON revision 3 makes the foreground window reflection visibly ripple at native 448px. The main change covers the pool's reflected warm light instead of relying on the narrow distant lake strip. Movement runs throughout 0–6s, then the original image holds for 2s before a hard restart. Sky, panels, architecture and window light remain fixed. Dolphin animation and exports remain at the accepted revision 2.

**Review only. Hold for QA and Lu; do not merge or deploy.** This update touches only `prototypes/approved-cards-v1/`. The PR also retains earlier studies in `prototypes/index-micro/` and `prototypes/index-micro-v3/`. No production wiring or port 3000 changes. Editable JS/PNG sources remain available; this is a photographic raster preview, not a Rive state machine.

Validation at native 448×280 uses max RGB-channel difference per pixel and chooses the strongest frame by >8/255 pixel count across all 192 frames. At frame 53 (2.2083s):

- >8/255: 2,538 pixels, 2.023% of the full card.
- >24/255: 1,064 pixels, 0.848%, versus revision 2 QA's 373 pixels / 0.297% (2.85×).
- >48/255: 422 pixels. The encoded MP4 still has 981 pixels >24/255 (0.782%) at this frame.
- All 143 adjacent active frame pairs change; all 48 final source frames equal the original. The side-by-side visibly shows the long warm reflection bending; QA/Lu decide final acceptance.

384 new source frames checked across the 864×540 master and 448×280 review. Reduced-motion switching, pause, offscreen pause and the 448px review layout pass. The dolphin's existing exports were copied byte-for-byte for regression checks, not regenerated. Original image assets and dolphin shader are unchanged.

Encoding uses the accepted RGB → limited-range BT.709 conversion with sRGB transfer. SPS/colr are 1/13/1/tv; keyframes 0/144. Source first/last/restart are identical. In the 448px MP4, final ten adjacent frame pairs have zero difference; the hard restart has MAE 1.106/255, max 22 from compression. First frame of loop two equals loop one exactly. Other hold pairs have max 3/255, largest MAE 0.0031. Upload sanitization preserves the decoded video hash.

Chrome window mean RGB error: −0.172/+0.064/+0.247; automated WebKit: −1.015/+0.311/+0.145. Real iPhone Safari remains untested.

Artifacts and reproducible audit scripts: `OUTBOX/APPROVED_CARDS_MOTION_20261103/REVISION_3/DELIVERY/`; compact reports in `review-r3/`. Includes normal, 4× slow, reduced still/video, first/last, first/peak, source hashes and upload audit. Local preview: http://localhost:4658/REVIEW.html (448 CSS px, LaunchAgent, HTTP 200).

[448px two-cycle recording](https://buzz-wwbf.srv2056990.hstgr.cloud/media/9e371fc6abc73eed7588a25fc6b9da5ef9acef5acf0277a7ecd72cfbaf60eb22.mp4) · [Approved dolphin revision 2](https://buzz-wwbf.srv2056990.hstgr.cloud/media/9b1a4762fe2aeb9cdaee109db1fa2b4fa8e3cc59d208cfdd2f7a24d8c4a75975.mp4)

Before, revision 2 comparison from QA:
![Revision 2 first and peak](https://buzz-wwbf.srv2056990.hstgr.cloud/media/80bd267b2bae3e91d6f136f1d77692a77d80327a095087d62331ea1ca2314d6f.png)

After, revision 3 original left / strongest frame right, each 448×280:
![Revision 3 first and peak](https://buzz-wwbf.srv2056990.hstgr.cloud/media/8d5ba1a381719bb5cb3332b4d2ccdbbd3dff8becc7db3772920019f26ef7cd02.png)

![Revision 3 first and last](https://buzz-wwbf.srv2056990.hstgr.cloud/media/2641b11b072cbc02e9444c22fe7ca861b77f74ec77431fbd15977294cd44c9b5.png)

Browser-lock evidence (CET; all exit 0):

```text
[test-lock] 开始 16:27:56 负载 17.53 15.30 13.92 排队 0 秒
[test-lock] 结束 16:28:23 负载 13.26 14.49 13.67 退出码 0
[test-lock] 开始 16:28:54 负载 11.14 13.85 13.47 排队 0 秒
[test-lock] 结束 16:29:38 负载 11.33 13.45 13.34 退出码 0
[test-lock] 开始 16:29:46 负载 10.50 13.24 13.26 排队 0 秒
[test-lock] 结束 16:30:09 负载 10.77 13.07 13.20 退出码 0
[test-lock] 开始 16:30:35 负载 21.96 15.54 14.09 排队 0 秒
[test-lock] 结束 16:31:04 负载 23.19 16.28 14.39 退出码 0
```

Remaining: QA/Lu visual approval, real iPhone Safari. No production integration, continuous dolphin fin tween, new application inputs or Rive export. Assignment: Buzz `6ce4744ab206ea61606052adc28dd4a6f996f1825d1ce622e487190d7caccc61`, channel `4d529583-4dcf-4804-816e-94f63f30634b`. The PR has had two QA returns and remains held for PM/QA/Lu review; no automatic merge.
