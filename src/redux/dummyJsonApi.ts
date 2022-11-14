import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Products } from "../types/Product";

export const dummyJsonApi = createApi({
  reducerPath: "dummyJsonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),

  endpoints: (builder) => ({
    getAllCategories: builder.query<string[], void>({
      query: () => "/products/categories",
    }),
    getCategoryProducts: builder.query<
      { products: Products[] },
      string | undefined
    >({
      query: (category) => `/products/category/${category}`,
    }),
    getSingleProduct: builder.query<{}, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryProductsQuery } =
  dummyJsonApi;
