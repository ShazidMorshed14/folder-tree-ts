import React, { useState, useEffect } from "react";
import Folder from "./components/Folder";
// import explorer from "./components/Data/folderData";
import "./App.css";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFolder from "./components/AddFolder/AddFolder";
import DeleteFolder from "./components/DeleteFolder/DeleteFolder";
import { BASE_URL } from "./helper/helper";

function App() {
  const [explorer, setExplorer] = useState<any>();

  const fetchData = () => {
    axios
      .get(`${BASE_URL}/api/data`)
      .then((response) => {
        //console.log("success response", response.data);
        if (response.data.Data.id) {
          console.log("api response-->", response.data);
          setExplorer(response.data.Data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
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
