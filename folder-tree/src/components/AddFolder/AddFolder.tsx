import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { generate } from "../Data/randomNumberGenerator";

export interface AddFolderProps {
  explorer: any;
  setExplorer: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddFolder: React.FC<AddFolderProps> = ({ explorer, setExplorer }) => {
  const { parentName, parentId } = useParams();
  console.log(parentId);

  const navigate = useNavigate();

  const [folderName, setFolderName] = useState("");

  function add(array: [], id: any, newName: String, folderId: String): any {
    return array.some((o: any, i: any, a: any) =>
      o.id === id
        ? a[i].items.push({
            id: folderId,
            name: newName,
            isFolder: true,
            items: [],
          })
        : add(o.items || [], id, newName, folderId)
    );
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (folderName) {
      let folderId = folderName.replaceAll(" ", "_");
      folderId = folderId + "_" + generate(3);
      if (parentId === "Root") {
        explorer.items.push({
          id: folderId,
          name: folderName,
          isFolder: true,
          items: [],
        });
        setExplorer(explorer);
        console.log("explorer", explorer);
      } else {
        add(explorer.items, parentId, folderName, folderId);
        setExplorer(explorer);
        console.log("explorer", explorer);
      }

      console.log("after update", explorer);
      navigate("/");
    } else {
      alert("Folder name can't be empty");
    }
  };

  return (
    <div className="box_wrapper">
      <div className="box">
        <h1>Add New Folder in {parentName}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Folder Name"
            value={folderName}
            onChange={(e: any) => setFolderName(e.target.value)}
          />
          <br></br>
          <div className="button_wrapper">
            <button
              style={{ backgroundColor: "red" }}
              onClick={(e) => navigate("/")}
              type="button"
            >
              Cancel
            </button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFolder;
