import { createContext } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";
/**
 * @description A React Context and Context provider that keep track all the photos of a specific user
*/
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
