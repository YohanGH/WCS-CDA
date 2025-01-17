import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/App.tsx";
import NotFound from "@/pages/NotFound.tsx";
import CyberpunkLoader from "@/components/CyberpunkLoader.tsx";
import ErrorElement from "@/components/ErrorElement.tsx";
import ProtectedRoute from "@/components/hoc/ProtectedRoute";
import AdminDashboard from "@/pages/Admin";

// Using lazy loading for pages
const Home = lazy(() => import("@/pages/Home.tsx"));
const Ad = lazy(() => import("@/pages/Ad.tsx"));
const AdForm = lazy(() => import("@/pages/AdForm.tsx"));
const Categories = lazy(() => import("@/pages/Categories.tsx"));
const Category = lazy(() => import("@/pages/Category.tsx"));
const Auth = lazy(() => import("@/pages/Auth.tsx"))
// Test error
const ErrorTest = lazy(() => import("@/test/ui/ErrorTest.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<CyberpunkLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/ads/:id",
        element: (
          <Suspense fallback={<CyberpunkLoader />}>
            <Ad />
          </Suspense>
        ),
      },
      {
        path: "/post-ad",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<CyberpunkLoader />}>
              <AdForm />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <Suspense fallback={<CyberpunkLoader />}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "/category/:id",
        element: (
          <Suspense fallback={<CyberpunkLoader />}>
            <Category />
          </Suspense>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "auth",
        element: (
          <Suspense fallback={<CyberpunkLoader />}>
            <Auth />
          </Suspense>
        )
      },
      {
        path: "/test-error",
        element: (
          <Suspense fallback={<CyberpunkLoader />}>
            <ErrorTest />
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
