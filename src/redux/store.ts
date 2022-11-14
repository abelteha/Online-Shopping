import { configureStore } from "@reduxjs/toolkit";

import { dummyJsonApi } from "./dummyJsonApi";
import products from "./products-slice";
import searchReducer from "./search-slice";

export const store = configureStore({
  reducer: {
    [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
    productReducer: products,
    searchReducer: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyJsonApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
