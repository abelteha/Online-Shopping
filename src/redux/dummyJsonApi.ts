import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dummyJsonApi = createApi({
  reducerPath: "dummyJsonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),

  endpoints: (builder) => ({
    getAllCategories: builder.query<string[], void>({
      query: () => "/products/categories",
    }),
    getCategoryProducts: builder.query<{ products: any[] }, string | undefined>(
      {
        query: (category) => `/products/category/${category}`,
      }
    ),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryProductsQuery } =
  dummyJsonApi;
