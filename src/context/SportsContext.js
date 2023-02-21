import { createContext, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGetDocument } from "../hooks/useGetDocument";

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
