import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function PageLayout() {
  return (
    <body>
      <Header />
      <main>
        <Outlet />
      </main>
    </body>
  );
}
