import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { OpenRoutes } from "./routes/OpenRoutes";
import VerifyManager from "./views/auth/VerifyManager";
import InactiveManager from "./views/auth/InactiveManager";
import Waiting from "./views/auth/Waiting";
import Login from "./views/auth/Login";
import MainLayout from "./views/MainLayout";
import Dashboard from "./views/Dashboard";
import Unauthorized from "./views/auth/Unauthorized";

const router = createBrowserRouter([
  {
    path: "/manager/:id",
    element: (
      <OpenRoutes>
        <VerifyManager />
      </OpenRoutes>
    ),
  },
  // make it so that this can't be accessed unless from verifyManager
  {
    path: "/manager/:id/manager-info",
    element: (
      <OpenRoutes>
        <InactiveManager />
      </OpenRoutes>
    ),
  },
  {
    path: "/manager/:id/waiting",
    element: (
      <OpenRoutes>
        <Waiting />
      </OpenRoutes>
    ),
  },
  {
    path: "/manager/:id/login",
    element: (
      <OpenRoutes>
        <Login />
      </OpenRoutes>
    ),
  },
  {
    path: "/unauthorized",
    element: (
      <OpenRoutes>
        <Unauthorized />
      </OpenRoutes>
    ),
  },
  {
    path: "/manager",
    element: (
      <PrivateRoutes>
        <MainLayout />
      </PrivateRoutes>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      // { path: "profile", element: <Profile /> },
      // { path: "users", element: <Users /> },
      // { path: "managers", element: <Manager /> },
      // { path: "products", element: <Products /> },
      // { path: "product-types", element: <ProductTypes /> },
      // { path: "colors", element: <Colors /> },
      // { path: "images", element: <Images /> },
      // { path: "image-types", element: <ImageTypes /> },
      // { path: "image-categories", element: <ImageCategories /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
