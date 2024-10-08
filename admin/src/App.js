import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLogin from "./views/auth/AdminLogin";
import MainLayout from "./views/MainLayout";
import Dashboard from "./views/Dashboard";
import Users from "./views/users/Users";
import Manager from "./views/users/manager/Manager";
import Printers from "./views/users/printers/Printers";
import Products from "./views/products/Products";
import ProductTypes from "./views/prodTypes/ProductTypes";
import { PrivateRoutes } from "./views/routes/PrivateRoutes";
import { OpenRoutes } from "./views/routes/OpenRoutes";
import Colors from "./views/color/Colors";
import Images from "./views/images/image/Images";
import ImageTypes from "./views/images/imageTypes/ImageTypes";
import ImageCategories from "./views/images/imageCategories/ImageCategories";
import Profile from "./views/auth/Profile";
import Address from "./views/address/Address";

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
      { path: "profile", element: <Profile /> },
      { path: "users", element: <Users /> },
      { path: "managers", element: <Manager /> },
      { path: "printers", element: <Printers /> },
      { path: "products", element: <Products /> },
      { path: "product-types", element: <ProductTypes /> },
      { path: "address", element: <Address /> },
      { path: "colors", element: <Colors /> },
      { path: "images", element: <Images /> },
      { path: "image-types", element: <ImageTypes /> },
      { path: "image-categories", element: <ImageCategories /> },
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
