import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { OpenRoutes } from "./routes/OpenRoutes";
import Login from "./views/auth/Login";
import VerifyManager from "./views/auth/VerifyManager";
import RegisterManager from "./views/auth/RegisterManager";
import MainLayout from "./views/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <OpenRoutes>
        <Login />
      </OpenRoutes>
    ),
  },
  {
    path: "/verify-manager",
    element: (
      <OpenRoutes>
        <VerifyManager />
      </OpenRoutes>
    ),
  },
  {
    path: "/register-manager",
    element: (
      <OpenRoutes>
        <RegisterManager />
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
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
