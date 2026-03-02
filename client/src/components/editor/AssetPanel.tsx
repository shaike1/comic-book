import { useState } from 'react';
import { CHARACTERS, BACKGROUNDS, STICKERS } from '../../data/assets';
import { useEditorStore } from '../../store/editorStore';
import type { BubbleStyle } from '../../types/comic';

type Tab = 'characters' | 'backgrounds' | 'stickers' | 'bubbles';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'characters', label: 'דמויות',  icon: '🧑' },
  { id: 'backgrounds', label: 'רקעים', icon: '🌅' },
  { id: 'stickers',   label: 'מדבקות', icon: '⭐' },
  { id: 'bubbles',    label: 'בועות',  icon: '💬' },
];

const BUBBLE_OPTIONS: { style: BubbleStyle; label: string; icon: string; desc: string }[] = [
  { style: 'speech',  label: 'דיבור',   icon: '💬', desc: 'בועת דיבור רגילה' },
  { style: 'thought', label: 'מחשבה',  icon: '💭', desc: 'בועת מחשבה' },
  { style: 'shout',   label: 'צעקה',    icon: '💥', desc: 'בועת קריאה / צעקה' },
];

export default function AssetPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('characters');
  const selectedPanelId = useEditorStore((s) => s.selectedPanelId);
  const setBackground = useEditorStore((s) => s.setBackground);
  const comic = useEditorStore((s) => s.comic);
  const selectedPanel = comic?.panels.find((p) => p.id === selectedPanelId);

  const handleDragStart = (e: React.DragEvent, assetType: string, data: Record<string, unknown>) => {
    e.dataTransfer.setData('comicAsset', JSON.stringify({ assetType, data }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Tabs */}
      <div className="grid grid-cols-4 border-b border-gray-100">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center py-2 px-1 text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'text-purple-700 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-500 hover:text-purple-500 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="mt-0.5">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === 'characters' && (
          <div>
            <p className="text-xs text-gray-400 mb-3 text-center">גרור דמות לפאנל</p>
            <div className="grid grid-cols-3 gap-2">
              {CHARACTERS.map((char) => (
                <div
                  key={char.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'character', { src: char.src, label: char.label })}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50 hover:bg-purple-50 cursor-grab active:cursor-grabbing border border-transparent hover:border-purple-200 transition-all"
                >
                  <img
                    src={char.src}
                    alt={char.label}
                    className="w-14 h-14 object-contain rounded-lg"
                    draggable={false}
                    crossOrigin="anonymous"
                    loading="lazy"
                  />
                  <span className="text-xs text-gray-600 font-medium text-center truncate w-full">{char.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'backgrounds' && (
          <div>
            <p className="text-xs text-gray-400 mb-3 text-center">לחץ כדי לשנות רקע</p>
            <div className="grid grid-cols-2 gap-2">
              {BACKGROUNDS.map((bg) => {
                const isActive =
                  selectedPanel?.background &&
                  ((bg.background.type === 'solid' &&
                    selectedPanel.background.type === 'solid' &&
                    selectedPanel.background.color === bg.background.color) ||
                    (bg.background.type === 'gradient' &&
                      selectedPanel.background.type === 'gradient' &&
                      selectedPanel.background.from === bg.background.from));

                return (
                  <button
                    key={bg.id}
                    onClick={() => {
                      if (selectedPanelId) setBackground(selectedPanelId, bg.background);
                    }}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                      isActive ? 'border-purple-500 shadow-md' : 'border-transparent hover:border-purple-200'
                    }`}
                    style={{ height: 60 }}
                  >
                    <div
                      style={{ width: '100%', height: '100%', background: bg.preview }}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/40 text-white text-xs py-1 text-center font-medium">
                      {bg.label}
                    </div>
                    {isActive && (
                      <div className="absolute top-1 right-1 text-white text-sm">✓</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'stickers' && (
          <div>
            <p className="text-xs text-gray-400 mb-3 text-center">גרור מדבקה לפאנל</p>
            <div className="grid grid-cols-4 gap-2">
              {STICKERS.map((sticker) => (
                <div
                  key={sticker.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'sticker', { emoji: sticker.emoji })}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50 hover:bg-purple-50 cursor-grab active:cursor-grabbing border border-transparent hover:border-purple-200 transition-all"
                  title={sticker.label}
                >
                  <span className="text-3xl">{sticker.emoji}</span>
                  <span className="text-xs text-gray-500 truncate w-full text-center">{sticker.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bubbles' && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 text-center mb-2">גרור בועת דיבור לפאנל</p>
            {BUBBLE_OPTIONS.map((opt) => (
              <div
                key={opt.style}
                draggable
                onDragStart={(e) => handleDragStart(e, 'bubble', { style: opt.style })}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-purple-50 cursor-grab active:cursor-grabbing border border-transparent hover:border-purple-200 transition-all"
              >
                <span className="text-4xl">{opt.icon}</span>
                <div>
                  <div className="font-bold text-sm text-gray-700">{opt.label}</div>
                  <div className="text-xs text-gray-400">{opt.desc}</div>
                </div>
              </div>
            ))}

            <div className="mt-4 p-3 bg-purple-50 rounded-xl text-xs text-purple-700">
              <p className="font-bold mb-1">טיפ: עריכת טקסט</p>
              <p>לחץ על בועת דיבור בפאנל כדי לערוך את הטקסט שבתוכה</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
