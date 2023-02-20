import styles from "./PictureItem.module.css";
import { useAddDocument } from "../../../hooks/useAddDocument";
import { fireStorage } from "../../../firebase/config";
import { useEffect } from "react";

export const AddPictureButton = ({ userId }) => {
  const [addOperationStatus, addDoc] = useAddDocument('Photos');
  // The following useEffects are to check whether the add or update operation has been successful
  // and react based on its status
  useEffect(() => {
    if (addOperationStatus.success) {
      console.log("New photo added:", addOperationStatus.document);
    }
    if (addOperationStatus.error) {
      console.log("Error in adding a new photo:");
      console.error(addOperationStatus.error);
    }
  }, [addOperationStatus]);
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || file.type.indexOf("image") === -1) {
      console.error("Please upload an image!");
      return;
    }
    const metadata = {
      contentType: "image/jpeg",
    };
    try {
      const ref = fireStorage.ref().child(`photos/${userId}/${file.name}`);
      await ref.put(file, metadata);
      const url = await ref.getDownloadURL();
      const newDoc = { uid: userId, imageUrl: url };
      await addDoc(newDoc);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles["item"]}>
      <label>
        <img
          className={styles["addButtonImage"]}
          src="./assets/Plus_button.png"
          alt="Upload button"
        ></img>
        <input
          style={{ display: "none" }}
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
};
