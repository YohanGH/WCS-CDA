import React, { createContext, useState, useCallback } from "react";
import { GlobalContextProps } from "../types/types";

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartTotal, setCartTotal] = useState<number>(0);

  const onAddToCart = useCallback((price: number) => {
    setCartTotal((prevTotal) => prevTotal + price);
  }, []);

  return (
    <GlobalContext.Provider value={{ cartTotal, onAddToCart }}>
      {children}
    </GlobalContext.Provider>
  );
};
