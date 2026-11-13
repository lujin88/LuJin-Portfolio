法务要改 — CA03 本地未提交快照

> 2026-11-12 18:34 CET 更新：下文保留为修复前审计记录。#9593 元数据阻塞已关闭，已审五文件本地复核通过；当前结论见 [元数据复核](2026-11-12-ca03-metadata-recheck.md)，不代表基底 SHA 已获正式 PR 签字。

2026-11-12 · Legal & Privacy · #lu-portfolio / #8610 · 任务 #9582、#9591。

结论：当前交付视频丢失原片的平台 AI 来源标识，暂不签本地通过。原 B 图来源缺口此前已关闭，无需重复索要。这里只审本次发布差异，不是法律意见或全站合规认证。

## 范围与证据

- 工作区：`/Users/lu/LuJin-Portfolio-worktrees/webdev`，分支 `design/ca03-nod-session-03`，基底 HEAD `450261d76604e31e57c04603e6d8a1de81a749c2`；本次五个文件尚未提交，不能将基底 SHA 当作审过的提交签字。
- 审核三份 session-03 组件/CSS 和两份 public 媒体；逐文件 SHA、媒体 stream 与元数据键名见同目录 `2026-11-12-ca03-local-evidence.json`。根目录 QA 截图不在拟提交范围。
- 当前 MP4 SHA256 `7539ded0cc37fece6817f3df80e1aa0bd37fa9203f0c4d37aae5ce5c9c465fcb`，606781 bytes，与 motion final 交付字节一致。
- 原片 SHA256 `ded4ca5ec7c10469b3a75c006faa6f2f3f4080b3db297fa1ef946dada7ea4399`；路径 `~/.buzz/OUTBOX/CA03_NOD_MOTION_1112/rerun-v3/out/original/4667c152-c692-4384-a69b-151ed91ea9dd_video_1.mp4`。
- poster SHA256 `0cd7dcb0fabaf1ff94859cbab1d6bfee3205e268b80c02546d99805ffba99682`，与已审 PR #177 的 B 图完全一致。
- 独立用 ffprobe 和 exiftool（含 unknown tags）比较原片与交付；读取 motion 的 out/check.md、final/COMPOSITE_NOTES.md 和 composite-manifest.json；目检合成边界接触表。没有向外部上传媒体或授权材料。

## 检查表

| 项目 | 问题 / 结论 | 依据 | 建议怎么改 | 阻塞上线吗 |
|---|---|---|---|---|
| 平台 AI 标识 | 原片有 `Keys:UserComment`（含 aigc_label_type/source_info）与 `Keys:LvMetaInfo`；交付片两个字段均不存在。自加 title/comment 的 AI-generated 描述不能证明保留了平台标识。保留本地原片也不等于发布副本已保留 | 独立双工具结果；[即梦用户协议 §4.2](https://lf9-cdn-tos.draftstatic.com/obj/ies-hotsoon-draft/vco/17620dba-f821-4a18-85f9-b8b11f73304a.html) | motion/webdev 在派生发布片保留原平台字段及值，并保留独立派生说明；用两工具验证原键名与值一致，勿改成 Artwork/XMP 的其他键。同步 manifest/来源文档与新 hash。不需重新生成或改动视频画面 | **是，当前不能签通过** |
| 输入来源 / 肖像 / 输出权利 | B 图已在 #177 依据 Lu #9262 的自制 GPT、无真人/图库参考声明审过；本次输入和底图链可追到 B。当前记录无新增外部参考 | [既有法务结论](https://github.com/lujin88/LuJin-Portfolio/pull/177#issuecomment-6826550568)；本轮生成、合成记录；[即梦协议 §§4.1、9.2](https://lf9-cdn-tos.draftstatic.com/obj/ies-hotsoon-draft/vco/17620dba-f821-4a18-85f9-b8b11f73304a.html) | 保留制作链；不把服务条款当作输出独占、不侵权或全世界使用的保证；不重复要求已补的原图声明 | 无本次新增来源阻塞 |
| 音频及文件内容 | 原片含 AAC；交付实际只有 H.264 视频，无音轨。poster 无 EXIF/XMP。所看接触表未见客户记录、账户信息或文字；不把缩略图检查当成逐帧无水印证明 | ffprobe/exiftool；上述接触表及作者自查 | 保持无音轨；标识修复时核对视频编码负载不变。若涉及可见平台标识，不得裁掉或遮挡 | 无独立新增阻塞 |
| 页面文案、品牌与隐私 | 本次仅增加本域视频/静图及播放控制、隐藏小屏 quotes；没有改引用文字、UBS 声明或法律页。组件没有新增 cookie、存储、采集字段、埋点、第三方播放器或生成服务请求 | 完整差异及新增组件；[FDPIC 告知义务](https://www.edoeb.admin.ch/en/duty-to-provide-information) | 未发现本次差异触发的 Impressum/隐私告知更新需求；继续沿用现有本域托管。不声称全站 FADP/GDPR、cookie、后台保留期限或访问权限全面合规；未做浏览器网络重审 | 无本次新增阻塞 |
| 画面 / 无障碍交接 | 静图 alt 保留、视频 aria-hidden；reduce 逻辑不加载视频。动作和拼接属于已安排的 QA/visualqa 范围 | 组件源码；QA #9584；PM #9527/#9570 | 视觉仍需独立验收；不把 Lu 接受动作当作标识许可豁免 | 法务不代替视觉签字 |

官方条款与 FDPIC 页面本轮在线核对。标识整改是基于平台条款和文件证据的发布检查，不宣称某工具或字段格式由瑞士法律指定，也不判断中国标识法对本网站的域外适用。

交接：请 PM 协调 motion/webdev 修复实际交付及本地 public MP4，同步哈希和来源说明后由 legal 复核；先按当前本地流程验收，再推一次。新 PR 出来后按实际 HEAD 与审过文件对应签字。PR：尚无；旧 #177 仅为 B 图来源依据。未改 webdev 工作区、未 push/合并/部署，未操作 3000。
