import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { OpenRoutes } from "./routes/OpenRoutes";

const router = createBrowserRouter([{}]);

function App() {
  // return <RouterProvider router={router} />;
  return <div>Manager page</div>;
}

export default App;
