import { useEffect, useState } from "react";
import { useDeleteDocument } from "../../../hooks/useDeleteDocument";
import styles from "./PictureItem.module.css";
export const PictureItem = ({ setOpenOverlay, id, imageUrl, deleteDoc }) => {
  const handleDelete=()=>{
    deleteDoc(id)
  }
  return (
    <>
      <div
        className={styles["item"]}
      >
        <div
        onClick={() => setOpenOverlay({ open: true, url: imageUrl })}

          style={{ backgroundImage: `url(${imageUrl})` }}
          className={styles["uploaded-image-cell"]}
        >
        </div>
        <button onClick={handleDelete} className={styles["delete-button"]}>x</button>

      </div>
    </>
  );
};
