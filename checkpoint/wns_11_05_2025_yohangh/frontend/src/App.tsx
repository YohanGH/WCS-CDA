import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { CountryDetail } from "./pages/CountryDetail"
import { PageLayout } from "./components/Layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route Component={PageLayout}>
            <Route path="/" Component={HomePage} />
            <Route path="/country/:code" Component={CountryDetail} />
            <Route path="*" Component={() => <Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
