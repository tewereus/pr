import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RootLayout from "./pages/RootLayout"
import ErrorPage from "./pages/ErrorPage"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />},
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ]
  }
])


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
