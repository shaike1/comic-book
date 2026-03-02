import { useEffect, useRef, useState } from 'react';
import type { Comic, SaveStatus } from '../types/comic';
import { saveComic } from '../api/comics';

export function useAutoSave(
  comicId: string | null,
  comic: Comic | null,
  isDirty: boolean,
  onSaved: () => void,
  delay = 2000
) {
  const [status, setStatus] = useState<SaveStatus>('saved');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isDirty || !comicId || !comic) return;

    setStatus('unsaved');

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      setStatus('saving');
      try {
        await saveComic(comicId, comic.title, comic);
        setStatus('saved');
        onSaved();
      } catch {
        setStatus('error');
      }
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isDirty, comic, comicId, delay, onSaved]);

  return status;
}
