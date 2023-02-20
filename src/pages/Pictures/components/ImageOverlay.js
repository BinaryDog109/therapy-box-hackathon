import styles from "./ImageOverlay.module.css";
// A fullscreen overlay to display images
export const ImageOverlay = ({
  imageUrl,
  description = "",
  setOpenOverlay
}) => {
  console.log(imageUrl)
  return (
    <div onClick={()=>setOpenOverlay({open:false})} className={styles["image-overlay"]}>
      <img src={imageUrl} alt={description} />
    </div>
  );
};
