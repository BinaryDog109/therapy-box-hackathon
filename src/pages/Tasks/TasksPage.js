import { useEffect, useState } from "react";
import { TaskItem } from "./components/TaskItem";
import styles from "./TaskPage.module.css";
import itemStyles from "./components/TaskItem.module.css";
import { useTasksContext } from "../../hooks/useTasksContext";
import { useAddDocument } from "../../hooks/useAddDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
export const TasksPage = () => {
  const { tasks, error } = useTasksContext();
  const [addOperationStatus, addDoc] = useAddDocument("Tasks");
  const [updateOperationStatus, updateDoc] = useUpdateDocument("Tasks");
  const [deleteOperationStatus, deleteDoc] = useDeleteDocument("Tasks");
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  // The following useEffects are to check whether the add or update operation has been successful
  // and react based on its status
  useEffect(() => {
    if (addOperationStatus.success) {
      console.log("New task added:", addOperationStatus.document);
      setNewTaskTitle("");
      setShowNewTask(false);
    }
    if (addOperationStatus.error) {
      console.log("Error in adding a new task:");
      console.error(addOperationStatus.error);
    }
  }, [addOperationStatus]);
  useEffect(() => {
    if (updateOperationStatus.success) {
      console.log("Task updated");
    }
    if (updateOperationStatus.error) {
      console.log("Error in updating a task:");
      console.error(updateOperationStatus.error);
    }
  }, [updateOperationStatus]);
  useEffect(() => {
    if (deleteOperationStatus.success) {
      console.log("Task deleted");
    }
    if (deleteOperationStatus.error) {
      console.log("Error in deleting a task:");
      console.error(deleteOperationStatus.error);
    }
  }, [deleteOperationStatus]);

  const deleteTask = (id) => {
    deleteDoc(id);
  };
  const toggleTask = (id, completed) => {
    updateDoc(id, { completed });
  };
  const updateTaskTitle = (id, title) => {
    updateDoc(id, { title });
  };
  const handleAddNewTask = () => {
    const title = newTaskTitle || "New Task";
    const newTask = { title, completed: false };
    addDoc(newTask);
  };
  if (error) {
    console.error(error);
    return <p>Error in fetching tasks: {error}</p>;
  }
  return (
    <>
      <h2 className="left-position">Tasks</h2>
      <div className={styles["container"]}>
        <ul className={styles["task-list"]}>
          {showNewTask && (
            <li
              className={`${itemStyles["task-item"]} ${itemStyles["new-task"]}`}
            >
              <div className={itemStyles["vertical-button-group"]}>
                <button
                  onClick={() => {
                    setShowNewTask(false);
                  }}
                  className={itemStyles["delete-button"]}
                ></button>
                <button
                  onClick={handleAddNewTask}
                  className={itemStyles["confirm-button"]}
                ></button>
              </div>
              <input
                placeholder="Add a new task..."
                type="text"
                name="new-task"
                id="new-task"
                value={newTaskTitle}
                onChange={(e) => {
                  setNewTaskTitle(e.target.value);
                }}
              />
            </li>
          )}
          {tasks &&
            tasks.map((task) => (
              <TaskItem
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                updateTaskTitle={updateTaskTitle}
                key={task.id}
                {...task}
              />
            ))}
        </ul>
        <button
          onClick={() => {
            setShowNewTask(!showNewTask);
          }}
          className={styles["add-btn"]}
        >
          <img src="./assets/Plus_button_small.png" alt="Add Task button" />
        </button>
      </div>
    </>
  );
};
