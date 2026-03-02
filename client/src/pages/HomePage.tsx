import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listComics, createComic, deleteComic } from '../api/comics';
import type { ComicSummary } from '../api/comics';
import type { Comic } from '../types/comic';

function emptyComic(): Comic {
  return {
    id: '',
    title: 'קומיקס חדש',
    panels: [],
  };
}

function formatDate(ts: number) {
  const d = new Date(ts * 1000);
  return d.toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function HomePage() {
  const [comics, setComics] = useState<ComicSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    listComics()
      .then(setComics)
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const data = emptyComic();
      const comic = await createComic('קומיקס חדש', data);
      navigate(`/editor/${comic.id}`);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm('למחוק את הקומיקס?')) return;
    await deleteComic(id);
    setComics((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🎨</span>
            <div>
              <h1 className="text-2xl font-black text-purple-700">יוצר הקומיקס</h1>
              <p className="text-sm text-gray-500">צור קומיקסים נפלאים בקלות!</p>
            </div>
          </div>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-60 text-lg"
          >
            <span className="text-xl">✏️</span>
            {creating ? 'יוצר...' : 'קומיקס חדש!'}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="text-center py-20 text-purple-400 text-xl">טוען...</div>
        ) : comics.length === 0 ? (
          <EmptyState onCreate={handleCreate} creating={creating} />
        ) : (
          <>
            <h2 className="text-xl font-bold text-purple-700 mb-6">הקומיקסים שלי 📚</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Create new card */}
              <button
                onClick={handleCreate}
                disabled={creating}
                className="flex flex-col items-center justify-center gap-3 h-48 rounded-3xl border-4 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50 transition-all group"
              >
                <span className="text-5xl group-hover:scale-110 transition-transform">➕</span>
                <span className="text-purple-500 font-bold text-lg">קומיקס חדש</span>
              </button>

              {comics.map((comic) => (
                <ComicCard
                  key={comic.id}
                  comic={comic}
                  onClick={() => navigate(`/editor/${comic.id}`)}
                  onDelete={(e) => handleDelete(e, comic.id)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function ComicCard({
  comic,
  onClick,
  onDelete,
}: {
  comic: ComicSummary;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-3xl shadow-md hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 group border-2 border-transparent hover:border-purple-200 overflow-hidden"
    >
      {/* Thumbnail placeholder */}
      <div className="h-36 bg-gradient-to-br from-purple-200 to-pink-100 flex items-center justify-center">
        <span className="text-5xl">📖</span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-800 truncate">{comic.title}</h3>
        <p className="text-xs text-gray-400 mt-1">{formatDate(comic.updated_at)}</p>
      </div>

      {/* Delete button */}
      <button
        onClick={onDelete}
        className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm shadow"
        title="מחק"
      >
        🗑️
      </button>
    </div>
  );
}

function EmptyState({ onCreate, creating }: { onCreate: () => void; creating: boolean }) {
  return (
    <div className="text-center py-20">
      <div className="text-8xl mb-6">🎨</div>
      <h2 className="text-3xl font-black text-purple-700 mb-3">ברוך הבא ליוצר הקומיקס!</h2>
      <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
        כאן תוכל ליצור קומיקסים מגניבים. בחר דמויות, רקעים, הוסף בועות דיבור וצור סיפור משלך!
      </p>
      <button
        onClick={onCreate}
        disabled={creating}
        className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xl py-4 px-10 rounded-3xl shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
      >
        🚀 צור קומיקס ראשון!
      </button>
    </div>
  );
}
