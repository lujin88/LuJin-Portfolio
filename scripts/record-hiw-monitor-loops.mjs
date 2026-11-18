#!/usr/bin/env node
/**
 * Re-record Monitor card loops from isolated agent-monitor (visual-demo-1111).
 * PM #8619 / QA #8650 — demo 24/36/18/42%, 1120×720, true dark, confirmed approval ending.
 */
import { spawn, spawnSync, execFileSync } from 'node:child_process'
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

const ASK_BODY = {
  source: 'codex',
  session: 'demo-0',
  project: 'Demo studio',
  tool: 'Demo layout pick',
  command: 'Fictional portfolio demo — nothing runs on your Mac.',
  description: 'Please choose between the two sample layouts.',
  ack: 1,
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

function apiPost(token, route, payload) {
  const body = JSON.stringify(payload)
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: route,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          'x-key': token,
        },
      },
      (res) => {
        let data = ''
        res.on('data', (c) => {
          data += c
        })
        res.on('end', () => {
          let json = null
          try {
            json = JSON.parse(data)
          } catch {
            json = { raw: data, status: res.statusCode }
          }
          resolve({ status: res.statusCode, json })
        })
      },
    )
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

/** Held hook: resolves when dashboard answers, with { decision, aid, receipt }. */
function startHeldAsk(token) {
  const body = JSON.stringify(ASK_BODY)
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: '/ask',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          'x-key': token,
        },
      },
      (res) => {
        let data = ''
        res.on('data', (c) => {
          data += c
        })
        res.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch (e) {
            reject(new Error(`ask response parse failed: ${data.slice(0, 200)}`))
          }
        })
      },
    )
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

function signalstatsYavg(png) {
  const r = spawnSync('ffmpeg', ['-i', png, '-vf', 'signalstats,metadata=print', '-f', 'null', '-'], {
    encoding: 'utf8',
  })
  const combined = `${r.stdout}${r.stderr}`
  const m = combined.match(/lavfi\.signalstats\.YAVG=([\d.]+)/) || combined.match(/YAVG=([\d.]+)/)
  return m ? Number(m[1]) : null
}

async function installThemeRoute(context, theme) {
  const lock = theme === 'dark' ? 'dark' : 'light'
  const host = `127.0.0.1:${PORT}`
  await context.route(`http://${host}/**`, async (route) => {
    const req = route.request()
    if (req.resourceType() !== 'document') return route.continue()
    const res = await route.fetch()
    let body = await res.text()
    body = body.replace(
      "const modeForHour=hour=>hour<7||hour>=19?'dark':'light'",
      `const modeForHour=()=>'${lock}'`,
    )
    const headers = { ...res.headers(), 'content-length': String(Buffer.byteLength(body)) }
    await route.fulfill({ status: res.status(), headers, body })
  })
}

function extractFrame(mp4, t, out) {
  execFileSync('ffmpeg', ['-y', '-ss', String(t), '-i', mp4, '-frames:v', '1', out], { stdio: 'pipe' })
}

function verifyOutput(mp4, theme) {
  const dim = execFileSync(
    'ffprobe',
    ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', mp4],
    { encoding: 'utf8' },
  ).trim()
  if (dim !== `${VW},${VH}`) throw new Error(`${mp4}: expected ${VW}x${VH}, got ${dim}`)

  const frame2 = mp4.replace(/\.mp4$/, '.qa-2s.png')
  const frameEnd = mp4.replace(/\.mp4$/, '.qa-end.png')
  extractFrame(mp4, 2, frame2)
  extractFrame(mp4, 7.8, frameEnd)

  const y2 = signalstatsYavg(frame2)
  if (theme === 'dark') {
    if (y2 === null || y2 >= 80) throw new Error(`${mp4}: dark @2s YAVG=${y2} (need <80)`)
  } else if (y2 === null || y2 <= 180) {
    throw new Error(`${mp4}: light @2s YAVG=${y2} (need >180)`)
  }

  let ocr2 = ''
  let ocrEnd = ''
  try {
    ocr2 = execFileSync('tesseract', [frame2, 'stdout', '-l', 'eng'], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] })
    ocrEnd = execFileSync('tesseract', [frameEnd, 'stdout', '-l', 'eng'], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] })
  } catch {
    console.warn('tesseract missing — skip OCR checks')
  }
  if (ocr2) {
    for (const n of ['24', '36', '18', '42']) {
      if (!ocr2.includes(n)) throw new Error(`${mp4} @2s: missing usage digit ${n}`)
    }
  }
  if (ocrEnd && /receipt was not confirmed|Check the agent app before/i.test(ocrEnd)) {
    throw new Error(`${mp4} @7.8s: still shows unconfirmed receipt error`)
  }

  const md5a = execFileSync('ffmpeg', ['-ss', '0.8', '-i', mp4, '-frames:v', '1', '-f', 'md5', '-'], { encoding: 'utf8' })
  const md5b = execFileSync('ffmpeg', ['-ss', '3.2', '-i', mp4, '-frames:v', '1', '-f', 'md5', '-'], { encoding: 'utf8' })
  const a = md5a.match(/MD5=([^\s]+)/)?.[1]
  const b = md5b.match(/MD5=([^\s]+)/)?.[1]
  if (a && a === b) throw new Error(`${mp4}: no motion between 0.8s and 3.2s`)

  fs.unlinkSync(frame2)
  fs.unlinkSync(frameEnd)
}

async function recordOne(theme, baseName) {
  const token = fs.readFileSync(path.join(MONITOR, 'token.txt'), 'utf8').trim()
  const askPromise = startHeldAsk(token)
  await new Promise((r) => setTimeout(r, 350))

  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  const context = await browser.newContext({
    viewport: { width: VW, height: VH },
    colorScheme: theme === 'dark' ? 'dark' : 'light',
    recordVideo: { dir: OUT_DIR, size: { width: VW, height: VH } },
  })
  await installThemeRoute(context, theme)
  const page = await context.newPage()
  await page.emulateMedia({ colorScheme: theme === 'dark' ? 'dark' : 'light' })

  const t0 = Date.now()
  await page.goto(`http://127.0.0.1:${PORT}/?key=${encodeURIComponent(token)}`, { waitUntil: 'domcontentloaded' })
  // QA samples @2s for usage + YAVG before the approval modal brightens the frame.
  await page.waitForTimeout(2100)
  const review = page.getByRole('button', { name: 'Review & approve' }).first()
  await review.waitFor({ state: 'visible', timeout: 12_000 })
  await review.click()
  const approve = page.locator('.approval-dialog [data-decision="allow"]').first()
  await approve.waitFor({ state: 'visible', timeout: 8000 })
  await page.waitForTimeout(400)
  await approve.click()

  const hookReply = await Promise.race([
    askPromise,
    new Promise((_, rej) => setTimeout(() => rej(new Error('held /ask timeout')), 12_000)),
  ])
  if (hookReply?.receipt && hookReply?.aid) {
    const ack = await apiPost(token, '/ack', {
      aid: hookReply.aid,
      receipt: hookReply.receipt,
      decision: hookReply.decision || 'allow',
    })
    if (ack.status !== 200) throw new Error(`ack failed: ${ack.status} ${JSON.stringify(ack.json)}`)
  }

  await page.waitForFunction(() => !document.querySelector('.approval-dialog[open]'), null, { timeout: 8000 }).catch(() => {})
  await page.waitForTimeout(600)
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
