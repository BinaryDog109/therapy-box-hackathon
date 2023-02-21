import { useContext } from "react";
import { SportsContext } from "../context/SportsContext";
export const useSportsContext = () => {
  const context = useContext(SportsContext);
  if (!context) {
    throw new Error("You must be inside SportsContextProvider");
  }
  return context;
};
