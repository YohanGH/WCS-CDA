import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeProvider";
import { DarkModeContextProps } from "../types/types";

export const useDarkMode = (): DarkModeContextProps  => {
    const context = useContext(DarkModeContext);
    if (!context) {
      throw new Error("useDarkMode must be used within a DarkModeProvider");
    }
    return context;
  };