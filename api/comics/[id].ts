import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql, ensureSchema } from '../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  await ensureSchema();

  const { id } = req.query as { id: string };

  // GET /api/comics/:id
  if (req.method === 'GET') {
    const rows = await sql`SELECT * FROM comics WHERE id = ${id}`;
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    const comic = rows[0] as Record<string, unknown>;
    if (typeof comic.data === 'string') comic.data = JSON.parse(comic.data as string);
    return res.json(comic);
  }

  // PUT /api/comics/:id
  if (req.method === 'PUT') {
    const { title, data } = req.body as { title?: string; data?: object };
    const now = Math.floor(Date.now() / 1000);
    const rows = await sql`
      UPDATE comics
      SET
        title = COALESCE(${title ?? null}, title),
        data  = COALESCE(${data ? JSON.stringify(data) : null}, data),
        updated_at = ${now}
      WHERE id = ${id}
      RETURNING *
    `;
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    const comic = rows[0] as Record<string, unknown>;
    if (typeof comic.data === 'string') comic.data = JSON.parse(comic.data as string);
    return res.json(comic);
  }

  // DELETE /api/comics/:id
  if (req.method === 'DELETE') {
    await sql`DELETE FROM comics WHERE id = ${id}`;
    return res.status(204).end();
  }

  return res.status(405).end();
}
