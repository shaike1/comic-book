import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadComic } from '../api/comics';
import { useEditorStore } from '../store/editorStore';
import ComicEditor from '../components/editor/ComicEditor';

export default function EditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const initComic = useEditorStore((s) => s.initComic);
  const comic = useEditorStore((s) => s.comic);

  useEffect(() => {
    if (!id) return;
    loadComic(id).then((res) => {
      const comicData = res.data && Object.keys(res.data).length > 0
        ? { ...res.data, id: res.id, title: res.title }
        : { id: res.id, title: res.title, panels: [] };
      initComic(comicData);
    }).catch(() => {
      alert('שגיאה בטעינת הקומיקס');
      navigate('/');
    });
  }, [id, initComic, navigate]);

  if (!comic) {
    return (
      <div className="h-screen flex items-center justify-center bg-violet-50">
        <div className="text-center text-purple-400 text-xl animate-pulse">
          <div className="text-5xl mb-4">🎨</div>
          טוען עורך...
        </div>
      </div>
    );
  }

  return <ComicEditor comicId={id!} />;
}
