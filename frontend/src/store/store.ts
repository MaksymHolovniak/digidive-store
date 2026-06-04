import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import { authApi } from "./api/auth.api";
import { categoryApi } from "./api/category.api";
import { productApi } from "./api/product.api";
import { brandApi } from "./api/brand.api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      brandApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
