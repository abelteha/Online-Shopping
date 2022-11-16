import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Products } from "../../types/types";

export const dummyJsonApi = createApi({
  reducerPath: "dummyJsonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/products",
  }),

  endpoints: (builder) => ({
    getAllCategories: builder.query<string[], void>({
      query: () => "/categories",
    }),
    getCategoryProducts: builder.query<
      { products: Products[] },
      string | undefined
    >({
      query: (category) => `/category/${category}`,
    }),
    getSingleProduct: builder.query<Products, number>({
      query: (id) => `/${id}`,
    }),
    getSearchedItem: builder.query<{ products: Products[] }, string>({
      query: (searchText) => `/search?q=${searchText}`,
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryProductsQuery,
  useGetSearchedItemQuery,
} = dummyJsonApi;
