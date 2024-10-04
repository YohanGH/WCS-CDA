import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.tsx";
import NotFound from "../pages/NotFound.tsx";

// Using lazy loading for pages
const Home = lazy(() => import("../pages/Home.tsx"));
const Ad = lazy(() => import("../pages/Ad.tsx"));
const AdForm = lazy(() => import("../pages/AdForm.tsx"));
const Category = lazy(() => import("../pages/Category.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Quelque chose n'a pas fonctionné.</div>, // TODO : Create a beautifful components for error
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "ads/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Ad />
          </Suspense>
        ),
      },
      {
        path: "/post-ad",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdForm />
          </Suspense>
        ),
      },
      {
        path: "category/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Category />
          </Suspense>
        ),
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
