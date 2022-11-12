import { configureStore } from "@reduxjs/toolkit";

import { dummyJsonApi } from "./dummyJsonApi";
import categoryProducts from "./category-products";

export const store = configureStore({
  reducer: {
    [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
    categoryReducer: categoryProducts,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyJsonApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
