import type { VercelRequest, VercelResponse } from '@vercel/node';
import { v4 as uuidv4 } from 'uuid';
import { sql, ensureSchema } from '../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  await ensureSchema();

  // GET /api/comics — list all
  if (req.method === 'GET') {
    const rows = await sql`
      SELECT id, title, created_at, updated_at
      FROM comics
      ORDER BY updated_at DESC
    `;
    return res.json(rows);
  }

  // POST /api/comics — create
  if (req.method === 'POST') {
    const { title = 'קומיקס חדש', data = {} } = req.body as { title?: string; data?: object };
    const id = uuidv4();
    const rows = await sql`
      INSERT INTO comics (id, title, data)
      VALUES (${id}, ${title}, ${JSON.stringify(data)})
      RETURNING *
    `;
    const comic = rows[0] as Record<string, unknown>;
    if (typeof comic.data === 'string') comic.data = JSON.parse(comic.data as string);
    return res.status(201).json(comic);
  }

  return res.status(405).end();
}
