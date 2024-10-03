import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContextProvider";
import { GlobalContextProps } from "../types/types";

export const useCart = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useCart must be used within a GlobalProvider");
  }
  return context;
};