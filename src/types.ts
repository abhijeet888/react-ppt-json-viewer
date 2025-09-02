export type TextElement = {
  type: "text";
  x: number; y: number; width: number; height: number;
  text: string;
  fontSize?: number;
  bold?: boolean;
  color?: string;
  rotation?: number;
};

export type ImageElement = {
  type: "image";
  x: number; y: number; width: number; height: number;
  src: string; // data URL or absolute URL
  rotation?: number;
};

export type Element = TextElement | ImageElement;

export type Slide = {
  width: number;   // slide width in px
  height: number;  // slide height in px
  background?: { color?: string; image?: string };
  elements: Element[];
};

export type Deck = {
  slides: Slide[];
};
