// Ask Lu — backend for the chat box on /index (public/home.html).
// Knowledge comes from content/ask-lu/*.md, bundled by scripts/build-ask-lu.mjs
// before `npm run dev` / `npm run build`.

import { anthropic } from '@ai-sdk/anthropic'
import { google } from '@ai-sdk/google'
import { openai } from '@ai-sdk/openai'
import { streamText, type ModelMessage } from 'ai'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { ASK_LU_SYSTEM_PROMPT } from './knowledge.generated'

export const maxDuration = 30

// ASK_LU_PROVIDER = "anthropic" (default), "openai" or "google" (Gemini).
// For OpenAI and Gemini, ASK_LU_MODEL must be set to a current model name from that provider.
const PROVIDERS = { anthropic, openai, google } as const
type Provider = keyof typeof PROVIDERS
const rawProvider = process.env.ASK_LU_PROVIDER ?? 'anthropic'
const PROVIDER: Provider = Object.hasOwn(PROVIDERS, rawProvider) ? (rawProvider as Provider) : 'anthropic'
const MODEL = process.env.ASK_LU_MODEL ?? (PROVIDER === 'anthropic' ? 'claude-haiku-5-5' : undefined)

const KEY_ENV: Record<Provider, string> = {
  anthropic: 'ANTHROPIC_API_KEY',
  openai: 'OPENAI_API_KEY',
  google: 'GOOGLE_GENERATIVE_AI_API_KEY',
}

const MAX_HISTORY = 10 // messages sent to the model per request
const MAX_CHARS = 800 // per message
const MAX_OUTPUT_TOKENS = 500

const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(20, '1 h'), // 20 questions per visitor per hour
        prefix: 'ask-lu',
      })
    : null

function text(status: number, body: string) {
  return new Response(body, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}

type ChatTurn = { role: 'user' | 'assistant'; content: string }

function isTurn(m: unknown): m is ChatTurn {
  if (!m || typeof m !== 'object') return false
  const { role, content } = m as Record<string, unknown>
  return (role === 'user' || role === 'assistant') && typeof content === 'string'
}

export async function POST(req: Request) {
  if (!MODEL) {
    console.error(`[ask-lu] ASK_LU_MODEL is required when ASK_LU_PROVIDER=${PROVIDER}`)
    return text(503, 'The chat is not configured yet.')
  }
  if (!process.env[KEY_ENV[PROVIDER]]) {
    console.error(`[ask-lu] ${KEY_ENV[PROVIDER]} is missing — add it to .env.local and restart npm run dev`)
    return text(503, 'The chat is not configured yet (missing API key).')
  }

  // 1. Rate limit. In production, refuse to run without it so a bot can't run up the API bill.
  if (ratelimit) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous'
    const { success } = await ratelimit.limit(ip)
    if (!success) return text(429, 'Too many questions for now. Please try again later, or use the contact form.')
  } else if (process.env.NODE_ENV === 'production') {
    console.error('[ask-lu] Upstash env vars missing — chat disabled in production.')
    return text(503, 'The chat is temporarily unavailable. Please use the contact form.')
  }

  // 2. Validate input. Only user/assistant text turns are accepted; anything else is dropped.
  let body: { messages?: unknown }
  try {
    body = await req.json()
  } catch {
    return text(400, 'Bad request')
  }
  if (!Array.isArray(body.messages)) return text(400, 'Bad request')

  const messages: ModelMessage[] = body.messages
    .filter(isTurn)
    .map((m) => ({ role: m.role, content: m.content.trim() }))
    .filter((m) => m.content.length > 0)
    .slice(-MAX_HISTORY)

  // The model must reply to a user turn, and history must start with one.
  while (messages.length && messages[0].role !== 'user') messages.shift()
  if (!messages.length || messages[messages.length - 1].role !== 'user') return text(400, 'Bad request')
  if (messages.some((m) => typeof m.content === 'string' && m.content.length > MAX_CHARS)) {
    return text(413, `Please keep questions under ${MAX_CHARS} characters.`)
  }

  // 3. Answer, streamed as plain text.
  const result = streamText({
    model: PROVIDERS[PROVIDER](MODEL),
    system: ASK_LU_SYSTEM_PROMPT,
    messages,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    temperature: 0.3,
    onError: ({ error }) => console.error('[ask-lu] model error', error),
  })

  return result.toTextStreamResponse()
}
