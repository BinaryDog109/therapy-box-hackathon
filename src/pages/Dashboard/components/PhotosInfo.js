import itemStyles from "../../Pictures/components/PictureItem.module.css";
import styles from "./PhotosInfo.module.css";
import { usePhotosContext } from "../../../hooks/usePhotosContext";
export const PhotosInfo = () => {
  const { photos, user, error } = usePhotosContext();
  const filteredPhotos = photos ? photos.slice(0, 4) : [];
  if(error) {
    console.error(error)
  }
  return (
    <div className={styles["container"]}>
      {filteredPhotos.length && !error ? (
        filteredPhotos.map((photo) => (
          <div key={photo.id} className={itemStyles["item"]}>
            <div
              style={{
                backgroundImage: `url(${photo.imageUrl})`,
              }}
              className={itemStyles["uploaded-image-cell"]}
            ></div>
          </div>
        ))
      ) : (
        <div
          style={{
            fontSize: "var(--body-big-fs)",
            color: "initial",
            gridRow: '1/-1',
            gridColumn: '1/-1',
            justifySelf: 'center',
            alignSelf: 'center'
          }}
        >
          {error? 'Error fetching photos' : '📸 Photo Gallery'}
        </div>
      )}
    </div>
  );
};
