import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoMdAddCircleOutline } from "react-icons/io";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiOutlineFolder } from "react-icons/ai";
import { MdOutlineExpandMore } from "react-icons/md";

export interface FolderProps {
  explorer: any;
}

const Folder: FC<FolderProps> = ({ explorer }) => {
  console.log("explorer from files", explorer);
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();

  const handleAddClick = (parentName: any, parentId: any) => {
    navigate(`/add/${parentName}/${parentId}`);
  };
  const handleDeleteClick = (parentName: any, parentId: any) => {
    navigate(`/delete/${parentName}/${parentId}`);
  };
  return (
    <>
      {explorer ? (
        <div>
          <div
            className="full_box"
            style={{
              cursor: "pointer",
            }}
          >
            <span className="name-section">
              <span onClick={() => setExpand(!expand)}>
                <MdOutlineExpandMore className="icon_section" />
                <AiOutlineFolder className="icon_section" /> {explorer.name}
              </span>{" "}
              <span
                onClick={() => handleDeleteClick(explorer.name, explorer.id)}
              >
                {explorer.id === "Root" ? (
                  <></>
                ) : (
                  <AiFillCloseCircle className="icon_section" />
                )}
              </span>
            </span>
            <span onClick={() => handleAddClick(explorer.name, explorer.id)}>
              <IoMdAddCircleOutline className="icon_section" /> New
            </span>
          </div>
          <br />
          <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
            {explorer.items.map((explore: any) => (
              <Folder key={explore.name} explorer={explore} />
            ))}
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default Folder;
