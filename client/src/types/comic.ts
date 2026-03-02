export type BubbleStyle = 'speech' | 'thought' | 'shout';
export type TailDirection = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export interface BaseElement {
  id: string;
  x: number;       // pixels inside 800x600 logical canvas
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  flipX: boolean;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  label: string;
}

export interface BubbleElement extends BaseElement {
  type: 'bubble';
  text: string;
  style: BubbleStyle;
  tailDirection: TailDirection;
  fontSize: number;
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontSize: number;
  color: string;
  bold: boolean;
}

export interface StickerElement extends BaseElement {
  type: 'sticker';
  emoji: string;
}

export type ComicElement = ImageElement | BubbleElement | TextElement | StickerElement;

// Distributive Omit — correctly distributes over union members
type DistributiveOmit<T, K extends string> = T extends unknown ? Omit<T, K> : never;
export type NewComicElement = DistributiveOmit<ComicElement, 'id' | 'zIndex'>;

export type BackgroundType = 'solid' | 'gradient';

export interface SolidBackground {
  type: 'solid';
  color: string;
}

export interface GradientBackground {
  type: 'gradient';
  from: string;
  to: string;
  direction: 'to bottom' | 'to top' | 'to right' | 'to bottom right';
}

export type Background = SolidBackground | GradientBackground;

export interface Panel {
  id: string;
  order: number;
  background: Background;
  elements: ComicElement[];
}

export interface Comic {
  id: string;
  title: string;
  panels: Panel[];
}

export type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error';
