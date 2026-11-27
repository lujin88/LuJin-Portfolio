# 设计系统 linter 首次报告（行 94，2026-11-26，main b3a224b）

命令：`node scripts/lint-design.mjs --report`（不带 `--report` 有发现就退出码 1）。范围：`app/`、`global-header/`、`global-footer/` 下 184 个 .css/.ts/.tsx。

| 类别 | 条数 | 说明 |
|---|---|---|
| 写死的色值（#hex、rgb/hsl） | 1635 | 其中约 295 条是 `--变量: 色值` 的定义行（可能算 token 本身，待定是否放行） |
| 字号不在 12/14/16/20/24/32 | 298 | 修了 font 简写和换行写法后新查出来的也算在内；最多：13px、15px、11px、0.9375rem、18px |

色值最多的文件：bmw-design-system/stageshow/stage.css 173、bmw-design-system/one-source.css 130、lab/party-planner/party-planner.css 120、man-truck-bus/case.css 112、bmw-design-system/refined.css 108。
字号最多：etf-savings-plan/components/Flow.css 32、man-truck-bus/case.css 29、bmw-design-system/refined.css 27。

## 没查 / 局限
- 只查字面值：`var()`、`clamp()`、`calc()` 里的数不查；`em`、`%`、`vw`、`cqw` 的字号一律列出来人工看。
- 查 `font-size`、`font:` 简写、`fontSize`、`text-[…]`；Tailwind 的 `text-sm` 这类预设类没查。
- 间距、字重、圆角、阴影没查（Lu 只批了这两类）。
- 故意写死的行，行尾加 `/* lint-ok: 原因 */` 放行。
- 全量报告里的存量不是这个 PR 引起的，不要在这个 PR 里改。要进 CI 必须先定「只拦新增」还是先清存量（待 Lu / PM 定）。

## CI
`.github/workflows/design-lint.yml`：PR 上跑 linter 自己的测试，再用 `--diff origin/<base>` 只拦这个 PR 新加的行；存量 1933 条只记在这份报告里，不清（清存量会改页面）。该 workflow 不用 secrets。
