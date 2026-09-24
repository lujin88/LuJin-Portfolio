export function lookup(dict: unknown, key: string): unknown {
  const parts = key.split('.')
  let current: unknown = dict
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[part]
  }
  return current
}

export function lookupString(dict: unknown, key: string): string | undefined {
  const value = lookup(dict, key)
  return typeof value === 'string' ? value : undefined
}

export function lookupStringArray(dict: unknown, key: string): string[] | undefined {
  const value = lookup(dict, key)
  if (!Array.isArray(value)) return undefined
  if (!value.every((item) => typeof item === 'string')) return undefined
  return value
}
