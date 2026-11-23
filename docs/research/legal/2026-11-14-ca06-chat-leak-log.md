# 泄露日志：CA06 对比图把 UBS 原图左半边发进聊天（2026-11-14，非法律意见）

触发：PM #12521（交 17:30）。保密依据：`ca/image/` 为保密的 UBS 截图；本频道此前约定「左侧保密原图只做对照，不贴不推」（PM #12459）。

## 事实（本轮核对 `~/Scranton/data/agentchattr_log.jsonl` 与 `~/Scranton/uploads/`）

| 消息 | 发送者/时间 | 附件 | 文件现状 |
| --- | --- | --- | --- |
| #12381 | webdev 15:29 | idea-body-pair-1440.png（/uploads/12586ae6.png） | **仍在 uploads/** |
| #12398 | webdev 15:49 | main-pair-1440-html.png（b457afc6） | **仍在** |
| #12399 | visualqa 15:49 | draft-main-1040.png（f38c18d8，文件名对应「draft vs ubs-ref」对照图，是否含左半边未目检）| **仍在** |
| #12408 | webdev 15:50 | main-pair-1440-html.png（67df7164） | **仍在** |
| #12423 | webdev 15:53 | main-pair-1440-html.png（12fb8dc4） | **仍在** |
| #12441 | webdev 15:57 | main-pair-390-html.png（77f622a0） | **仍在** |
| #12469 | webdev 16:04 | main-pair-1440-html.png（3bc2b5d6） | 原图已被 PM 挪到 `quarantine/12469-leak-3bc2b5d6.png`（SHA-256 bb3872fe…，与我 11-14 审查用的同一文件）；**缩略图 `uploads/.thumbs/3bc2b5d6-960.webp` 仍在** |

- 不止 #12469：至少 7 条消息带对照图（#12381 的 idea-body 对照未目检是否含左半边）。PM 只处理了 1 条。
- `agentchattr_log.jsonl` 里 #12469 的附件记录（url 字段）仍在；聊天界面里其他 6 个链接仍能打开。
- 范围：Scranton 本机聊天，频道成员含各队友及 @grok（Grok Bot，外部服务）。仓库、GitHub、Vercel：未发现推送（worktree `.review-shots/` 在 .gitignore；`git check-ignore` 已核对 quarantine 路径）。

## 未能核实

- Grok 是否读到这些图：`chat_read` 会返回附件 url/file_path，#12469 在频道里约 24 分钟（16:04–16:28）。日志里 Grok 在 #12469 之后只发了 #12499、#12514（屋顶动效），无引用图片的迹象；但这不能证明没有读图，也没有服务端读取日志。待确认。
- 其他队友的模型是否把图发给了外部服务：同上，无法从本机核实。
- 7 张图里原图左半边是否都含可识别的 UBS 名称/客户资料：只重新目检了 main-pair-1440-html.png（左侧有 UBS 标志、「Pierre Brandtner」等原界面内容，属保密）。

## 建议（我没有动 Scranton 目录，也没有删文件）

1. 请 PM 或 @harness 把上面 6 张 + 3bc2b5d6 缩略图挪进 quarantine（Scranton 目录由 Lu 运行，我不改）。不要删，保留可恢复。
2. 以后对照图只在本地目录发路径，聊天里只贴右侧虚构稿（可裁掉左半）。
3. 请 PM 问 Grok 一句是否读取/转存过这些附件，并把答复记在这里。
4. 这条是否要告知 UBS/客户：是合同保密条款问题，待确认，建议问律师（我没有合同）。
5. 我 11-14 的 CA06 审查结论不变：本地可看，公开仍需 UBS 书面同意。
