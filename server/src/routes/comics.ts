import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../database';

const router = Router();

// List all comics
router.get('/', (_req: Request, res: Response) => {
  const comics = db
    .prepare(
      'SELECT id, title, created_at, updated_at FROM comics ORDER BY updated_at DESC'
    )
    .all();
  res.json(comics);
});

// Create comic
router.post('/', (req: Request, res: Response) => {
  const id = uuidv4();
  const { title = 'קומיקס חדש', data = {} } = req.body;
  db.prepare(
    'INSERT INTO comics (id, title, data) VALUES (?, ?, ?)'
  ).run(id, title, JSON.stringify(data));
  const comic = db.prepare('SELECT * FROM comics WHERE id = ?').get(id) as any;
  comic.data = JSON.parse(comic.data);
  res.status(201).json(comic);
});

// Get comic by id
router.get('/:id', (req: Request, res: Response) => {
  const comic = db
    .prepare('SELECT * FROM comics WHERE id = ?')
    .get(req.params.id) as any;
  if (!comic) {
    res.status(404).json({ error: 'לא נמצא' });
    return;
  }
  comic.data = JSON.parse(comic.data);
  res.json(comic);
});

// Update comic
router.put('/:id', (req: Request, res: Response) => {
  const { title, data } = req.body;
  const now = Math.floor(Date.now() / 1000);
  db.prepare(
    'UPDATE comics SET title = ?, data = ?, updated_at = ? WHERE id = ?'
  ).run(title, JSON.stringify(data), now, req.params.id);
  const comic = db
    .prepare('SELECT * FROM comics WHERE id = ?')
    .get(req.params.id) as any;
  if (!comic) {
    res.status(404).json({ error: 'לא נמצא' });
    return;
  }
  comic.data = JSON.parse(comic.data);
  res.json(comic);
});

// Delete comic
router.delete('/:id', (req: Request, res: Response) => {
  db.prepare('DELETE FROM comics WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export { router as comicsRouter };
