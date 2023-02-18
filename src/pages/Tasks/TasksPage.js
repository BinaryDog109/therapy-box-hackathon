import { TaskItem } from "./components/TaskItem";
import styles from "./TaskPage.module.css";
export const TasksPage = () => {
  return (
    <>
      <h2 className="left-position">Tasks</h2>
      <div className={styles["container"]}>
        <ul className={styles["task-list"]}>
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </ul>
        <button className={styles["add-btn"]}>
          <img src="./assets/Plus_button_small.png" alt="Add Task button" />
        </button>
      </div>
    </>
  );
};
