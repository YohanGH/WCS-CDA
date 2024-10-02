import App from "../App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home.tsx";
import Ad from "../pages/Ad.tsx";
import Category from "../pages/Category.tsx";
import NotFound from "../pages/NotFound.tsx";
import AdForm from "../pages/AdForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "ads/:slug",
        element: <Ad />,
      },
      {
        path: "/post-ad",
        element: <AdForm/>
      },
      {
        path: "category/:slug",
        element: <Category />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
