import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authReducer from "./auth/authSlice";
import usersReducer from "./users/userSlice";
import productReducer from "./products/productSlice";
import prodTypeReducer from "./productType/prodTypeSlice";
import colorReducer from "./color/colorSlice";
import addressReducer from "./address/adressSlice";
import imgCategoryReducer from "./images/imageCategories/imgCategorySlice";
import imgTypeReducer from "./images/imageTypes/imgTypeSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    users: usersReducer,
    products: productReducer,
    productTypes: prodTypeReducer,
    colors: colorReducer,
    addresses: addressReducer,
    imgCategories: imgCategoryReducer,
    imageTypes: imgTypeReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
