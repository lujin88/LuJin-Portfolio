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
const KEY = fs.readFileSync(path.join(MONITOR, 'token.txt'), 'utf8').trim()

fs.mkdirSync(OUT, { recursive: true })
fs.mkdirSync(ASSETS, { recursive: true })

const VIEW = { width: 1120, height: 720 }

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
  await page.waitForTimeout(900)

  await fetch('http://127.0.0.1:7781/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source: 'codex',
      session: 'demo-loop',
      tool: 'Apply layout',
      command: 'pnpm exec next build --no-lint',
      description: 'Approve this fictional demo build for the portfolio preview.',
      project: 'Demo studio',
    }),
  }).catch(() => {})

  await page.waitForTimeout(1200)
  const allow = page.locator('[data-decision="allow"]').first()
  if (await allow.isVisible().catch(() => false)) {
    await allow.click()
    await page.waitForTimeout(2200)
  }
  await page.waitForTimeout(2000)
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
    monitorProc = spawn('node', ['server.js'], {
      cwd: MONITOR,
      env: { ...process.env, PORT: '7781' },
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
    await recordScranton(browser)
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
