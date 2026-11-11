/**
 * Record /lab/tools card loops (Agent Monitor + Scranton), light and dark.
 * Monitor: isolated server :7781. Scranton: live UI :8300, #lu-portfolio channel.
 */
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { spawn, execFileSync } from 'child_process'
import crypto from 'crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.join(__dirname, '..')
const OUT = path.join(REPO, 'public/assets/videos/lab/hiw-tools')
const ASSETS = path.join(REPO, 'assets/videos/lab/hiw-tools')
const MONITOR = '/Users/lu/agent-monitor-worktrees/visual-demo-1111'
const MONITOR_STATE = path.join(MONITOR, 'state.json')
const MONITOR_USAGE = path.join(MONITOR, 'usage.json')
const MONITOR_DEMO_STATE = path.join(__dirname, 'hiw-tools-monitor-demo-state.json')
const MONITOR_DEMO_USAGE = path.join(__dirname, 'hiw-tools-monitor-demo-usage.json')
const EMPTY_CODEX_DIR = path.join(OUT, '.monitor-no-codex')
const KEY = fs.readFileSync(path.join(MONITOR, 'token.txt'), 'utf8').trim()

const SCRANTON_URL = process.env.SCRANTON_RECORD_URL || 'http://127.0.0.1:8300/'
/** Record slightly wider so Live activity fits 3 agents; crop to card size. */
const RECORD_VIEW = { width: 1280, height: 720 }
const OUTPUT_VIEW = { width: 1120, height: 720 }
const CROP_VF = `crop=${OUTPUT_VIEW.width}:${OUTPUT_VIEW.height}:(iw-${OUTPUT_VIEW.width})/2:0`

fs.mkdirSync(OUT, { recursive: true })
fs.mkdirSync(ASSETS, { recursive: true })

function seedMonitorDemoState() {
  const now = Date.now()
  const template = JSON.parse(fs.readFileSync(MONITOR_DEMO_STATE, 'utf8'))
  for (const s of Object.values(template)) {
    s.startedAt = now - 240_000
    s.updatedAt = now - 20_000
    if (s.progress) {
      s.progress.startedAt = s.startedAt
      s.progress.observedAt = now - 12_000
    }
  }
  fs.writeFileSync(MONITOR_STATE, JSON.stringify(template))
  const usage = JSON.parse(fs.readFileSync(MONITOR_DEMO_USAGE, 'utf8'))
  for (const u of Object.values(usage)) {
    if (u && typeof u === 'object' && 'updatedAt' in u) u.updatedAt = now
  }
  fs.writeFileSync(MONITOR_USAGE, JSON.stringify(usage))
}

function exportCardVideo(rawWebm, webmPath, mp4Path) {
  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      rawWebm,
      '-an',
      '-vf',
      CROP_VF,
      '-c:v',
      'libvpx-vp9',
      '-b:v',
      '0',
      '-crf',
      '32',
      webmPath,
    ],
    { stdio: 'pipe' },
  )
  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      rawWebm,
      '-an',
      '-vf',
      CROP_VF,
      '-c:v',
      'libx264',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      mp4Path,
    ],
    { stdio: 'pipe' },
  )
}

function fileSha256(filePath) {
  const hash = crypto.createHash('sha256')
  hash.update(fs.readFileSync(filePath))
  return hash.digest('hex').slice(0, 12)
}

function startAuthenticationAsk(sessionKey) {
  return fetch('http://127.0.0.1:7781/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-key': KEY },
    body: JSON.stringify({
      ack: 1,
      source: 'cursor',
      session: sessionKey,
      tool: 'Start authentication',
      command: 'Sign in to approve the portfolio preview deploy.',
      description: 'Authenticate once, then confirm in the popup.',
      project: 'LuJin-Portfolio',
    }),
  }).then(async (r) => {
    const reply = await r.json().catch(() => ({}))
    if (reply.decision === 'allow' && reply.receipt && reply.aid) {
      await fetch('http://127.0.0.1:7781/ack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-key': KEY },
        body: JSON.stringify({
          aid: reply.aid,
          receipt: reply.receipt,
          decision: 'allow',
        }),
      })
    }
  })
}

async function recordMonitorTheme(browser, theme) {
  const base = `monitor-card-loop-${theme}`
  const dir = fs.mkdtempSync(path.join(OUT, `.rec-mon-${theme}-`))
  const context = await browser.newContext({
    viewport: RECORD_VIEW,
    recordVideo: { dir, size: RECORD_VIEW },
    colorScheme: theme === 'dark' ? 'dark' : 'light',
  })
  const page = await context.newPage()
  await page.addInitScript((mode) => {
    document.documentElement.dataset.theme = mode
    document.documentElement.style.colorScheme = mode
  }, theme)

  await page.goto(`http://127.0.0.1:7781/?key=${encodeURIComponent(KEY)}`, {
    waitUntil: 'networkidle',
  })
  await page.waitForTimeout(900)

  await page.locator('#running-pill').waitFor({ state: 'visible', timeout: 12_000 })
  await page.waitForFunction(() => {
    const pill = document.getElementById('running-pill')?.textContent || ''
    return /(^3\b|·\s*3\b)/.test(pill)
  }, undefined, { timeout: 12_000 })

  const liveAgents = page.locator('.live-group')
  await liveAgents.first().waitFor({ state: 'visible', timeout: 12_000 })
  const agentCount = await liveAgents.count()
  if (agentCount < 3) throw new Error(`expected 3 live agent groups, got ${agentCount}`)

  await page.waitForTimeout(900)

  const askSession = `hiw-tools-card-loop-${theme}`
  const askDone = startAuthenticationAsk(askSession)
  await page.waitForTimeout(1200)
  const review = page.getByRole('button', { name: 'Review & approve' }).first()
  await review.waitFor({ state: 'visible', timeout: 15_000 })
  await page.waitForTimeout(500)
  await review.click()

  const dialog = page.locator('.approval-dialog[open]')
  await dialog.waitFor({ state: 'visible', timeout: 8000 })
  await page.waitForTimeout(700)
  await dialog.getByRole('button', { name: 'Approve' }).click()
  await page.waitForTimeout(1200)
  await dialog.waitFor({ state: 'hidden', timeout: 8000 })
  await askDone

  await page.waitForFunction(
    () => document.getElementById('need-count')?.textContent === '0',
    undefined,
    { timeout: 10_000 },
  )
  await page.getByText('receipt was not confirmed').waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {})
  await page.getByText('Status unknown').waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {})
  await page.getByText('Dashboard approval ended').waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {})
  await page.waitForTimeout(1400)

  await context.close()
  const webm = fs.readdirSync(dir).find((f) => f.endsWith('.webm'))
  if (!webm) throw new Error(`monitor ${theme} recording missing`)
  const raw = path.join(dir, webm)
  const webmOut = path.join(OUT, `${base}.webm`)
  const mp4Out = path.join(OUT, `${base}.mp4`)
  exportCardVideo(raw, webmOut, mp4Out)
  fs.rmSync(dir, { recursive: true, force: true })
  return { base, webmOut, mp4Out }
}

async function recordScrantonTheme(browser, theme) {
  const base = `scranton-card-loop-${theme}`
  const dir = fs.mkdtempSync(path.join(OUT, `.rec-scr-${theme}-`))
  const context = await browser.newContext({
    viewport: RECORD_VIEW,
    recordVideo: { dir, size: RECORD_VIEW },
    colorScheme: theme === 'dark' ? 'dark' : 'light',
  })
  const page = await context.newPage()
  await page.addInitScript((mode) => {
    try {
      localStorage.setItem('scranton-theme', mode)
      localStorage.setItem('agentchattr-channel', 'lu-portfolio')
      localStorage.setItem('agentchattr-channel-sidebar-mode', '1')
    } catch {}
    document.documentElement.dataset.theme = mode
  }, theme)

  await page.goto(SCRANTON_URL, { waitUntil: 'domcontentloaded', timeout: 30_000 })
  await page.locator('#messages-loader.hidden').waitFor({ state: 'attached', timeout: 30_000 }).catch(() => {})
  await page.waitForFunction(
    () => typeof window.switchChannel === 'function' && window.ws?.readyState === 1,
    undefined,
    { timeout: 30_000 },
  )
  await page.evaluate(() => {
    if (typeof switchChannel === 'function') switchChannel('lu-portfolio')
  })
  await page.waitForTimeout(800)

  const messages = page.locator(
    '#messages .message.sc-msg:not(.join-msg)[data-channel="lu-portfolio"]',
  )
  await messages.first().waitFor({ state: 'visible', timeout: 30_000 })

  const report = page.locator('.sc-side-label', { hasText: 'Report' }).first()
  if (await report.isVisible().catch(() => false)) {
    await report.click()
    await page.waitForTimeout(700)
    const channelAgain = page.locator('.channel-sidebar-row[data-channel="lu-portfolio"]')
    if (await channelAgain.isVisible().catch(() => false)) {
      await channelAgain.click()
      await page.waitForTimeout(600)
    }
  }

  await page.waitForTimeout(1400)
  await context.close()
  const webm = fs.readdirSync(dir).find((f) => f.endsWith('.webm'))
  if (!webm) throw new Error(`scranton ${theme} recording missing`)
  const raw = path.join(dir, webm)
  const webmOut = path.join(OUT, `${base}.webm`)
  const mp4Out = path.join(OUT, `${base}.mp4`)
  exportCardVideo(raw, webmOut, mp4Out)
  fs.rmSync(dir, { recursive: true, force: true })
  return { base, webmOut, mp4Out }
}

function waitUrl(url, ms = 25000) {
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
        GROK_USAGE: 'off',
        GROK_WATCH: 'off',
        CODEX_WATCH: 'off',
        CURSOR_USAGE: 'off',
        MONITOR_NOTIFICATIONS: 'off',
      },
      stdio: 'ignore',
      detached: true,
    })
    monitorProc.unref()
  }

  const hashes = []
  try {
    if (process.env.SKIP_MONITOR !== '1') {
      await waitUrl('http://127.0.0.1:7781/state')
    }
    if (process.env.SKIP_SCRANTON !== '1') {
      await waitUrl(SCRANTON_URL)
    }
    const browser = await chromium.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true,
    })

    if (process.env.SKIP_MONITOR !== '1') {
      for (const theme of ['light', 'dark']) {
        if (!skipServers) seedMonitorDemoState()
        const mon = await recordMonitorTheme(browser, theme)
        hashes.push({ file: path.basename(mon.webmOut), sha: fileSha256(mon.webmOut) })
        hashes.push({ file: path.basename(mon.mp4Out), sha: fileSha256(mon.mp4Out) })
      }
    }

    if (process.env.SKIP_SCRANTON !== '1') {
      for (const theme of ['light', 'dark']) {
        const scr = await recordScrantonTheme(browser, theme)
        hashes.push({ file: path.basename(scr.webmOut), sha: fileSha256(scr.webmOut) })
        hashes.push({ file: path.basename(scr.mp4Out), sha: fileSha256(scr.mp4Out) })
      }
    }

    await browser.close()
    for (const name of fs.readdirSync(OUT)) {
      if (name.includes('card-loop-') && (name.endsWith('.webm') || name.endsWith('.mp4'))) {
        fs.copyFileSync(path.join(OUT, name), path.join(ASSETS, name))
      }
    }
    console.log('Recorded hiw-tools card loops in', OUT)
    console.log(JSON.stringify({ hashes }, null, 2))
  } finally {
    if (!skipServers && monitorProc) {
      try {
        process.kill(-monitorProc.pid, 'SIGTERM')
      } catch {}
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
