/**
 * Upload the files listed in lib/external-media.json to Vercel Blob.
 *
 * The site keeps serving the same paths. lib/media-url.ts and next.config.mjs
 * send those paths at the store recorded in the manifest. Re-run this after
 * replacing a listed file in public/ (the file has to be on disk again).
 *
 *   BLOB_READ_WRITE_TOKEN=... npm run upload-media
 *
 * The token is created when the Blob store is connected to the Vercel project
 * (BLOB_READ_WRITE_TOKEN). Locally it lives in .env.local, which is gitignored.
 * This script never prints the token.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { put } from '@vercel/blob'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = join(root, 'lib/external-media.json')

function loadEnvLocal() {
  try {
    const text = readFileSync(join(root, '.env.local'), 'utf8')
    for (const line of text.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq)
      const value = trimmed.slice(eq + 1)
      if (!process.env[key]) process.env[key] = value
    }
  } catch {
    // .env.local is optional when the token is already in the environment.
  }
}

loadEnvLocal()

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error(
    'BLOB_READ_WRITE_TOKEN is not set. Connect the Blob store to the Vercel project, then run `vercel env pull .env.local` or export the token.',
  )
  process.exit(1)
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
let baseUrl = ''

for (const file of manifest.files) {
  const localPath = join(root, 'public', file.path.replace(/^\//, ''))
  const pathname = file.path.replace(/^\//, '')
  const body = await readFile(localPath)
  const blob = await put(pathname, body, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    multipart: body.length >= 4 * 1024 * 1024,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })
  const origin = new URL(blob.url).origin
  if (!baseUrl) baseUrl = origin
  if (origin !== baseUrl) {
    console.error(`Unexpected blob host for ${file.path}: ${origin}`)
    process.exit(1)
  }
  const uploadedPath = new URL(blob.url).pathname
  const expectedPath = file.path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
  if (decodeURI(uploadedPath) !== file.path && uploadedPath !== expectedPath) {
    console.error(
      `Path mismatch for ${file.path}: uploaded pathname is ${uploadedPath}`,
    )
    process.exit(1)
  }
  console.log(
    `${(body.length / 1024 / 1024).toFixed(2)} MB  ${file.path}`,
  )
}

manifest.baseUrl = baseUrl
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`base ${baseUrl}`)
console.log(`uploaded ${manifest.files.length} files`)
