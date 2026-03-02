import { useRef } from 'react';
import type { ComicElement } from '../../types/comic';
import { useEditorStore } from '../../store/editorStore';
import SpeechBubble from './SpeechBubble';

const CANVAS_W = 800;
const CANVAS_H = 600;

interface Props {
  element: ComicElement;
  panelId: string;
  scale: number;
}

export default function DraggableElement({ element, panelId, scale }: Props) {
  const selectedElementId = useEditorStore((s) => s.selectedElementId);
  const selectElement = useEditorStore((s) => s.selectElement);
  const updateElement = useEditorStore((s) => s.updateElement);
  const removeElement = useEditorStore((s) => s.removeElement);
  const bringForward = useEditorStore((s) => s.bringForward);
  const sendBackward = useEditorStore((s) => s.sendBackward);

  const isSelected = selectedElementId === element.id;
  const dragStart = useRef({ mx: 0, my: 0, ex: 0, ey: 0 });
  const resizeStart = useRef({ mx: 0, my: 0, ew: 0, eh: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);

    dragStart.current = {
      mx: e.clientX,
      my: e.clientY,
      ex: element.x,
      ey: element.y,
    };

    const onMove = (ev: MouseEvent) => {
      const dx = (ev.clientX - dragStart.current.mx) / scale;
      const dy = (ev.clientY - dragStart.current.my) / scale;
      const x = Math.max(0, Math.min(CANVAS_W - element.width, dragStart.current.ex + dx));
      const y = Math.max(0, Math.min(CANVAS_H - element.height, dragStart.current.ey + dy));
      updateElement(panelId, element.id, { x, y } as Partial<ComicElement>);
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    resizeStart.current = {
      mx: e.clientX,
      my: e.clientY,
      ew: element.width,
      eh: element.height,
    };

    const onMove = (ev: MouseEvent) => {
      const dx = (ev.clientX - resizeStart.current.mx) / scale;
      const dy = (ev.clientY - resizeStart.current.my) / scale;
      const width = Math.max(40, resizeStart.current.ew + dx);
      const height = Math.max(40, resizeStart.current.eh + dy);
      updateElement(panelId, element.id, { width, height } as Partial<ComicElement>);
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateElement(panelId, element.id, { flipX: !element.flipX } as Partial<ComicElement>);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeElement(panelId, element.id);
  };

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: element.x,
    top: element.y,
    width: element.width,
    height: element.height,
    zIndex: element.zIndex,
    cursor: 'move',
    userSelect: 'none',
    transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
  };

  const renderContent = () => {
    switch (element.type) {
      case 'image':
        return (
          <img
            src={element.src}
            alt={element.label}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transform: element.flipX ? 'scaleX(-1)' : undefined,
              display: 'block',
              pointerEvents: 'none',
            }}
            crossOrigin="anonymous"
          />
        );
      case 'sticker':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: Math.min(element.width, element.height) * 0.75,
              lineHeight: 1,
              pointerEvents: 'none',
            }}
          >
            {element.emoji}
          </div>
        );
      case 'bubble':
        return (
          <SpeechBubble
            text={element.text}
            style={element.style}
            tailDirection={element.tailDirection}
            width={element.width}
            height={element.height}
            fontSize={element.fontSize}
            selected={isSelected}
          />
        );
      case 'text':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: element.fontSize,
              fontWeight: element.bold ? 900 : 400,
              color: element.color,
              direction: 'rtl',
              textAlign: 'center',
              wordBreak: 'break-word',
              overflow: 'hidden',
              pointerEvents: 'none',
              textShadow: '1px 1px 0 rgba(0,0,0,0.15)',
            }}
          >
            {element.text || <span style={{ opacity: 0.3 }}>טקסט</span>}
          </div>
        );
    }
  };

  return (
    <div
      style={containerStyle}
      onMouseDown={handleMouseDown}
    >
      {renderContent()}

      {/* Selection border (not for bubble - it draws its own) */}
      {isSelected && element.type !== 'bubble' && (
        <div
          style={{
            position: 'absolute',
            inset: -2,
            border: '2px dashed #7c3aed',
            borderRadius: 6,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Controls when selected */}
      {isSelected && (
        <>
          {/* Delete button */}
          <button
            onMouseDown={handleDelete}
            style={{
              position: 'absolute',
              top: -14,
              right: -14,
              width: 26,
              height: 26,
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 9999,
            }}
            title="מחק"
          >
            ✕
          </button>

          {/* Flip button (for images) */}
          {element.type === 'image' && (
            <button
              onMouseDown={handleFlip}
              style={{
                position: 'absolute',
                top: -14,
                left: -14,
                width: 26,
                height: 26,
                background: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                zIndex: 9999,
              }}
              title="הפוך"
            >
              ↔
            </button>
          )}

          {/* Layer buttons */}
          <button
            onMouseDown={(e) => { e.stopPropagation(); bringForward(panelId, element.id); }}
            style={{
              position: 'absolute',
              bottom: -14,
              right: -14,
              width: 26,
              height: 26,
              background: '#0284c7',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: 14,
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 9999,
            }}
            title="הבא לפני"
          >
            ↑
          </button>
          <button
            onMouseDown={(e) => { e.stopPropagation(); sendBackward(panelId, element.id); }}
            style={{
              position: 'absolute',
              bottom: -14,
              left: -14,
              width: 26,
              height: 26,
              background: '#0284c7',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: 14,
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 9999,
            }}
            title="שלח אחורה"
          >
            ↓
          </button>

          {/* Resize handle (bottom-right) */}
          <div
            onMouseDown={handleResizeMouseDown}
            style={{
              position: 'absolute',
              bottom: -6,
              right: -6,
              width: 16,
              height: 16,
              background: 'white',
              border: '2px solid #7c3aed',
              borderRadius: '50%',
              cursor: 'se-resize',
              zIndex: 9999,
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
          />
        </>
      )}
    </div>
  );
}
