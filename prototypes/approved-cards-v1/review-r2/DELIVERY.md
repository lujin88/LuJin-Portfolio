Revision 2 delivery — E.ON and dolphin

PR: https://github.com/lujin88/LuJin-Portfolio/pull/55
Source: prototypes/approved-cards-v1/ in the existing assets/index-micro-20261103 worktree.
Preview: http://localhost:4658/REVIEW.html (both cards 448 CSS px). LaunchAgent com.buzz.approved-cards-preview-4658 is running; curl returns HTTP 200.

Review files:
- solar448_TWO_LOOPS_UPLOAD.mp4 — native 448×280, two 8-second cycles.
- dolphin_TWO_LOOPS_UPLOAD.mp4 — 864×600, two 12-second cycles.
- solar448_ACTIVE_REGIONS_UPLOAD.png — marked active lake and pool areas, native 448px.
- solar448_FIRST_LAST_UPLOAD.png / dolphin_FIRST_LAST_UPLOAD.png — first left, last right.
- solar_NORMAL.mp4 — 864×540 master; all *_SLOW.mp4 and *_REDUCED.mp4/PNG variants are also supplied.

Source frames: 672 checked. Original first/last/restart and every final 48-frame hold agree exactly. Keyframes 0/144 for E.ON and 0/240 for dolphin; dolphin 249→250 now max difference 0. Other decoded hold transitions: max 3/255, largest adjacent mean <0.004/255. Encoded first/last MAE: 0.908 (solar master), 1.064 (solar448), 0.973 (dolphin). See ENCODE_CHECKS.json.

Both SPS and colr read primaries 1 / transfer 13 / matrix 1 / range tv. Explicit RGB→YUV conversion, sRGB transfer tags. Chrome window mean RGB error −0.22/+0.02/+0.20; automated WebKit −1.05/+0.27/+0.11. Actual media source, readyState 4, completed seek and video time were checked before capture; t=2 and dolphin t=1.18 confirm non-still decoded content. See BROWSER_COLOR.json.

The native 448 lake measurement has 548 pixels >8/255 difference (31.1% of measured lake area), mean RGB change +0.05/+0.01/+0.03. Sky/panel/window source regions remain unchanged. The lake mask excludes foreground reeds. Approval still belongs to QA/Lu.

Runtime: export/source matching, pause, reduced-motion switching and offscreen pause pass; offscreen assertion now waits for the actual observer callback and checks 30 animation frames. Review iframes measure 448px each. See SMOKE.json. Source hashes are in SOURCE_SHA256.json. Upload copies retain decoded frame hashes and colour tags (UPLOAD_CHECKS.json).

Browser lock logs (local CET):
[test-lock] 开始 16:05:48 负载 13.61 11.59 14.92 排队 0 秒
[test-lock] 结束 16:07:01 负载 12.06 11.63 14.67 退出码 0
[test-lock] 开始 16:07:05 负载 11.57 11.54 14.62 排队 0 秒
[test-lock] 结束 16:07:26 负载 9.80 11.13 14.40 退出码 0
[test-lock] 开始 16:11:21 负载 19.73 17.21 16.25 排队 0 秒
[test-lock] 结束 16:11:59 负载 17.89 17.00 16.21 退出码 0

Limitations: no production integration, no Rive/state-machine output, no continuous fin interpolation, no audio lip sync; real iPhone Safari untested. Source photograph backgrounds retained. PR remains unmerged and port 3000 untouched. Earlier drafts and failed harness checks remain outside this final deliverable set.
