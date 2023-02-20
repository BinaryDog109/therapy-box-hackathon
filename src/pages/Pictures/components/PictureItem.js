import styles from "./PictureItem.module.css";
export const PictureItem = ({ addButton = false, setOpenOverlay }) => {
  const handleImageUpload = () => {};
  return (
    <>
      <div
        onClick={() =>
          setOpenOverlay({ open: true, url: "https://tinyurl.com/4whf4vaj" })
        }
        className={styles["item"]}
      >
        {addButton ? (
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
        ) : (
          <div className={styles["uploaded-image-cell"]}></div>
        )}
      </div>
    </>
  );
};
