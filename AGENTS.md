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

# Cloud Agent

Run the site from the repository root.

- Install with `npm ci`, using the root `package-lock.json`. The Next apps under `eon/`, `ca/`, `global-header/`, and `global-footer/` are source imported by the root app. Do not install or start them as separate servers.
- `npm run dev` is the dev server, pinned to port 3000. Open `http://localhost:3000/index`.
- Leave `NEXT_PUBLIC_POSTHOG_KEY` empty to run without analytics. No secret is required.
