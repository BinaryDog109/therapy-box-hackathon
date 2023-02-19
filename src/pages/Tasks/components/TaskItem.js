import styles from "./TaskItem.module.css";
export const TaskItem = ({ id, title, completed, toggleTask, deleteTask }) => {
  return (
    <li className={styles["task-item"]}>
      <span
        style={{
          textDecorationLine: completed ? "line-through" : "none",
          textDecorationColor: "gray",
        }}
      >
        {title}
      </span>
      <label>
        <input
          onChange={() => {
            toggleTask(id, !completed);
          }}
          checked={completed}
          type="checkbox"
        />
        <span className={styles["checkmark"]}></span>
      </label>
      <div className={styles["buttons"]}>
        <button
          onClick={() => {
            deleteTask(id);
          }}
          className={styles["delete-button"]}
        ></button>
      </div>
    </li>
  );
};
