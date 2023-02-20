import { createContext, useEffect, useState } from "react";
import { fireAuth } from "../firebase/config";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    // Check if a user has logged in at initial launch once (unsub immediately afterwards)
    const unsub = fireAuth.onAuthStateChanged((user) => {
      setUser(user);
      setAuthChecked(true);
      unsub();
    });
    
  }, []);
  const contextValueObject = { user, authChecked, setUser };
  return (
    <AuthContext.Provider value={contextValueObject}>
      {children}
    </AuthContext.Provider>
  );
};
