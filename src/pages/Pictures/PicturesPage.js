import { useEffect, useState } from "react";
import { ImageOverlay } from "./components/ImageOverlay";
import { PictureItem } from "./components/PictureItem";
import { usePhotosContext } from "../../hooks/usePhotosContext";
import styles from "./PicturesPage.module.css";
import { AddPictureButton } from "./components/AddPictureButton";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { Hints } from "../../components-public/Hints";
import { useAddDocument } from "../../hooks/useAddDocument";
export const PicturesPage = () => {
  const [openOverlay, setOpenOverlay] = useState({ open: false, url: "" });
  const { photos, user, error: fetchingError } = usePhotosContext();
  const [addOperationStatus, addDoc] = useAddDocument("Photos");
  const [deleteOperationStatus, deleteDoc] = useDeleteDocument("Photos");
  const [errors, setErrors] = useState([]);
  const [successes, setSuccesses] = useState([]);
  useEffect(() => {
    if (fetchingError) {
      console.error(fetchingError);
      setErrors(["Error in fetching photos"]);
    }
  }, [fetchingError]);
  // The following useEffects are to check whether the add or update operation has been successful
  // and react based on its status
  useEffect(() => {
    if (addOperationStatus.success) {
      console.log("New photo added");
      setSuccesses(["New photo added!"]);
    }
    if (addOperationStatus.error) {
      console.log("Error in adding a new photo:");
      console.error(addOperationStatus.error);
      setErrors(["Error in adding photos"]);
    }
  }, [addOperationStatus]);
  useEffect(() => {
    if (deleteOperationStatus.success) {
      console.log("Photo deleted");
      setSuccesses(["Photo deleted"]);
    }
    if (deleteOperationStatus.error) {
      console.log("Error in deleting a photo:");
      console.error(deleteOperationStatus.error);
      setErrors(["Error in deleting a photo"]);
    }
  }, [deleteOperationStatus]);
  return (
    <>
      <h2>Photos</h2>
      <Hints hints={errors} />
      <Hints hints={successes} isSuccessHints />
      {openOverlay.open && (
        <ImageOverlay
          imageUrl={openOverlay.url}
          setOpenOverlay={setOpenOverlay}
        />
      )}
      <div className={styles["container"]}>
        <AddPictureButton addDoc={addDoc} userId={user.uid} />
        {photos &&
          photos.map((photo) => (
            <PictureItem
              deleteDoc={deleteDoc}
              {...photo}
              key={photo.id}
              setOpenOverlay={setOpenOverlay}
            />
          ))}
      </div>
    </>
  );
};
