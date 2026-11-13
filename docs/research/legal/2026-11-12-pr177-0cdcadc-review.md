法务通过 0cdcadc48c8f09fac40816b9df35af3391e3a531

# PR #177 — CA03 图片来源复核

2026-11-12 · Legal & Privacy · #lu-portfolio 线程 #8610，任务 #9265 / #9272。

结论：此前 028b238 审查中的原图来源待确认项与两处文档错误已解决；对当前 HEAD 的这次换图无剩余法务阻塞。本结论依据原制作人声明及留存证据，是发布差异检查，不是法律意见、权利担保或全站合规认证。

## 核验范围

- [PR #177](https://github.com/lujin88/LuJin-Portfolio/pull/177) 相对 base `0dbb97b86b2aaac6cb4635f28536b5e8f48ba153` 仅替换一张 WebP、增加一份来源说明。
- 直接核对当前 Git blob：`public/assets/images/client-advisory/session-03-advisor.webp`，1400×755、33,434 bytes，SHA-256 `0cd7dcb0fabaf1ff94859cbab1d6bfee3205e268b80c02546d99805ffba99682`，与 `9b19c60` 完全一致。RIFF 仅有 VP8 块，无 EXIF/XMP；目检未见客户记录、账户信息或文字。
- 已读本轮 README、prompts.json、历史 provenance/README.md；本轮参考仅为旧底图，提示词明确虚构人物。原 PNG 的 C2PA 是辅助来源声明，未验签，不充当授权书。
- Lu 在 #9262 直接确认原图由自己用 GPT 生成、没有使用真人照片或图库参考；PM #9265 明确将其作为原制作人声明交法务复核。该声明已经准确写入当前文档。未要求公开账户凭证。
- 当前来源文档已经区分原 PNG 的 caBX/C2PA 与生产 WebP；EN/DE `research.photoAlt` 仅描述场景，文档已不再声称存在 fictional/staged 标注。
- 当前 SHA 的 QA 已贴 [通过评论](https://github.com/lujin88/LuJin-Portfolio/pull/177#issuecomment-6826497166)。

## 检查表

| 项目 | 问题 / 结论 | 依据 | 建议怎么改 | 阻塞上线吗 |
| --- | --- | --- | --- | --- |
| 原图与本轮编辑使用权 | 原制作人已补齐生成归属及无第三方参考声明；本轮只编辑该底图。对本次使用未发现尚缺许可的外部输入 | Lu #9262、PM #9265；留存生成/转换记录；[OpenAI 欧洲条款 Content](https://openai.com/policies/eu-terms-of-use/)；[Services Agreement §§4.1、4.3、4.4](https://openai.com/policies/services-agreement/)；[IPI 使用作品说明](https://www.ige.ch/en/protecting-your-ip/copyright/using-a-work) | 保留声明、原图和编辑记录。两套 OpenAI 条款均将双方之间的输出权利归于用户/客户，并要求输入权限；不据此保证输出独占或不涉及第三方权利，也不反推具体账户类型 | 否，原来源缺口已关闭 |
| 肖像与隐私 | 依据制作人声明及本轮虚构人物提示词，无已知真实人物参考；不凭面孔外观推定身份或匿名化 | 上述来源证据；[FDPIC Photos and privacy](https://www.edoeb.admin.ch/en/photos-and-privacy) | 本次不要求为虚构人物补真人肖像授权；若以后出现真实人物或第三方参考的相反证据，重新审查 | 否 |
| 来源说明准确性 | 两处错误已修：原 PNG 有未验签 C2PA；现有 alt 没有虚构/摆拍声明 | [当前来源文档](https://github.com/lujin88/LuJin-Portfolio/blob/0cdcadc48c8f09fac40816b9df35af3391e3a531/docs/research/legal/2026-11-12-pr177-session-03-advisor-provenance.md)；当前 ca.ts 的 EN/DE research.photoAlt；028b238→0cdcadc diff | 保持事实描述；本轮无需更改页面正文 | 否 |
| 文件保密与元数据 | 最终图片无 EXIF/XMP，未见客户信息；没有改 ca/image/ 或客户文案 | 当前 blob 的 RIFF 解析、哈希、目检及完整两文件 diff | 清晰度与合成接缝交 visualqa | 否 |
| Impressum、隐私政策、cookie、FADP/GDPR 数据流 | 本次无代码、采集字段、统计、依赖、外链或托管配置变动，未发现由此次差异引起的法律页面/同意机制更新需求 | 完整 diff；图片来源声明；FDPIC 上述图像隐私说明 | 本结论仅限差异；没有重做全站隐私及 cookie 审计，也未验证后台保留期限/访问权限 | 否，范围外事项不在本次认证 |

官方来源于本轮在线核对。现行条款仅作为本次使用的审查依据，未声称核实九月生成时的账户合同版本；既有来源链加原制作人声明足以关闭本轮已提出的来源缺口。

交接：请 visualqa 按同一 HEAD 检查桌面、手机与 2x 清晰度及面部拼接；通过后由 QA 按项目流程合并。法务未合并、部署或更改站点。本报告取代此前对 028b238 的“来源待确认”状态，仅适用于当前 HEAD。

