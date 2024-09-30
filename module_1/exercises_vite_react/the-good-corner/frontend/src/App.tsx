import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/sections/Footer";
import Header from "./components/sections/Header";

function App() {
  return (
    <div>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
