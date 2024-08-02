import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import RootLayout from "./pages/RootLayout";
// import ErrorPage from "./pages/ErrorPage";
// import Home from "./views/auth/Home";
import AdminLogin from "./views/auth/AdminLogin";
import MainLayout from "./views/MainLayout";
import Dashboard from "./views/Dashboard";
import Users from "./views/users/Users";
import Manager from "./views/users/manager/Manager";
import Products from "./views/products/Products";
import ProductTypes from "./views/prodTypes/ProductTypes";
// import Signup from "./views/Signup";
// import Profile from "./views/Profile";
// import ForgotPassword from "./views/ForgotPassword";
// import ResetPassword from "./views/ResetPassword";
// import VerifyEmail from "./views/VerifyEKsmail";
import { PrivateRoutes } from "./views/routes/PrivateRoutes";
import { OpenRoutes } from "./views/routes/OpenRoutes";
import Colors from "./views/color/Colors";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <OpenRoutes>
        <AdminLogin />
      </OpenRoutes>
    ),
  },
  {
    path: "/admin",
    element: (
      <PrivateRoutes>
        <MainLayout />
      </PrivateRoutes>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "manager", element: <Manager /> },
      { path: "products", element: <Products /> },
      { path: "product-types", element: <ProductTypes /> },
      { path: "colors", element: <Colors /> },
    ],
  },
  // errorElement: <ErrorPage />,
  // children: [
  // { index: true, element: <Home /> },
  // { path: "/", element: <Login /> },
  // { path: "/signup", element: <Signup /> },
  // { path: "/verify-email", element: <VerifyEmail /> },
  // { path: "/forgot-password", element: <ForgotPassword /> },
  // { path: "reset-password/:token", element: <ResetPassword /> },
  // {
  //   path: "/profile",
  //   element: (
  //     <PrivateRoutes>
  //       <Profile />
  //     </PrivateRoutes>
  //   ),
  // },
  // ],
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
