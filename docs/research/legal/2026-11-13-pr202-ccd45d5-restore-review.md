# PR #202 原菜单恢复：法务增量复审

2026-11-13；线程 #11790，QA #11862。Reviewer: Codex / OpenAI（Legal & Privacy）。非法律意见。

结论：法务通过 ccd45d5183704e36061a6af90f5b7dbf222ab25f，仅限此次三文件恢复。独立执行 git diff b26cdfd ccd45d5，组件与双语文案完全一致，CSS 唯一额外变化为手机菜单限高/滚动。不继承 #195 签章，不因曾上线而自动放行。

| 项目 | 问题／结论 | 依据 | 建议怎么改 | 阻塞上线吗 |
| --- | --- | --- | --- | --- |
| BMW 文案恢复 | BMW Design System 比新版标题范围窄，仍与 Lu 参与设计系统工作的记录一致；Vehicle controls / Fahrzeugsteuerung 与 Light & dark / Hell & Dunkel 描述展示内容，未新增已上线、独占所有权或官方背书宣称。现有 BMW 页面也记载车辆功能及明暗模式；这只是内容一致性核对，不是独立事实或授权证明 | [固定导航文案](https://github.com/lujin88/LuJin-Portfolio/blob/ccd45d5183704e36061a6af90f5b7dbf222ab25f/global-header/lib/header-copy.ts)、[项目事实](https://github.com/lujin88/LuJin-Portfolio/blob/ccd45d5183704e36061a6af90f5b7dbf222ab25f/content/ask-lu/cases/automotive.md)、[BMW 页面文案](https://github.com/lujin88/LuJin-Portfolio/blob/ccd45d5183704e36061a6af90f5b7dbf222ab25f/app/i18n/messages/bmw.ts) | 本次恢复无需法务改文案；后续新版命名交 Copy | 无新增阻塞 |
| 概念项目提示 | 删除分类标签，但恢复的桌面/手机菜单展示 meta；MAN 明示 Hackathon，ETF 明示 Interactive prototype / Interaktiver Prototyp。未将概念归入真实项目，也未宣称商业上线；自发概念的表述精度较新版低 | [固定组件](https://github.com/lujin88/LuJin-Portfolio/blob/ccd45d5183704e36061a6af90f5b7dbf222ab25f/global-header/components/site-header.tsx)、固定双语文案；既有 COPY_NAV_BMW_1113/REVIEW_SPEC.md | 后续重设计保留明确概念提示；不要求此次紧急恢复混入新分类设计 | 无新增阻塞 |
| 素材与依赖 | 恢复既有缩略图展示，非新增资产；三文件无图片、字体、依赖或许可证文件变化。既有资产未逐一重新核权 | [三文件差异](https://github.com/lujin88/LuJin-Portfolio/pull/202/files)、基线 b26cdfd 对比 | 不扩大为 BMW/客户素材公开授权证明；既有素材审查事项继续保留 | 本恢复范围无新增阻塞 |
| 隐私、cookie、Impressum | 没有新增采集、服务、外部端点或存储代码；语言模块、既有 mailto、隐私政策与 Impressum 未改；CSS 滚动不引入数据处理 | 固定组件与 [CSS](https://github.com/lujin88/LuJin-Portfolio/blob/ccd45d5183704e36061a6af90f5b7dbf222ab25f/global-header/header.css)、完整变更清单 | 不需因本增量新增告知；不代表全站 FADP/GDPR 或运行时 cookie 合规认证 | 无新增阻塞 |

依据边界：审查是恢复差异与事实范围核对，不作法规适用判断。检索瑞士 UWG 第3条作为声明审查背景；[Fedlex 官方入口](https://www.fedlex.admin.ch/eli/cc/1988/223_223_223/en)本次只返回 JavaScript 占位页，未据此宣称已核当前法条全文。签核结论依据上列可核源码及既有项目记录。

未改产品、3000、客户素材或页面正文；未跑浏览器/构建，不替代 QA/视觉。按线程 #11861/#11862，验收后交 PM，由 Lu 合并；本角色不执行发布。
