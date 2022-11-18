import { configureStore } from "@reduxjs/toolkit";

import { dummyJsonApi } from "./api/dummyJsonApi";
import products from "./slices/products-slice";
import searchReducer from "./slices/search-slice";
import authReducer from "./slices/auth/auth-slice";

export const store = configureStore({
  reducer: {
    [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
    productReducer: products,
    searchReducer: searchReducer,
    authReducer: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyJsonApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
