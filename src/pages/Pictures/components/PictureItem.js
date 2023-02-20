import styles from "./PictureItem.module.css";
export const PictureItem = ({ setOpenOverlay, id, imageUrl }) => {
  return (
    <>
      <div
        onClick={() => setOpenOverlay({ open: true, url: imageUrl })}
        className={styles["item"]}
      >
        <div
          style={{ backgroundImage: `url(${imageUrl})` }}
          className={styles["uploaded-image-cell"]}
        ></div>
      </div>
    </>
  );
};
