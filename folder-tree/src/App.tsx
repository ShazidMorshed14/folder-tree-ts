import React, { useState } from "react";
import Folder from "./components/Folder";
// import explorer from "./components/Data/folderData";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFolder from "./components/AddFolder/AddFolder";
import DeleteFolder from "./components/DeleteFolder/DeleteFolder";

function App() {
  const [explorer, setExplorer] = useState<any>({
    id: "Root",
    name: "Root",
    isFolder: true,
    items: [],
  });
  return (
    <div className="App">
      <h1>Folder Structure Tree</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Folder explorer={explorer} />} />
          <Route
            path="/add/:parentName/:parentId"
            element={
              <AddFolder explorer={explorer} setExplorer={setExplorer} />
            }
          />
          <Route
            path="/delete/:parentName/:parentId"
            element={
              <DeleteFolder explorer={explorer} setExplorer={setExplorer} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
