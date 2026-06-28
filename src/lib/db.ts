import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client lazily and defensively.
// On serverless platforms (Vercel), the filesystem may be read-only,
// so DB operations can fail. Callers should wrap DB ops in try/catch
// and treat DB as a best-effort backup (Google Sheet is primary).
function createPrismaClient() {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'production' ? ['error'] : ['query'],
    })
  } catch {
    return null
  }
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production' && db) {
  globalForPrisma.prisma = db
}
