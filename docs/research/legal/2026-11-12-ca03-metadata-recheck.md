# CA03 本地法务复核通过（限定待提交五文件）

2026-11-12 18:34 CET · Legal & Privacy · #lu-portfolio / #8610 · 回复 #9602、#9604、#9614。

结论：#9593 的平台标识缺失已修复，解除该项本地法务阻塞。本次针对已审三份 session-03 代码、poster 和 MP4；不把基底 `450261d` 当作本次提交签字。不是法律意见或全站合规认证。

| 项目 | 问题 / 结论 | 依据 | 建议怎么改 | 阻塞上线吗 |
|---|---|---|---|---|
| 原平台标识 | ExifTool `-u -G1` 与 ffprobe 独立比对：final、public 的 `Keys:UserComment`、`Keys:LvMetaInfo` 原名原值与即梦原片一致 | [即梦用户协议 §4.2](https://lf9-cdn-tos.draftstatic.com/obj/ies-hotsoon-draft/vco/17620dba-f821-4a18-85f9-b8b11f73304a.html)，本轮重新在线核对；同目录 recheck-evidence.json | 本项无需再改；发布时保持已审字节 | 否，原阻塞关闭 |
| 发布文件对应 | final、worktree public、4621 HTTP 200 实际响应均为 SHA256 `608bb4de22283595899f51e26d6f96865157fcc5b6c4e000c204dca573ff9452`，607011 bytes；manifest 已记录新 hash | 独立文件散列、HTTP 获取、manifest 和 COMPOSITE_NOTES.md | 新 PR HEAD 核对这些文件后再签正式 SHA | 无本地阻塞；仍需正式 HEAD 对应 |
| 内容与音轨 | 修复前后及 public 的 Annex B H.264 码流 SHA256 均为 `7d9e0659b7768f1e2f38bbbfbe561ce2add4b75f1c5f32764f3d717f2d83324a`；交付仍只有视频，无音轨 | ffmpeg copy 提取散列、ffprobe stream；此前 [本地审查](2026-11-12-ca03-local-review.md) | 沿用前次内容结论；视觉验收独立进行 | 无新增法务阻塞 |
| 来源、页面及隐私 | poster 和三份组件/CSS 的 SHA256 全部与前次审查记录一致，因此沿用前次来源与隐私差异结论；本次不重复索取 B 图授权 | [既有 B 图审查](https://github.com/lujin88/LuJin-Portfolio/pull/177#issuecomment-6826550568)；[前次本地证据](2026-11-12-ca03-local-evidence.json) | 无新增页面文案修改；非全站 FADP/GDPR 重新认证 | 无新增阻塞 |
| 发布边界 | 工作区另有未跟踪 `.mp4.bak`、根目录截图；它们不在已审五文件内 | 本轮 git status | webdev 提交时排除这些文件；备份不要部署到 public | 已审五文件可继续；额外文件不在批准范围 |

证据：[2026-11-12-ca03-metadata-recheck-evidence.json](2026-11-12-ca03-metadata-recheck-evidence.json)。元数据仅记录值的散列和相等性，未复制平台追踪标识原值进报告。

PR：当前无本次 PR，改动尚未提交。剩 visualqa 本地验收，随后 webdev 按 PM 流程一次推送，由各审查者核对实际 HEAD 签字。本次未更改 webdev 工作区、3000 或线上。
