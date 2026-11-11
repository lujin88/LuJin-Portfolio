/**
 * Record fictional demo loops for /lab/tools cards (Lu #7911).
 * Requires: isolated Agent Monitor on :7781, Scranton visual demo on :8341.
 */
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { spawn, execFileSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.join(__dirname, '..')
const OUT = path.join(REPO, 'public/assets/videos/lab/hiw-tools')
const ASSETS = path.join(REPO, 'assets/videos/lab/hiw-tools')
const MONITOR = '/Users/lu/agent-monitor-worktrees/visual-demo-1111'
const MONITOR_STATE = path.join(MONITOR, 'state.json')
const MONITOR_DEMO_STATE = path.join(__dirname, 'hiw-tools-monitor-demo-state.json')
const EMPTY_CODEX_DIR = path.join(OUT, '.monitor-no-codex')
const KEY = fs.readFileSync(path.join(MONITOR, 'token.txt'), 'utf8').trim()

fs.mkdirSync(OUT, { recursive: true })
fs.mkdirSync(ASSETS, { recursive: true })

const VIEW = { width: 1120, height: 720 }

function seedMonitorDemoState() {
  const now = Date.now()
  const template = JSON.parse(fs.readFileSync(MONITOR_DEMO_STATE, 'utf8'))
  for (const s of Object.values(template)) {
    s.startedAt = now - 120_000
    s.updatedAt = now - 30_000
    if (s.progress) {
      s.progress.startedAt = s.startedAt
      s.progress.observedAt = now - 15_000
    }
  }
  template['claude:copy-pass'].updatedAt = now - 90_000
  fs.writeFileSync(MONITOR_STATE, JSON.stringify(template))
}

function startAuthenticationAsk() {
  const controller = new AbortController()
  const done = fetch('http://127.0.0.1:7781/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-key': KEY },
    signal: controller.signal,
    body: JSON.stringify({
      source: 'cursor',
      session: 'hiw-tools-card-loop',
      tool: 'Start authentication',
      command: 'Sign in to approve the portfolio preview deploy.',
      description: 'Authenticate once, then confirm in the popup.',
      project: 'LuJin-Portfolio',
    }),
  }).catch(() => {})
  return () => {
    controller.abort()
    return done
  }
}

async function recordMonitor(browser) {
  const dir = fs.mkdtempSync(path.join(OUT, '.rec-mon-'))
  const context = await browser.newContext({
    viewport: VIEW,
    recordVideo: { dir, size: VIEW },
  })
  const page = await context.newPage()
  await page.goto(`http://127.0.0.1:7781/?key=${encodeURIComponent(KEY)}`, {
    waitUntil: 'domcontentloaded',
  })
  await page.waitForTimeout(1200)

  const releaseAsk = startAuthenticationAsk()
  await page.waitForTimeout(1400)
  const review = page.getByRole('button', { name: 'Review & approve' }).first()
  await review.waitFor({ state: 'visible', timeout: 15_000 })
  await page.waitForTimeout(600)
  await review.click()

  const dialog = page.locator('.approval-dialog[open]')
  await dialog.waitFor({ state: 'visible', timeout: 5000 })
  await page.waitForTimeout(800)
  await dialog.getByRole('button', { name: 'Approve' }).click()
  await page.waitForTimeout(1600)
  await dialog.waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {})
  await releaseAsk()
  await page.waitForTimeout(2400)
  await context.close()
  const webm = fs.readdirSync(dir).find((f) => f.endsWith('.webm'))
  if (!webm) throw new Error('monitor recording missing')
  fs.copyFileSync(path.join(dir, webm), path.join(OUT, 'monitor-card-loop-v1.webm'))
  fs.rmSync(dir, { recursive: true, force: true })
  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      path.join(OUT, 'monitor-card-loop-v1.webm'),
      '-an',
      '-c:v',
      'libx264',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      path.join(OUT, 'monitor-card-loop-v1.mp4'),
    ],
    { stdio: 'pipe' },
  )
}

async function recordScranton(browser) {
  const dir = fs.mkdtempSync(path.join(OUT, '.rec-scr-'))
  const context = await browser.newContext({
    viewport: VIEW,
    recordVideo: { dir, size: VIEW },
  })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:8341/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1400)

  const ask = page.getByText('Ask me first', { exact: true })
  if (await ask.isVisible().catch(() => false)) {
    await ask.click()
    await page.getByRole('button', { name: 'Continue', exact: true }).click()
    await page.waitForTimeout(600)
  }

  await page.locator('.channel-sidebar-row[data-channel="demo-studio"]').click()
  await page.waitForTimeout(500)

  const report = page.locator('.sc-side-label', { hasText: 'Report' }).first()
  if (await report.isVisible().catch(() => false)) {
    await report.click()
    await page.waitForTimeout(900)
  }

  const activity = page.getByText('Activity', { exact: true }).first()
  if (await activity.isVisible().catch(() => false)) {
    await activity.click()
    await page.waitForTimeout(700)
    await page.locator('.channel-sidebar-row[data-channel="demo-studio"]').click()
    await page.waitForTimeout(500)
  }

  const input = page.locator('#sc-thread-input, textarea[name="message"], .sc-composer textarea').first()
  if (await input.isVisible().catch(() => false)) {
    await input.click()
    await input.type('Layout looks good. Please ship the demo.', { delay: 45 })
    await page.waitForTimeout(1200)
  }

  const handle = page.locator('.sc-resize').first()
  if (await handle.isVisible().catch(() => false)) {
    const box = await handle.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
      await page.mouse.down()
      await page.mouse.move(box.x - 80, box.y + box.height / 2, { steps: 12 })
      await page.mouse.up()
      await page.waitForTimeout(700)
    }
  }

  await page.waitForTimeout(1200)
  await context.close()
  const webm = fs.readdirSync(dir).find((f) => f.endsWith('.webm'))
  if (!webm) throw new Error('scranton recording missing')
  fs.copyFileSync(path.join(dir, webm), path.join(OUT, 'scranton-card-loop-v1.webm'))
  fs.rmSync(dir, { recursive: true, force: true })
  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      path.join(OUT, 'scranton-card-loop-v1.webm'),
      '-an',
      '-c:v',
      'libx264',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      path.join(OUT, 'scranton-card-loop-v1.mp4'),
    ],
    { stdio: 'pipe' },
  )
}

function waitUrl(url, ms = 20000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tick = () => {
      fetch(url)
        .then((r) => (r.ok || r.status === 401 || r.status === 403 ? resolve() : retry()))
        .catch(retry)
    }
    const retry = () => {
      if (Date.now() - start > ms) reject(new Error(`timeout ${url}`))
      else setTimeout(tick, 400)
    }
    tick()
  })
}

async function main() {
  const skipServers = process.env.SKIP_SERVERS === '1'
  /** @type {import('child_process').ChildProcess | undefined} */
  let monitorProc
  /** @type {import('child_process').ChildProcess | undefined} */
  let scrantonProc
  if (!skipServers) {
    fs.mkdirSync(EMPTY_CODEX_DIR, { recursive: true })
    seedMonitorDemoState()
    monitorProc = spawn('node', ['server.js'], {
      cwd: MONITOR,
      env: {
        ...process.env,
        PORT: '7781',
        CODEX_SESSIONS_DIR: EMPTY_CODEX_DIR,
        CHAT_WATCH: 'off',
        CODEX_USAGE: 'off',
        CLAUDE_USAGE: 'off',
        MONITOR_NOTIFICATIONS: 'off',
      },
      stdio: 'ignore',
      detached: true,
    })
    scrantonProc = spawn('/Users/lu/Scranton/.venv/bin/python', ['run.py'], {
      cwd: '/Users/lu/Scranton-worktrees/visual-demo-1111',
      stdio: 'ignore',
      detached: true,
    })
    monitorProc.unref()
    scrantonProc.unref()
  }

  try {
    await waitUrl('http://127.0.0.1:7781/state')
    await waitUrl('http://127.0.0.1:8341/')
    const browser = await chromium.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true,
    })
    await recordMonitor(browser)
    if (process.env.SKIP_SCRANTON !== '1') {
      await recordScranton(browser)
    }
    await browser.close()
    for (const name of [
      'monitor-card-loop-v1.webm',
      'monitor-card-loop-v1.mp4',
      'scranton-card-loop-v1.webm',
      'scranton-card-loop-v1.mp4',
    ]) {
      fs.copyFileSync(path.join(OUT, name), path.join(ASSETS, name))
    }
    console.log('Recorded hiw-tools card loops in', OUT)
  } finally {
  if (!skipServers) {
      try {
        process.kill(-monitorProc.pid, 'SIGTERM')
      } catch {}
      try {
        process.kill(-scrantonProc.pid, 'SIGTERM')
      } catch {}
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
