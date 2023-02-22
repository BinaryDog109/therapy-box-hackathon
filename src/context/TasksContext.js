import { createContext } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";
/**
 * @description A React Context and Context provider that keep track of the tasks list of a user
*/
export const TasksContext = createContext();
export const TasksContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [tasks, error] = useCollection(
    "Tasks",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  const contextValueObject = { tasks, user, error };

  return (
    <TasksContext.Provider value={contextValueObject}>
      {children}
    </TasksContext.Provider>
  );
};
