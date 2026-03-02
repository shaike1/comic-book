import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { useEditorStore } from '../../store/editorStore';
import { useAutoSave } from '../../hooks/useAutoSave';
import PanelList from './PanelList';
import PanelCanvas from './PanelCanvas';
import AssetPanel from './AssetPanel';
import type { SaveStatus } from '../../types/comic';

const SAVE_STATUS_LABELS: Record<SaveStatus, { label: string; color: string; icon: string }> = {
  saved:   { label: 'נשמר',        color: 'text-green-600',  icon: '✓' },
  saving:  { label: 'שומר...',     color: 'text-amber-500',  icon: '⏳' },
  unsaved: { label: 'לא נשמר',    color: 'text-orange-500', icon: '●' },
  error:   { label: 'שגיאת שמירה', color: 'text-red-500',   icon: '⚠' },
};

interface Props {
  comicId: string;
}

export default function ComicEditor({ comicId }: Props) {
  const navigate = useNavigate();
  const comic = useEditorStore((s) => s.comic);
  const isDirty = useEditorStore((s) => s.isDirty);
  const markSaved = useEditorStore((s) => s.markSaved);
  const setTitle = useEditorStore((s) => s.setTitle);
  const selectedPanelId = useEditorStore((s) => s.selectedPanelId);

  const selectedPanel = comic?.panels.find((p) => p.id === selectedPanelId) ?? null;

  const onSaved = useCallback(() => markSaved(), [markSaved]);
  const saveStatus = useAutoSave(comicId, comic, isDirty, onSaved);

  const [canvasWidth, setCanvasWidth] = useState(600);
  const centerRef = useRef<HTMLDivElement>(null);
  const [editingTitle, setEditingTitle] = useState(false);

  // Measure center panel width
  useEffect(() => {
    if (!centerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setCanvasWidth(Math.floor(w - 32)); // padding
    });
    observer.observe(centerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleExportPanel = async () => {
    if (!selectedPanel) return;
    const el = document.getElementById(`panel-canvas-${selectedPanel.id}`);
    if (!el) return;
    try {
      const canvas = await html2canvas(el, {
        scale: 1,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
      });
      const link = document.createElement('a');
      link.download = `${comic?.title ?? 'קומיקס'}-פאנל.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      alert('שגיאה בייצוא. נסה שוב.');
    }
  };

  const handleExportAll = async () => {
    if (!comic) return;
    const cols = comic.panels.length <= 2 ? comic.panels.length : 2;
    const rows = Math.ceil(comic.panels.length / cols);
    const cellW = 800;
    const cellH = 600;
    const gap = 10;
    const totalW = cols * cellW + (cols - 1) * gap;
    const totalH = rows * cellH + (rows - 1) * gap;

    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = totalW;
    outputCanvas.height = totalH;
    const ctx = outputCanvas.getContext('2d')!;
    ctx.fillStyle = '#f5f3ff';
    ctx.fillRect(0, 0, totalW, totalH);

    for (let i = 0; i < comic.panels.length; i++) {
      const panel = comic.panels[i];
      const el = document.getElementById(`panel-canvas-${panel.id}`);
      if (!el) continue;
      try {
        const c = await html2canvas(el, { scale: 1, useCORS: true, allowTaint: false, backgroundColor: null });
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * (cellW + gap);
        const y = row * (cellH + gap);
        ctx.drawImage(c, x, y, cellW, cellH);
      } catch { /* skip panel */ }
    }

    const link = document.createElement('a');
    link.download = `${comic.title}.png`;
    link.href = outputCanvas.toDataURL('image/png');
    link.click();
  };

  const statusInfo = SAVE_STATUS_LABELS[saveStatus];

  if (!comic) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white shadow-sm z-10 flex items-center px-4 py-2 gap-4 min-h-[56px]">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors text-sm font-medium"
        >
          ← בית
        </button>

        {/* Title */}
        <div className="flex-1 flex justify-center">
          {editingTitle ? (
            <input
              autoFocus
              value={comic.title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditingTitle(false)}
              className="text-lg font-black text-purple-700 bg-purple-50 border border-purple-300 rounded-lg px-3 py-1 text-center outline-none focus:ring-2 focus:ring-purple-400 min-w-[200px] max-w-[400px]"
              dir="rtl"
            />
          ) : (
            <button
              onClick={() => setEditingTitle(true)}
              className="text-lg font-black text-purple-700 hover:bg-purple-50 px-3 py-1 rounded-lg transition-colors flex items-center gap-2"
              title="לחץ לעריכת שם"
            >
              {comic.title}
              <span className="text-sm text-gray-400">✏️</span>
            </button>
          )}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Save status */}
          <span className={`text-xs font-medium flex items-center gap-1 ${statusInfo.color}`}>
            <span>{statusInfo.icon}</span>
            {statusInfo.label}
          </span>

          {/* Export buttons */}
          <button
            onClick={handleExportPanel}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            title="ייצא פאנל נוכחי"
          >
            📷 פאנל
          </button>
          <button
            onClick={handleExportAll}
            className="text-sm bg-purple-600 hover:bg-purple-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow"
            title="ייצא קומיקס מלא"
          >
            🖼️ ייצא הכל
          </button>
        </div>
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Panel list */}
        <div className="w-[140px] flex-shrink-0 overflow-hidden">
          <PanelList />
        </div>

        {/* Center: Canvas */}
        <div
          ref={centerRef}
          className="flex-1 overflow-auto bg-gray-200 flex flex-col items-center justify-start p-4 gap-4"
          onClick={() => useEditorStore.getState().selectElement(null)}
        >
          {selectedPanel ? (
            <>
              <div className="text-xs text-gray-400 font-medium">
                פאנל {(comic.panels.findIndex((p) => p.id === selectedPanel.id) ?? 0) + 1} מתוך {comic.panels.length}
              </div>
              <PanelCanvas
                panel={selectedPanel}
                containerWidth={canvasWidth > 0 ? canvasWidth : 600}
              />
              {/* Tips */}
              <div className="text-xs text-gray-400 text-center max-w-md leading-5">
                גרור דמויות ומדבקות מהספריה הימנית לפה • לחץ על אלמנט לבחור • גרור להזזה • גרור פינה לשינוי גודל
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-center py-20">
              <div className="text-5xl mb-3">🎨</div>
              <p>בחר פאנל משמאל</p>
            </div>
          )}
        </div>

        {/* Right: Asset panel */}
        <div className="w-[260px] flex-shrink-0 overflow-hidden">
          <AssetPanel />
        </div>
      </div>
    </div>
  );
}
