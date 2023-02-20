import { useState } from "react";
import { ImageOverlay } from "./components/ImageOverlay";
import { PictureItem } from "./components/PictureItem";
import styles from "./PicturesPage.module.css";
export const PicturesPage = () => {
  const [openOverlay, setOpenOverlay] = useState({ open: false, url: "" });
  return (
    <>
      <h2>Photos</h2>
      {openOverlay.open && <ImageOverlay imageUrl={openOverlay.url} setOpenOverlay={setOpenOverlay} />}
      <div className={styles["container"]}>
        <PictureItem addButton />
        <PictureItem setOpenOverlay={setOpenOverlay} />
      </div>
    </>
  );
};
