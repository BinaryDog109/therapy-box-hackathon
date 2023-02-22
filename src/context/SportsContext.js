import { createContext, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGetDocument } from "../hooks/useGetDocument";
/**
 * @description A React Context and Context provider that keep track of the favorite team set by a specific user
*/
export const SportsContext = createContext();
export const SportsContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [document, error] = useGetDocument("Sports", user.uid);
  
  const contextValueObject = { document, error };

  return (
    <SportsContext.Provider value={contextValueObject}>
      {children}
    </SportsContext.Provider>
  );
};
