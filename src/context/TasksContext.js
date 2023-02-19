import { createContext } from "react";
import { useCollection } from "../hooks/useCollection";

export const TasksContext = createContext();
export const TasksContextProvider = ({ children }) => {
  const [tasks, error] = useCollection("Tasks", ["createdAt", "desc"]);

  const contextValueObject = { tasks, error };

  return (
    <TasksContext.Provider value={contextValueObject}>
      {children}
    </TasksContext.Provider>
  );
};
