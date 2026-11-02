# 作品集项目层合格线

harness-core `checks.md` 里写「合格线在项目层」的地方，作品集的数字记在这里。没写进来的，照 harness-core 的规则标「待确认」。

## 网页视频：poster 对第 0 帧

方法见 harness-core `docs/web-video.md`（harness-core #58 合并后才有）。

| | 线 | 用在哪 |
|---|---|---|
| 验收线 | 页面上 poster 对第 0 帧，Chrome 和 WebKit 各自 R/G/B **每个通道**均值差 ≤1 | 审查与 QA 判过不过 |
| 出片自检（不是验收线） | ffmpeg 解码第 0 帧对 poster，R/G/B 每个通道均值差 ≤0.5 | 开发交付前自查 |

- 量验收线之前，先按 harness-core `docs/web-video.md` §5 确认截到的是视频帧，不是 poster。
- 自检超过 0.5 时不算失败，交付里分开写两个差：原片对 poster 的差、转码带来的差（新片对原片）。接不接受由项目经理判断。
- 状态：项目经理定，Lu 未确认。
- 出处：2026-11-02 AI Pet / Gratula 卡片视频重新出片。项目经理在频道里定（事件 c01944d4、7d23b85c）；当晚 Gratula 自检 B +0.67，其中原片对 poster 已是 +0.65，转码只多 +0.02，项目经理判接受。
