import { useRef, useEffect } from 'react';
import type { Panel, ComicElement, NewComicElement, BubbleStyle, TailDirection } from '../../types/comic';
import { useEditorStore } from '../../store/editorStore';
import DraggableElement from './DraggableElement';

export const CANVAS_W = 800;
export const CANVAS_H = 600;

interface Props {
  panel: Panel;
  containerWidth: number;
}

export default function PanelCanvas({ panel, containerWidth }: Props) {
  const scale = containerWidth / CANVAS_W;
  const displayH = CANVAS_H * scale;

  const selectedElementId = useEditorStore((s) => s.selectedElementId);
  const selectElement = useEditorStore((s) => s.selectElement);
  const addElement = useEditorStore((s) => s.addElement);
  const updateElement = useEditorStore((s) => s.updateElement);

  // Selected element for inline text editing
  const selectedEl = panel.elements.find((e) => e.id === selectedElementId);

  const bgStyle = buildBackground(panel.background);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      selectElement(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData('comicAsset');
    if (!raw) return;

    const asset = JSON.parse(raw) as {
      assetType: string;
      data: Record<string, unknown>;
    };

    const rect = e.currentTarget.getBoundingClientRect();
    const dropX = (e.clientX - rect.left) / scale;
    const dropY = (e.clientY - rect.top) / scale;

    switch (asset.assetType) {
      case 'character': {
        const el: NewComicElement = {
          type: 'image',
          src: asset.data.src as string,
          label: asset.data.label as string,
          x: Math.max(0, dropX - 75),
          y: Math.max(0, dropY - 75),
          width: 150,
          height: 150,
          rotation: 0,
          flipX: false,
        };
        addElement(panel.id, el);
        break;
      }
      case 'sticker': {
        const el: NewComicElement = {
          type: 'sticker',
          emoji: asset.data.emoji as string,
          x: Math.max(0, dropX - 40),
          y: Math.max(0, dropY - 40),
          width: 80,
          height: 80,
          rotation: 0,
          flipX: false,
        };
        addElement(panel.id, el);
        break;
      }
      case 'bubble': {
        const el: NewComicElement = {
          type: 'bubble',
          text: 'הכנס טקסט',
          style: (asset.data.style as BubbleStyle) ?? 'speech',
          tailDirection: 'bottom-right' as TailDirection,
          x: Math.max(0, dropX - 100),
          y: Math.max(0, dropY - 60),
          width: 200,
          height: 120,
          rotation: 0,
          flipX: false,
          fontSize: 16,
        };
        addElement(panel.id, el);
        break;
      }
    }
  };

  const sortedElements = [...panel.elements].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div style={{ width: containerWidth, height: displayH, position: 'relative' }}>
      {/* Scaled canvas */}
      <div
        id={`panel-canvas-${panel.id}`}
        onMouseDown={handleCanvasClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="comic-panel"
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          // background-color comes from comic-panel CSS class (warm off-white + halftone dots),
          // but the actual scene background is painted via a child div so the dots overlay on top
        }}
      >
        {/* Scene background painted below halftone dots */}
        <div style={{ position: 'absolute', inset: 0, background: bgStyle, zIndex: 0 }} />
        {sortedElements.map((el) => (
          <DraggableElement key={el.id} element={el} panelId={panel.id} scale={scale} />
        ))}
      </div>

      {/* Inline text editor for selected text/bubble/sticker */}
      {selectedEl && (selectedEl.type === 'bubble' || selectedEl.type === 'text') && (
        <InlineTextEditor
          element={selectedEl}
          panelId={panel.id}
          scale={scale}
          onUpdate={(patch) => updateElement(panel.id, selectedEl.id, patch as Partial<ComicElement>)}
        />
      )}
    </div>
  );
}

function InlineTextEditor({
  element,
  panelId: _panelId,
  scale,
  onUpdate,
}: {
  element: ComicElement & { text: string };
  panelId: string;
  scale: number;
  onUpdate: (patch: Record<string, unknown>) => void;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [element.id]);

  const top = element.y * scale + (element.type === 'bubble' ? 8 * scale : 0);
  const left = element.x * scale + 8 * scale;
  const width = element.width * scale - 16 * scale;
  const height =
    element.type === 'bubble'
      ? (element.height - 28) * scale
      : element.height * scale;

  return (
    <textarea
      ref={inputRef}
      value={element.text}
      onChange={(e) => onUpdate({ text: e.target.value })}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        position: 'absolute',
        top,
        left,
        width,
        height,
        background: 'rgba(255,255,255,0.85)',
        border: '2px solid #7c3aed',
        borderRadius: 6,
        padding: '4px 6px',
        fontSize: (element.type === 'bubble' ? element.fontSize : (element as { fontSize: number }).fontSize ?? 16) * scale,
        fontWeight: 700,
        color: element.type === 'text' ? (element as { color: string }).color : '#1e1b4b',
        direction: 'rtl',
        textAlign: 'center',
        resize: 'none',
        outline: 'none',
        zIndex: 99999,
        overflow: 'hidden',
        lineHeight: 1.3,
      }}
    />
  );
}

function buildBackground(bg: Panel['background']): string {
  if (bg.type === 'solid') return bg.color;
  return `linear-gradient(${bg.direction}, ${bg.from}, ${bg.to})`;
}
