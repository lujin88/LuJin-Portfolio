import { createReadStream } from 'node:fs'
import { Readable } from 'node:stream'
import { join } from 'node:path'
import { notFound } from 'next/navigation'

const prototypeFile = join(
  process.cwd(),
  'public/lab/off-we-go/off-we-go-clickable-prototype.html',
)

export async function GET() {
  try {
    const stream = Readable.toWeb(createReadStream(prototypeFile)) as ReadableStream<Uint8Array>
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    })
  } catch {
    notFound()
  }
}
