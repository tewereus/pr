import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { OpenRoutes } from "./routes/OpenRoutes";
import Login from "./views/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <OpenRoutes>
        <Login />
      </OpenRoutes>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
