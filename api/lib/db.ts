import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export const sql = neon(process.env.DATABASE_URL);

// Idempotent table creation — safe to call on every cold start
export async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS comics (
      id          TEXT PRIMARY KEY,
      title       TEXT    NOT NULL DEFAULT 'קומיקס חדש',
      data        TEXT    NOT NULL DEFAULT '{}',
      created_at  BIGINT  DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT),
      updated_at  BIGINT  DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT)
    )
  `;
}
