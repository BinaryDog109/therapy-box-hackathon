import { useState } from "react";
import { ImageOverlay } from "./components/ImageOverlay";
import { PictureItem } from "./components/PictureItem";
import { usePhotosContext } from "../../hooks/usePhotosContext";
import styles from "./PicturesPage.module.css";
import { AddPictureButton } from "./components/AddPictureButton";
export const PicturesPage = () => {
  const [openOverlay, setOpenOverlay] = useState({ open: false, url: "" });
  const { photos, user, error } = usePhotosContext();
  return (
    <>
      <h2>Photos</h2>
      {openOverlay.open && (
        <ImageOverlay
          imageUrl={openOverlay.url}
          setOpenOverlay={setOpenOverlay}
        />
      )}
      <div className={styles["container"]}>
        <AddPictureButton userId={user.uid} />
        {photos && photos.map((photo) => (
          <PictureItem {...photo} key={photo.id} setOpenOverlay={setOpenOverlay} />
        ))}
      </div>
    </>
  );
};
