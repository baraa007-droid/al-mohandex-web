const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const DEFAULT_MAX = 10
const DEFAULT_WINDOW = 60 * 1000

export function checkRateLimit(key: string, max = DEFAULT_MAX, windowMs = DEFAULT_WINDOW): boolean {
  const now = Date.now()
  const existing = rateLimitMap.get(key)

  if (!existing || now > existing.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (existing.count >= max) {
    return false
  }

  existing.count++
  return true
}

export function getRateLimitHeaders(key: string, max = DEFAULT_MAX, windowMs = DEFAULT_WINDOW) {
  const existing = rateLimitMap.get(key)
  const resetAt = existing?.resetAt ?? Date.now() + windowMs
  const remaining = Math.max(0, max - (existing?.count ?? 0))

  return {
    'X-RateLimit-Limit': String(max),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset': String(Math.floor(resetAt / 1000)),
  }
}

export function cleanupRateLimits() {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}

setInterval(cleanupRateLimits, 5 * 60 * 1000)
