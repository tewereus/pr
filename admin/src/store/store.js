import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/userSlice";
import productsReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    products: productReducer,
  },
});
