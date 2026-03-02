import { useEditorStore } from '../../store/editorStore';

export default function PanelList() {
  const comic = useEditorStore((s) => s.comic);
  const selectedPanelId = useEditorStore((s) => s.selectedPanelId);
  const selectPanel = useEditorStore((s) => s.selectPanel);
  const addPanel = useEditorStore((s) => s.addPanel);
  const removePanel = useEditorStore((s) => s.removePanel);
  const movePanelUp = useEditorStore((s) => s.movePanelUp);
  const movePanelDown = useEditorStore((s) => s.movePanelDown);

  if (!comic) return null;

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
      <div className="px-3 py-3 border-b border-gray-100 flex items-center justify-between">
        <span className="font-bold text-purple-700 text-sm">פאנלים</span>
        <span className="text-xs text-gray-400">{comic.panels.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-2">
        {comic.panels.map((panel, idx) => {
          const isSelected = panel.id === selectedPanelId;
          const bgStyle = panel.background.type === 'solid'
            ? panel.background.color
            : `linear-gradient(${panel.background.direction}, ${panel.background.from}, ${panel.background.to})`;

          return (
            <div
              key={panel.id}
              onClick={() => selectPanel(panel.id)}
              className={`relative rounded-xl cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'border-purple-500 shadow-md shadow-purple-200'
                  : 'border-transparent hover:border-purple-200'
              }`}
            >
              {/* Thumbnail */}
              <div
                className="rounded-lg overflow-hidden"
                style={{
                  width: '100%',
                  paddingBottom: '75%',
                  position: 'relative',
                  background: bgStyle,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {panel.elements.length === 0 && (
                    <span style={{ fontSize: 24, opacity: 0.3 }}>🖼️</span>
                  )}
                  {/* Show character count */}
                  {panel.elements.length > 0 && (
                    <div className="absolute bottom-1 right-1 text-xs bg-black/30 text-white rounded px-1">
                      {panel.elements.length} אלמנטים
                    </div>
                  )}
                </div>
              </div>

              {/* Panel number */}
              <div
                className={`text-xs text-center py-1 font-bold ${
                  isSelected ? 'text-purple-600' : 'text-gray-500'
                }`}
              >
                פאנל {idx + 1}
              </div>

              {/* Controls on hover */}
              {isSelected && (
                <div className="absolute top-1 left-1 flex flex-col gap-0.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); movePanelUp(panel.id); }}
                    className="w-5 h-5 bg-purple-600 text-white rounded text-xs flex items-center justify-center hover:bg-purple-700"
                    title="הזז למעלה"
                  >
                    ↑
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); movePanelDown(panel.id); }}
                    className="w-5 h-5 bg-purple-600 text-white rounded text-xs flex items-center justify-center hover:bg-purple-700"
                    title="הזז למטה"
                  >
                    ↓
                  </button>
                  {comic.panels.length > 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); removePanel(panel.id); }}
                      className="w-5 h-5 bg-red-500 text-white rounded text-xs flex items-center justify-center hover:bg-red-600"
                      title="מחק פאנל"
                    >
                      ✕
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add panel button */}
      <div className="p-2 border-t border-gray-100">
        <button
          onClick={addPanel}
          className="w-full py-2 rounded-xl border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50 text-purple-500 font-bold text-sm transition-all flex items-center justify-center gap-1"
        >
          <span>+</span> פאנל חדש
        </button>
      </div>
    </div>
  );
}
