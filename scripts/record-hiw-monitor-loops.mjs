#!/usr/bin/env node
/**
 * Re-record Monitor card loops from isolated agent-monitor (visual-demo-1111).
 * PM #8619 / legal #8618 — demo usage 24/36/18/42%, fictional Demo studio tasks only.
 */
import { spawn, execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(__dirname, '..')
const MONITOR = path.resolve(process.env.HOME, 'agent-monitor-worktrees/visual-demo-1111')
const DEMO_DIR = path.join(REPO, 'design/hiw-agent-projects-1111/demo')
const OUT_DIR = path.join(REPO, 'public/assets/videos/lab/hiw-tools')
const DURATION_MS = 8680
const PORT = 7781

const demoState = JSON.parse(fs.readFileSync(path.join(DEMO_DIR, 'monitor-state.json'), 'utf8'))
const demoUsage = JSON.parse(fs.readFileSync(path.join(DEMO_DIR, 'monitor-usage.json'), 'utf8'))

function buildState() {
  const now = Date.now()
  const sessions = {}
  for (const row of Object.values(demoState)) {
    const sid = `${row.source}:${row.id}`
    sessions[sid] = {
      id: sid,
      source: row.source,
      status: row.status === 'needs_action' ? 'running' : row.status,
      title: row.title,
      project: row.project,
      message: row.message,
      startedAt: now - 120_000,
      updatedAt: now - 5_000,
    }
  }
  return sessions
}

function backupRestore(file, data) {
  const bak = `${file}.bak-hiw-record-${Date.now()}`
  if (fs.existsSync(file)) fs.copyFileSync(file, bak)
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
  return () => {
    if (fs.existsSync(bak)) fs.copyFileSync(bak, file)
  }
}

function startServer() {
  const env = {
    ...process.env,
    PORT: String(PORT),
    CLAUDE_USAGE: 'off',
    CODEX_USAGE: 'off',
    MONITOR_NOTIFICATIONS: 'off',
  }
  const child = spawn('node', ['server.js'], { cwd: MONITOR, env, stdio: 'pipe' })
  return child
}

function waitForServer(ms = 15000) {
  const started = Date.now()
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(`http://127.0.0.1:${PORT}/`, (res) => {
        res.resume()
        resolve()
      })
      req.on('error', () => {
        if (Date.now() - started > ms) reject(new Error('monitor server timeout'))
        else setTimeout(tick, 200)
      })
    }
    tick()
  })
}

function fireAsk() {
  const body = JSON.stringify({
    source: 'codex',
    session: 'demo-0',
    project: 'Demo studio',
    tool: 'Demo layout pick',
    command: 'Fictional portfolio demo — nothing runs on your Mac.',
    description: 'Please choose between the two sample layouts.',
  })
  const req = http.request(
    {
      hostname: '127.0.0.1',
      port: PORT,
      path: '/ask',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    },
    () => {},
  )
  req.write(body)
  req.end()
}

async function recordOne(colorScheme, baseName) {
  const token = fs.readFileSync(path.join(MONITOR, 'token.txt'), 'utf8').trim()
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  const context = await browser.newContext({
    viewport: { width: 620, height: 400 },
    colorScheme,
    recordVideo: { dir: OUT_DIR, size: { width: 620, height: 400 } },
  })
  const page = await context.newPage()
  fireAsk()
  await page.goto(`http://127.0.0.1:${PORT}/?key=${encodeURIComponent(token)}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  const approve = page.locator('[data-decision="allow"]').first()
  if (await approve.count()) {
    await approve.click()
    await page.waitForTimeout(500)
  }
  await page.waitForTimeout(Math.max(0, DURATION_MS - 1700))
  const webmTmp = await page.video()?.path()
  await context.close()
  await browser.close()
  if (!webmTmp) throw new Error('no video')
  const webmOut = path.join(OUT_DIR, `${baseName}.webm`)
  const mp4Out = path.join(OUT_DIR, `${baseName}.mp4`)
  const raw = path.join(OUT_DIR, `${baseName}.raw.webm`)
  fs.renameSync(webmTmp, raw)
  const t = String(DURATION_MS / 1000)
  execFileSync('ffmpeg', ['-y', '-i', raw, '-t', t, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '32', '-an', webmOut], {
    stdio: 'pipe',
  })
  execFileSync('ffmpeg', ['-y', '-i', raw, '-t', t, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-an', mp4Out], {
    stdio: 'pipe',
  })
  fs.unlinkSync(raw)
}

async function main() {
  const stateFile = path.join(MONITOR, 'state.json')
  const usageFile = path.join(MONITOR, 'usage.json')
  const restoreState = backupRestore(stateFile, buildState())
  const restoreUsage = backupRestore(usageFile, demoUsage)

  const server = startServer()
  try {
    await waitForServer()
    await recordOne('light', 'monitor-card-loop-light')
    await recordOne('dark', 'monitor-card-loop-dark')
  } finally {
    server.kill('SIGTERM')
    restoreState()
    restoreUsage()
  }
  console.log('Recorded monitor loops into', OUT_DIR)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
