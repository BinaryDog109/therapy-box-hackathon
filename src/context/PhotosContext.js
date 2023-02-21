import { createContext } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";

export const PhotosContext = createContext();
export const PhotosContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [photos, error] = useCollection(
    "Photos",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  const contextValueObject = { photos, user, error };

  return (
    <PhotosContext.Provider value={contextValueObject}>
      {children}
    </PhotosContext.Provider>
  );
};
