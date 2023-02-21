import itemStyles from "../../Pictures/components/PictureItem.module.css";
import styles from "./PhotosInfo.module.css";
import {usePhotosContext} from '../../../hooks/usePhotosContext'
export const PhotosInfo = () => {
    const { photos, user, error } = usePhotosContext()
    const filteredPhotos=photos? photos.slice(0,4):[]
  return (
    <div className={styles["container"]}>
      {filteredPhotos.map(photo=>(
        <div key={photo.id} className={itemStyles["item"]}>
            <div style={{
                backgroundImage:`url(${photo.imageUrl})`
            }} className={itemStyles['uploaded-image-cell']}></div>
        </div>
      ))}
    </div>
  );
};
