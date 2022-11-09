import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dummyJsonApi = createApi({
  reducerPath: "dummyJsonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),

  endpoints: (builder) => ({
    getAllProducts: builder.query<{ products: any[] }, void>({
      query: () => "/products",
    }),
    getCategoryProducts: builder.query<{ products: any[] }, string | undefined>(
      {
        query: (category) => `/products/category/${category}`,
      }
    ),
  }),
});

export const { useGetAllProductsQuery, useGetCategoryProductsQuery } =
  dummyJsonApi;
