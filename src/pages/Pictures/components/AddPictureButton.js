import styles from "./PictureItem.module.css";
import { fireStorage } from "../../../firebase/config";

export const AddPictureButton = ({ userId, addDoc }) => {
  const handleImageUpload = async (event) => {
    console.log('try to upload')

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
          onChange={(event)=>{
            handleImageUpload(event)
            // Setting null so that it allows for selecting the same file
            event.target.value=null
          }}
        />
      </label>
    </div>
  );
};
