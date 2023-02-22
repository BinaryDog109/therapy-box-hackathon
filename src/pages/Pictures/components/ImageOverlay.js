import styles from "./ImageOverlay.module.css";
/**
 * 
 * @description A sub-component of the photos page. A fullscreen overlay to display images
 */
export const ImageOverlay = ({
  imageUrl,
  description = "",
  setOpenOverlay
}) => {
  return (
    <div onClick={()=>setOpenOverlay({open:false})} className={styles["image-overlay"]}>
      <img src={imageUrl} alt={description} />
    </div>
  );
};
