import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

    //api calling

    const reqBody = {
      _id: explorer._id,
      items: explorer.items,
    };

    axios
      .put("/api/data/update", reqBody)
      .then((response) => {
        //console.log("success response", response.data);
        if (response.data.Data.id) {
          console.log("update api response-->", response.data);
          setExplorer(response.data.Data);
          toast.error("Folder Deleted Successfully!", {
            autoClose: 1000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("after update", explorer);

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
