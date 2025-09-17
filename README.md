# react-ppt-json-viewer

Package Link - https://www.npmjs.com/package/react-ppt-json-viewer

A lightweight React component library for rendering PowerPoint presentations from JSON format.  
Ideal for building **custom PPT viewers** in the browser without heavy dependencies.

---

## Installation
```bash
npm install react-ppt-json-viewer

or

yarn add react-ppt-json-viewer
```
---

## Usage 

```bash
import React from "react";
import ReactPPT from "react-ppt-json-viewer";
```
---

## Pass JSON directly
```bash
const deck = {
  slides: [
    {
      id: 1,
      backgroundColor: "#ffffff",
      elements: [
        {
          type: "text",
          content: "Hello World",
          x: 100,
          y: 100,
          fontSize: 24,
          color: "#000000"
        }
      ]
    },
    {
      id: 2,
      backgroundColor: "#f0f0f0",
      elements: [
        {
          type: "image",
          src: "https://example.com/logo.png",
          x: 50,
          y: 200,
          width: 200,
          height: 100
        }
      ]
    }
  ]
};

export default function App() {
  return (
    <ReactPPT
      file={deck}        // Pass parsed JSON
      fitToWidth={800}   // Optional, width in px or % (default auto)
      controls={true}    // Show next/prev controls
      className="ppt-viewer"
    />
  );
}

```
---

## Load JSON from url

```bash
export default function App() {
  return (
    <ReactPPT
      file="/slides/deck.json"  // URL to JSON file
      fitToWidth="100%"
      controls
    />
  );
}
```
---

## Props

```bash
export type ReactPPTProps = {
  file: Deck | string;   // accept already-parsed Deck JSON or URL to JSON
  fitToWidth?: number | string;
  className?: string;
  controls?: boolean;
};
```
---

## Example DECK JSON 

```bash
{
  "slides": [
    {
      "id": 1,
      "backgroundColor": "#ffffff",
      "elements": [
        {
          "type": "text",
          "content": "Hello World",
          "x": 100,
          "y": 100,
          "fontSize": 24,
          "color": "#000000"
        },
        {
          "type": "image",
          "src": "https://example.com/logo.png",
          "x": 50,
          "y": 200,
          "width": 200,
          "height": 100
        }
      ]
    }
  ]
}
```



