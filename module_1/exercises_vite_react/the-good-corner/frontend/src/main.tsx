import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import Router from "./config/router.tsx";
import "./App.css";
import { GlobalProvider } from "./contexts/GlobalContextProvider.tsx";
import { DarkModeProvider } from "./contexts/DarkModeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <DarkModeProvider>
        <Router />
        <Toaster position="bottom-right" />
      </DarkModeProvider>
    </GlobalProvider>
  </StrictMode>
);
