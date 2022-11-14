import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { InitialProductState, Products, Search } from "../types/types";

const initialState: InitialProductState = {
  products: [],
  activeImg: "",
};

const Products = createSlice({
  name: "Products",
  initialState: initialState,
  reducers: {
    setNewCategoryProducts(state, action) {
      state.products = action.payload;
    },
    getSingleProduct(state, action: PayloadAction<string>) {
      const products = state.products.filter(
        (item: Products) => item.title === action.payload
      );

      if (products.length > 0) {
        localStorage.setItem("SingleProduct", JSON.stringify(products[0]));
      }
    },
    setDefaultActiveImg(state) {
      const SingleProduct: Products = JSON.parse(
        localStorage.getItem("SingleProduct")!
      );

      state.activeImg = SingleProduct.thumbnail;
    },
    setActiveImg(state, action: PayloadAction<string>) {
      state.activeImg = action.payload;
    },
  },
});

export const ProductsAction = Products.actions;
export default Products.reducer;
