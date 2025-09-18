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
