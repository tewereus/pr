import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { OpenRoutes } from "./routes/OpenRoutes";
import VerifyManager from "./views/auth/VerifyManager";
import InactiveManager from "./views/auth/InactiveManager";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
