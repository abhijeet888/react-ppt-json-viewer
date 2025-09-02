import JSZip from "jszip";
import { useState } from "react";
import { ReactPPT } from "react-ppt-json-viewer";

function App() {
  const [pptData, setPptData] = useState<any | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith(".json")) {
      // ✅ JSON path
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          setPptData(json);
        } catch (err) {
          console.error("Invalid JSON file", err);
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith(".pptx")) {
      // ✅ PPTX path
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const zip = await JSZip.loadAsync(event.target?.result as ArrayBuffer);
          // Extract slide XMLs
          const slides: any[] = [];
          for (const filename of Object.keys(zip.files)) {
            if (filename.startsWith("ppt/slides/slide")) {
              const content = await zip.files[filename].async("text");
              slides.push({ name: filename, content });
            }
          }
          setPptData({ slides });
        } catch (err) {
          console.error("Error parsing PPTX", err);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Unsupported file type. Please upload .json or .pptx");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>React PPT JSON Viewer - Example</h2>

      <input type="file" accept=".json,.pptx, .ppt" onChange={handleFileUpload} />

      {pptData ? (
        <div style={{ marginTop: "20px" }}>
<ReactPPT file={pptData} />
        </div>
      ) : (
        <p>Upload a PPT JSON or PPTX file to preview</p>
      )}
    </div>
  );
}

export default App;
