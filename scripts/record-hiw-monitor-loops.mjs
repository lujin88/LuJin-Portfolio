#!/usr/bin/env node
/**
 * Re-record Monitor card loops from isolated agent-monitor (visual-demo-1111).
 * PM #8619 / QA #8626 — demo usage 24/36/18/42%, 1120×720, approval visible, true dark.
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
const VW = 1120
const VH = 720

const demoState = JSON.parse(fs.readFileSync(path.join(DEMO_DIR, 'monitor-state.json'), 'utf8'))
const demoUsage = JSON.parse(fs.readFileSync(path.join(DEMO_DIR, 'monitor-usage.json'), 'utf8'))

const OFF_ENV = {
  CLAUDE_USAGE: 'off',
  CODEX_USAGE: 'off',
  CURSOR_USAGE: 'off',
  GROK_USAGE: 'off',
  GROK_WATCH: 'off',
  CODEX_WATCH: 'off',
  CHAT_WATCH: 'off',
  MONITOR_NOTIFICATIONS: 'off',
}

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
  const env = { ...process.env, PORT: String(PORT), ...OFF_ENV }
  return spawn('node', ['server.js'], { cwd: MONITOR, env, stdio: 'pipe' })
}

function waitForServer(ms = 20000) {
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

function fireAsk(token) {
  const body = JSON.stringify({
    source: 'codex',
    session: 'demo-0',
    project: 'Demo studio',
    tool: 'Demo layout pick',
    command: 'Fictional portfolio demo — nothing runs on your Mac.',
    description: 'Please choose between the two sample layouts.',
  })
  const req = http.request({
    hostname: '127.0.0.1',
    port: PORT,
    path: '/ask',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      'x-key': token,
    },
  })
  req.on('response', () => {})
  req.write(body)
  req.end()
}

function verifyOutput(mp4, theme) {
  const dim = execFileSync(
    'ffprobe',
    ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', mp4],
    { encoding: 'utf8' },
  ).trim()
  if (dim !== `${VW},${VH}`) throw new Error(`${mp4}: expected ${VW}x${VH}, got ${dim}`)

  const frameMd5 = (t) => {
    const out = execFileSync('ffmpeg', ['-ss', String(t), '-i', mp4, '-frames:v', '1', '-f', 'md5', '-'], {
      encoding: 'utf8',
    })
    const m = out.match(/MD5=([^\s]+)/)
    return m?.[1]
  }
  const a = frameMd5(0.8)
  const b = frameMd5(3.2)
  if (!a || a === b) throw new Error(`${mp4}: frames at 0.8s and 3.2s identical — no visible motion`)

  const frame = mp4.replace(/\.mp4$/, '.qa-2s.png')
  execFileSync('ffmpeg', ['-y', '-ss', '2', '-i', mp4, '-frames:v', '1', frame], { stdio: 'pipe' })
  let ocr = ''
  try {
    ocr = execFileSync('tesseract', [frame, 'stdout', '-l', 'eng'], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] })
  } catch {
    console.warn('tesseract missing — skip OCR usage check')
    return
  }
  for (const n of ['24', '36', '18', '42']) {
    if (!ocr.includes(n)) throw new Error(`${mp4} @2s: expected demo usage digit ${n} in frame OCR`)
  }
  if (theme === 'dark') {
    const stats = execFileSync(
      'ffmpeg',
      ['-i', frame, '-vf', 'signalstats', '-f', 'null', '-'],
      { encoding: 'utf8' },
    )
    const m = stats.match(/YMIN=([\d.]+)/)
    if (m && Number(m[1]) > 80) throw new Error(`${mp4}: dark theme frame looks too bright (YMIN=${m[1]})`)
  }
  fs.unlinkSync(frame)
}

async function recordOne(theme, baseName) {
  const token = fs.readFileSync(path.join(MONITOR, 'token.txt'), 'utf8').trim()
  fireAsk(token)
  await new Promise((r) => setTimeout(r, 400))

  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  const context = await browser.newContext({
    viewport: { width: VW, height: VH },
    recordVideo: { dir: OUT_DIR, size: { width: VW, height: VH } },
  })
  if (theme === 'dark') {
    await context.addInitScript(() => {
      const lockDark = () => {
        document.documentElement.dataset.theme = 'dark'
        document.documentElement.style.colorScheme = 'dark'
        const meta = document.getElementById('theme-color')
        if (meta) meta.content = '#0e1218'
      }
      lockDark()
      setInterval(lockDark, 50)
      new MutationObserver(lockDark).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    })
  }
  const page = await context.newPage()
  const t0 = Date.now()
  await page.goto(`http://127.0.0.1:${PORT}/?key=${encodeURIComponent(token)}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1800)
  const review = page.getByRole('button', { name: 'Review & approve' }).first()
  await review.waitFor({ state: 'visible', timeout: 12_000 })
  await review.click()
  const approve = page.locator('.approval-dialog [data-decision="allow"]').first()
  await approve.waitFor({ state: 'visible', timeout: 8000 })
  await page.waitForTimeout(400)
  await approve.click()
  await page.waitForTimeout(700)
  await page.waitForTimeout(Math.max(0, DURATION_MS - (Date.now() - t0)))

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
  verifyOutput(mp4Out, theme)
}

async function recordPair(theme, base) {
  const stateFile = path.join(MONITOR, 'state.json')
  const usageFile = path.join(MONITOR, 'usage.json')
  const restoreState = backupRestore(stateFile, buildState())
  const restoreUsage = backupRestore(usageFile, demoUsage)
  const server = startServer()
  try {
    await waitForServer()
    await new Promise((r) => setTimeout(r, 500))
    await recordOne(theme, base)
  } finally {
    server.kill('SIGTERM')
    await new Promise((r) => setTimeout(r, 400))
    restoreState()
    restoreUsage()
  }
}

async function main() {
  await recordPair('light', 'monitor-card-loop-light')
  await recordPair('dark', 'monitor-card-loop-dark')
  console.log('Recorded monitor loops into', OUT_DIR)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
