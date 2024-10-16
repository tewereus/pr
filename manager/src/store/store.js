import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import printerReducer from "./printer/printerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    printer: printerReducer,
  },
});
