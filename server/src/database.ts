import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// DATA_DIR env var used in Docker; fallback to <cwd>/data for local dev
const dbDir = process.env.DATA_DIR || path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(path.join(dbDir, 'comics.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS comics (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL DEFAULT 'קומיקס חדש',
    data TEXT NOT NULL DEFAULT '{}',
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  )
`);

export default db;
