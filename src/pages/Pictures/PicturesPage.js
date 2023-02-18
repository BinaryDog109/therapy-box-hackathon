import { PictureItem } from './components/PictureItem'
import styles from './PicturesPage.module.css'
export const PicturesPage = () => {
  return (
    <>
    <h2>Photos</h2>
    <div className={styles['container']}>
        <PictureItem addButton/>
        <PictureItem/>
        <PictureItem/>
        <PictureItem/>
        <PictureItem/>
        <PictureItem/>
    </div></>
  )
}