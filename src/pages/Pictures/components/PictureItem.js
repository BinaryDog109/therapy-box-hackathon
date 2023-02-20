import styles from "./PictureItem.module.css";
export const PictureItem = ({ addButton = false }) => {
  const handleImageUpload = () => {};
  return (
    <div className={styles["item"]}>
      {addButton ? (
        <label>
          <img
            className={styles["addButtonImage"]}
            src="./assets/Plus_button.png"
            alt="Upload an image"
          ></img>
          <input
            style={{ display: "none" }}
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      ) : (
        <div></div>
      )}
    </div>
  );
};
