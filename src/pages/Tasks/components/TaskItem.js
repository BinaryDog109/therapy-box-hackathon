import styles from "./TaskItem.module.css";
export const TaskItem = () => {
  return (
    <li className={styles["task-item"]}>
      <span>Task1</span>
      <label>
        <input type="checkbox" />
        <span className={styles["checkmark"]}></span>
      </label>
    </li>
  );
};
