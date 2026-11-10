<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Localhost

This repo is the canonical site on **port 3000**.

- **Which folder serves 3000** (Lu, 2026-11-08, 4A): `~/Desktop/portfolio_perfect`, started by launchd `com.lu.portfolio-perfect-3000` (`~/Library/Application Support/portfolio-perfect/dev-3000.sh`, auto-restarts). It is a separate clone of this repo on its own branch with uncommitted work; "3000 only" files live there. `~/LuJin-Portfolio` is `main` and does not serve 3000. Agent worktrees are under `~/LuJin-Portfolio-worktrees/`. Do not edit `~/Desktop/portfolio_perfect` unless the project manager assigns it; back it up with `daily-backup.sh push ~/Desktop/portfolio_perfect:portfolio-perfect`.

- `http://localhost:3000/` stays empty.
- First page is `/index`. Always serve the latest full site at `http://localhost:3000/index`.
- Do not move this app, or lu-portfolio, to 3001.

# 合并

先读 harness-core 的 `AGENTS.md`「合并」。本项目的 PR 合进 main 就会部署到 lujin.me。都由 QA 跑 harness-core 的 `scripts/merge-pr.sh lujin88/LuJin-Portfolio <PR 号>` 合，脚本查 Vercel preview 构建通过：

- **非设计**：不改访客看到的东西的 PR：文档、清理、测试、SEO/metadata（noindex、结构化数据、llms.txt）、不影响画面的 bug 修复。QA 在 PR 上贴第一行是 `QA 通过 <sha>` 的评论就能合。
- **设计 PR 自动合**（Lu 2026-11-10，#lu-portfolio #5843 选 B：「qa 和 visualqa 都通过就自动合，我上线后再看」）：访客看到的东西会变的：布局、样式、文案（包括 `content/ask-lu/` 里 Ask Lu 的回答内容）、图片和视频、动效，包括把 3000 同步进 main 的 PR。拿不准的一律算设计。`QA 通过 <sha>` 和视觉 QA 的 `视觉通过 <sha>` 都对上当前 HEAD 就合。项目经理在每日总结里列出当天上线的设计 PR，附图；要 Lu 先看的，加 `hold` 标签。
- **法务关**（legal #3059、#5849，PM #5865）：改到 `ca/`、`app/i18n/messages/ca.ts`、`content/ask-lu/`、`package.json`、`pnpm-lock.yaml`、文件名带 `ubs` 的，新增、改动、改名了字体、图片、视频、音频文件的，或者新增的 html 里有外链 script/link 的，还要 legal 贴第一行是 `法务通过 <sha>` 的评论，对上当前 HEAD。UBS 和客户相关的文案路径查不出来，QA 审的时候判断，是就 @legal。
- **怎么判断**：看根目录 `.design-paths`。默认全算设计，只有 `!` 开头的排除清单里的路径算非设计。PR 改到清单外的任何文件就是设计 PR，脚本会加 `design` 标签并停下。一个文件里既有 metadata 又有页面（例如 `page.tsx`、`layout.tsx`），按设计算。
- `package.json`、`pnpm-lock.yaml`、`tsconfig.json` 不在排除清单里，改它们算设计：Vercel 按 `pnpm-lock.yaml` 装依赖，改 `scripts`、升级依赖（包括只改 lockfile 的 `pnpm update`）、改 `paths` 都可能改页面。`package-lock.json` Vercel 不读，算非设计。
- 改 `.design-paths`、所有 `AGENTS.md` 和 `CLAUDE.md`（包括 `ca/`、`eon/` 子目录里的）、`.github/workflows/`、`.claude/` 的 PR，改到 `ca/image/`（保密的 UBS 截图，清单在 harness-core `scripts/backup-exclude.txt`）的 PR，标题以「执行：」开头的 PR，只由 Lu 合。

来源：Lu 2026-11-05（Buzz 事件 07543b19）；设计 PR 自动合：Lu 2026-11-10 #lu-portfolio #5843。

# 依赖和 lockfile

本项目用 pnpm，Vercel 按 `pnpm-lock.yaml` 装依赖（frozen，lockfile 和 package.json 对不上就构建失败）。

- 改 `package.json` 后一定跑 `pnpm install`，把 `pnpm-lock.yaml` 和 `package.json` 放在同一个提交里。
- 不要用 `--no-frozen-lockfile` 或改 Vercel 安装命令来绕过 `ERR_PNPM_OUTDATED_LOCKFILE`；报这个错就重新生成 lockfile。
- 不要用 `npm install` 加依赖（只会改 `package-lock.json`，不改 `pnpm-lock.yaml`）。
- 推之前跑 `pnpm install --frozen-lockfile`，通过了再推。分支落后 main 很多时先 rebase 再跑。

来源：Lu 2026-11-03（Buzz 事件 e2633b3f）。

# Cloud Agent

Run the site from the repository root.

- Install with `pnpm install --frozen-lockfile`, using the root `pnpm-lock.yaml` (see the lockfile rules above). The Next apps under `eon/`, `ca/`, `global-header/`, and `global-footer/` are source imported by the root app. Do not install or start them as separate servers.
- `pnpm dev` is the dev server, pinned to port 3000. Open `http://localhost:3000/index`.
- Local agents on Lu's Mac must not run `pnpm dev` or take port 3000. Preview on another port instead: `pnpm predev && pnpm exec next dev --port 4620`. Run `predev` first, or the Ask Lu data is not generated.
- Leave `NEXT_PUBLIC_POSTHOG_KEY` empty to run without analytics. No secret is required.
