import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { OpenRoutes } from "./routes/OpenRoutes";
import VerifyManager from "./views/auth/VerifyManager";
import InactiveManager from "./views/auth/InactiveManager";
import Waiting from "./views/auth/Waiting";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
