import { useTasksContext } from "../../../hooks/useTasksContext";
import itemStyles from "../../Tasks/components/TaskItem.module.css";
import styles from "./TaskInfo.module.css";
// A thumbnail that only displays the top three tasks
export const TasksInfo = () => {
  const { tasks, error } = useTasksContext();
  const topTasks = tasks && tasks.slice(0, 3);
  return (
    <div className={styles["container"]}>
      <ul>
        {topTasks &&
          topTasks.map((task) => (
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
  );
};
