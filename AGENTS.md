<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Localhost

This repo is the canonical site on **port 3000**.

- `http://localhost:3000/` stays empty.
- First page is `/index`. Always serve the latest full site at `http://localhost:3000/index`.
- Do not move this app, or lu-portfolio, to 3001.

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
