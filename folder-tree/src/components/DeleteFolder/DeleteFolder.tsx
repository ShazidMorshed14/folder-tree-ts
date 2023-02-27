import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { generate } from "../Data/randomNumberGenerator";

export interface DeleteFolderProps {
  explorer: any;
  setExplorer: React.Dispatch<React.SetStateAction<any[]>>;
}

const DeleteFolder: React.FC<DeleteFolderProps> = ({
  explorer,
  setExplorer,
}) => {
  const { parentName, parentId } = useParams();
  console.log(parentId);

  const navigate = useNavigate();

  function remove(array: any, id: any): any {
    return array.some((o: any, i: any, a: any) =>
      o.id === id ? a.splice(i, 1) : remove(o.items || [], id)
    );
  }

  const handleDelete = (e: any) => {
    remove(explorer.items, parentId);
    setExplorer(explorer);
    console.log("explorer", explorer);
    navigate("/");
  };

  return (
    <div className="box_wrapper">
      <div className="box">
        <h1>Delete {parentName}</h1>
        <div className="button_wrapper">
          <button
            style={{ backgroundColor: "red" }}
            onClick={(e) => navigate("/")}
          >
            Cancel
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFolder;
