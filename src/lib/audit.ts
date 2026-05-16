import { createHash } from 'crypto'

export interface AuditEntry {
  action: string
  userId?: string
  email?: string
  timestamp: string
  ip?: string
  userAgent?: string
  details?: Record<string, unknown>
  severity: 'info' | 'warning' | 'error' | 'critical'
}

const auditLog: AuditEntry[] = []
const MAX_LOG_SIZE = 1000

function sanitizeInput(input: string): string {
  return input.replace(/[<>"'&]/g, (char) => {
    const entities: Record<string, string> = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;' }
    return entities[char] || char
  })
}

export function auditLogEntry(entry: Omit<AuditEntry, 'timestamp'>): void {
  const sanitizedEntry: AuditEntry = {
    ...entry,
    action: sanitizeInput(entry.action),
    email: entry.email ? sanitizeInput(entry.email) : undefined,
    timestamp: new Date().toISOString(),
  }

  auditLog.unshift(sanitizedEntry)

  if (auditLog.length > MAX_LOG_SIZE) {
    auditLog.length = MAX_LOG_SIZE
  }

  if (entry.severity === 'error' || entry.severity === 'critical') {
    // In production, send to external logging service
    console.error(`[AUDIT:${entry.severity.toUpperCase()}] ${entry.action}`, {
      userId: entry.userId,
      email: entry.email,
    })
  }
}

export function getAuditLogs(options?: { limit?: number; severity?: string; userId?: string }): AuditEntry[] {
  let filtered = [...auditLog]

  if (options?.severity) {
    filtered = filtered.filter((e) => e.severity === options.severity)
  }
  if (options?.userId) {
    filtered = filtered.filter((e) => e.userId === options.userId)
  }
  if (options?.limit) {
    filtered = filtered.slice(0, options.limit)
  }

  return filtered
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}
