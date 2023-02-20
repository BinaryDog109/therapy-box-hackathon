import { useContext } from "react";
import { PhotosContext } from "../context/PhotosContext";
export const usePhotosContext = () => {
  const context = useContext(PhotosContext);
  if (!context) {
    throw new Error("You must be inside PhotosContextProvider");
  }
  return context;
};
