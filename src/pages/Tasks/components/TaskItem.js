import { useState } from "react";
import styles from "./TaskItem.module.css";
export const TaskItem = ({ id, title, completed, updateTaskTitle, toggleTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setnewTitle] = useState(title);
  const completeStyle = {
    textDecorationLine: completed ? "line-through" : "none",
    textDecorationColor: "gray",
  };
  return (
    <li className={styles["task-item"]}>
      {isEditing ? (
        <input
          value={newTitle}
          onChange={(e) => {
            setnewTitle(e.target.value);
          }}
          onBlur={()=>{
            updateTaskTitle(id,newTitle)
          }}
          className={styles["edit-input"]}
          type="text"
          style={completeStyle}
        />
      ) : (
        <span
          onClick={() => {
            if (!isEditing) setIsEditing(true);
          }}
          style={completeStyle}
        >
          {title}
        </span>
      )}
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
