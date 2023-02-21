import { useTasksContext } from "../../../hooks/useTasksContext";
import itemStyles from "../../Tasks/components/TaskItem.module.css";
import styles from "./TaskInfo.module.css";
// A thumbnail that only displays the top three tasks
export const TasksInfo = () => {
  const { tasks, error } = useTasksContext();
  const topTasks = tasks && tasks.slice(0, 3);
  if (error) {
    console.error(error);
  }
  return (topTasks && topTasks.length && !error) ? (
    <div className={styles["container"]}>
      <ul>
        {topTasks.map((task) => (
          <li className={itemStyles["task-item"]} key={task.id}>
            <span
              style={{
                textDecorationLine: task.completed ? "line-through" : "none",
                textDecorationColor: "black",
              }}
              className={styles["title"]}
            >
              {task.title}
            </span>
            <label>
              <input defaultChecked={task.completed} type="checkbox" />
              <span
                className={`${itemStyles["checkmark"]} ${styles["checkmark"]} `}
              ></span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div
      style={{
        flexGrow: "1",
        display: "grid",
        placeItems: "center",
        fontSize: "var(--body-big-fs)",
        color: "initial",
      }}
    >
      {error ? "Error fetching tasks" : "✔️ Add some todos!"}
    </div>
  );
};
