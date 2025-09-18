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
  "slides": [
    {
      "id": 1,
      "background": {
        "color": "#ffffff",
        "image":"https://picsum.photos/seed/picsum/200/300"
      },
      "height": 500,
      "width": 500,
      "elements": [
        {
          "type": "text",
          "text": "Hello World",
          "x": 100,
          "y": 100,
          "fontSize": 24,
          "color": "#000000",
          "height":100,
          "width": 200,
          "rotation": 0,
          "bold": false
        },
        {
          "type": "image",
          "src": "https://picsum.photos/id/237/200/300",
          "x": 50,
          "y": 200,
          "width": 200,
          "height": 100
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

## Uploading the JSON file from local

```bash 
import React, { useState } from 'react';
import ReactPPT from "../ReactPPT"

const App: React.FC = () => {
  const [file, setFile] = useState<string>("");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
       const responseArray = await event.target.files[0].text()
       setFile(JSON.parse(responseArray));
    }
  };

  return (
    <div>
      <h1>React JSON to PPT Viewer</h1>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <ReactPPT file={file} />
    </div>
  );
};

export default App;
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
      "background": {
        "color": "#ffffff",
        "image":"https://picsum.photos/seed/picsum/200/300"
      },
      "height": 500,
      "width": 500,
      "elements": [
        {
          "type": "text",
          "text": "Hello World",
          "x": 100,
          "y": 100,
          "fontSize": 24,
          "color": "#000000",
          "height":100,
          "width": 200,
          "rotation": 0,
          "bold": false
        },
        {
          "type": "image",
          "src": "https://picsum.photos/id/237/200/300",
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



