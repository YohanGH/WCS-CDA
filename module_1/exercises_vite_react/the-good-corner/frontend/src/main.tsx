import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import Router from "./config/router.tsx";
import "./globals.css";
import { GlobalProvider } from "./contexts/GlobalContextProvider.tsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./config/client.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <GlobalProvider>
        <Router />
        <Toaster position="bottom-right" />
      </GlobalProvider>
    </ApolloProvider>
  </StrictMode>
);
