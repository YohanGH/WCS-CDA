import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/sections/Footer";
import Header from "./components/sections/Header";

function App() {
  return (
    <>
      <Header />
      <main className="main-content" aria-label="Main Content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
