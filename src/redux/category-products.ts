import { createSlice, current } from "@reduxjs/toolkit";
import { Products } from "../model/Product";

const categoryProducts = createSlice({
  name: "categoryProducts",
  initialState: {
    products: [],
    SingleProduct: {},
  },
  reducers: {
    setNewCategoryProducts(state, action) {
      state.products = action.payload;
    },
    getSingleProduct(state, action) {
      state.SingleProduct = {};
      const products = state.products.filter(
        (item: Products) => item.title === action.payload
      );
      state.SingleProduct = products[0];
    },
  },
});

export const categoryProductsAction = categoryProducts.actions;
export default categoryProducts.reducer;
