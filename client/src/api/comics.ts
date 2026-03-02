import type { Comic } from '../types/comic';

const BASE = '/api/comics';

export interface ComicSummary {
  id: string;
  title: string;
  created_at: number;
  updated_at: number;
}

export async function listComics(): Promise<ComicSummary[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('שגיאה בטעינת הקומיקסים');
  return res.json();
}

export async function loadComic(id: string): Promise<{ id: string; title: string; data: Comic }> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error('שגיאה בטעינת הקומיקס');
  return res.json();
}

export async function createComic(title: string, data: Comic): Promise<ComicSummary> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, data }),
  });
  if (!res.ok) throw new Error('שגיאה ביצירת קומיקס');
  return res.json();
}

export async function saveComic(id: string, title: string, data: Comic): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, data }),
  });
  if (!res.ok) throw new Error('שגיאה בשמירת הקומיקס');
}

export async function deleteComic(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('שגיאה במחיקת הקומיקס');
}
