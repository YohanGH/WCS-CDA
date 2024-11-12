import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import Router from "./config/router.tsx";
import "./globals.css";
import { GlobalProvider } from "./contexts/GlobalContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
        <Router />
        <Toaster position="bottom-right" />
    </GlobalProvider>
  </StrictMode>
);
