import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const contextValueObject = { user, setUser };

  return (
    <AuthContext.Provider value={contextValueObject}>
      {children}
    </AuthContext.Provider>
  );
};
