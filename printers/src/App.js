import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { OpenRoutes } from "./routes/OpenRoutes";
import VerifyManager from "./views/auth/VerifyManager";
import InactiveManager from "./views/auth/InactiveManager";
import Waiting from "./views/auth/Waiting";
import Login from "./views/auth/Login";
import MainLayout from "./views/MainLayout";
import Dashboard from "./views/Dashboard";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <OpenRoutes>
        <VerifyManager />
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
