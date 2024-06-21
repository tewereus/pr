import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/userSlice";
import productReducer from "../features/products/productSlice";
import prodTypeReducer from "../features/productType/prodTypeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    products: productReducer,
    productTypes: prodTypeReducer,
  },
});
