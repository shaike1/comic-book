import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Comic, Panel, ComicElement, NewComicElement, Background } from '../types/comic';

const DEFAULT_BG: Background = { type: 'gradient', from: '#87CEEB', to: '#e0f7fa', direction: 'to bottom' };

function newPanel(order: number): Panel {
  return {
    id: uuidv4(),
    order,
    background: DEFAULT_BG,
    elements: [],
  };
}

interface EditorState {
  comic: Comic | null;
  selectedPanelId: string | null;
  selectedElementId: string | null;
  isDirty: boolean;

  // Comic-level
  initComic: (comic: Comic) => void;
  setTitle: (title: string) => void;

  // Panel management
  selectPanel: (id: string) => void;
  addPanel: () => void;
  removePanel: (id: string) => void;
  movePanelUp: (id: string) => void;
  movePanelDown: (id: string) => void;
  setBackground: (panelId: string, bg: Background) => void;

  // Element management
  addElement: (panelId: string, el: NewComicElement) => void;
  updateElement: (panelId: string, elId: string, patch: Partial<ComicElement>) => void;
  removeElement: (panelId: string, elId: string) => void;
  selectElement: (id: string | null) => void;
  bringForward: (panelId: string, elId: string) => void;
  sendBackward: (panelId: string, elId: string) => void;

  markSaved: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  comic: null,
  selectedPanelId: null,
  selectedElementId: null,
  isDirty: false,

  initComic: (comic) => {
    const panels = comic.panels.length > 0 ? comic.panels : [newPanel(0)];
    set({
      comic: { ...comic, panels },
      selectedPanelId: panels[0].id,
      selectedElementId: null,
      isDirty: false,
    });
  },

  setTitle: (title) =>
    set((s) => ({
      comic: s.comic ? { ...s.comic, title } : null,
      isDirty: true,
    })),

  selectPanel: (id) => set({ selectedPanelId: id, selectedElementId: null }),

  addPanel: () =>
    set((s) => {
      if (!s.comic) return s;
      const order = s.comic.panels.length;
      const panel = newPanel(order);
      return {
        comic: { ...s.comic, panels: [...s.comic.panels, panel] },
        selectedPanelId: panel.id,
        selectedElementId: null,
        isDirty: true,
      };
    }),

  removePanel: (id) =>
    set((s) => {
      if (!s.comic) return s;
      const panels = s.comic.panels.filter((p) => p.id !== id).map((p, i) => ({ ...p, order: i }));
      if (panels.length === 0) panels.push(newPanel(0));
      const selectedPanelId =
        s.selectedPanelId === id ? panels[0].id : s.selectedPanelId;
      return { comic: { ...s.comic, panels }, selectedPanelId, isDirty: true };
    }),

  movePanelUp: (id) =>
    set((s) => {
      if (!s.comic) return s;
      const idx = s.comic.panels.findIndex((p) => p.id === id);
      if (idx <= 0) return s;
      const panels = [...s.comic.panels];
      [panels[idx - 1], panels[idx]] = [panels[idx], panels[idx - 1]];
      return { comic: { ...s.comic, panels: panels.map((p, i) => ({ ...p, order: i })) }, isDirty: true };
    }),

  movePanelDown: (id) =>
    set((s) => {
      if (!s.comic) return s;
      const idx = s.comic.panels.findIndex((p) => p.id === id);
      if (idx >= s.comic.panels.length - 1) return s;
      const panels = [...s.comic.panels];
      [panels[idx], panels[idx + 1]] = [panels[idx + 1], panels[idx]];
      return { comic: { ...s.comic, panels: panels.map((p, i) => ({ ...p, order: i })) }, isDirty: true };
    }),

  setBackground: (panelId, bg) =>
    set((s) => {
      if (!s.comic) return s;
      return {
        comic: {
          ...s.comic,
          panels: s.comic.panels.map((p) =>
            p.id === panelId ? { ...p, background: bg } : p
          ),
        },
        isDirty: true,
      };
    }),

  addElement: (panelId, el: NewComicElement) =>
    set((s) => {
      if (!s.comic) return s;
      const panel = s.comic.panels.find((p) => p.id === panelId);
      if (!panel) return s;
      const maxZ = panel.elements.reduce((m, e) => Math.max(m, e.zIndex), 0);
      const newEl: ComicElement = { ...el, id: uuidv4(), zIndex: maxZ + 1 } as ComicElement;
      return {
        comic: {
          ...s.comic,
          panels: s.comic.panels.map((p) =>
            p.id === panelId ? { ...p, elements: [...p.elements, newEl] } : p
          ),
        },
        selectedElementId: newEl.id,
        isDirty: true,
      };
    }),

  updateElement: (panelId, elId, patch) =>
    set((s) => {
      if (!s.comic) return s;
      return {
        comic: {
          ...s.comic,
          panels: s.comic.panels.map((p) =>
            p.id === panelId
              ? {
                  ...p,
                  elements: p.elements.map((e) =>
                    e.id === elId ? ({ ...e, ...patch } as ComicElement) : e
                  ),
                }
              : p
          ),
        },
        isDirty: true,
      };
    }),

  removeElement: (panelId, elId) =>
    set((s) => {
      if (!s.comic) return s;
      return {
        comic: {
          ...s.comic,
          panels: s.comic.panels.map((p) =>
            p.id === panelId
              ? { ...p, elements: p.elements.filter((e) => e.id !== elId) }
              : p
          ),
        },
        selectedElementId: s.selectedElementId === elId ? null : s.selectedElementId,
        isDirty: true,
      };
    }),

  selectElement: (id) => set({ selectedElementId: id }),

  bringForward: (panelId, elId) =>
    set((s) => {
      if (!s.comic) return s;
      return {
        comic: {
          ...s.comic,
          panels: s.comic.panels.map((p) => {
            if (p.id !== panelId) return p;
            const el = p.elements.find((e) => e.id === elId);
            if (!el) return p;
            const maxZ = p.elements.reduce((m, e) => Math.max(m, e.zIndex), 0);
            return {
              ...p,
              elements: p.elements.map((e) =>
                e.id === elId ? { ...e, zIndex: maxZ + 1 } : e
              ),
            };
          }),
        },
        isDirty: true,
      };
    }),

  sendBackward: (panelId, elId) =>
    set((s) => {
      if (!s.comic) return s;
      return {
        comic: {
          ...s.comic,
          panels: s.comic.panels.map((p) => {
            if (p.id !== panelId) return p;
            const el = p.elements.find((e) => e.id === elId);
            if (!el) return p;
            const minZ = p.elements.reduce((m, e) => Math.min(m, e.zIndex), Infinity);
            return {
              ...p,
              elements: p.elements.map((e) =>
                e.id === elId ? { ...e, zIndex: Math.max(0, minZ - 1) } : e
              ),
            };
          }),
        },
        isDirty: true,
      };
    }),

  markSaved: () => set({ isDirty: false }),

  // Derived helper (not stored, used inline)
  get selectedPanel() {
    const { comic, selectedPanelId } = get();
    return comic?.panels.find((p) => p.id === selectedPanelId) ?? null;
  },
}));
