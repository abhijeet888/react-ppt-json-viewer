interface ElementProperties {
    x: number; 
    y: number; 
    width: number; 
    height: number; 
    rotation?: number;
};

export interface TextElement extends ElementProperties {
  type: "text";
  text: string;
  fontSize?: number;
  bold?: boolean;
  color?: string;
};

export interface ImageElement extends ElementProperties {
  type: "image";
  x: number; 
  y: number; 
  width: number; 
  height: number;
  src: string; // data URL or absolute URL
  rotation?: number;
};

export interface ShapeElement extends ElementProperties {
  type: "shape";
  shape: "circle" | "ellipse",
  fill: string,
  stroke: string,
  strokeWidth: number
}

export interface LineElement extends ElementProperties {
  stroke: string,
  strokeWidth: number,
  type: "line";
}

export type Element = TextElement | ImageElement | ShapeElement | LineElement;

export type Slide = {
  width: number;   // slide width in px
  height: number;  // slide height in px
  background?: { color?: string; image?: string };
  elements: Element[];
};

export type Deck = {
  slides: Slide[];
};
