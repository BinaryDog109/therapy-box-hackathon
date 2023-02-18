import styles from "./PictureItem.module.css";
export const PictureItem = ({addButton=false}) => {

  return (
    <div className={styles["item"]}>
      {
        addButton?
        <img className={styles["addButtonImage"]} src="./assets/Plus_button.png"></img>:
        <div></div>
      }
    </div>
  );
};
