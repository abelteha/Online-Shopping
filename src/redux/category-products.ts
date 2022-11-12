import { createSlice, current } from "@reduxjs/toolkit";
import { InitialState, Products } from "../model/Product";

const categoryProducts = createSlice({
  name: "categoryProducts",
  initialState: {
    products: [],
    SingleProduct: {},
    activeImg: "",
  } as unknown as InitialState,
  reducers: {
    setNewCategoryProducts(state, action) {
      state.products = action.payload;
    },
    getSingleProduct(state, action) {
      const products = state.products.filter(
        (item: Products) => item.title === action.payload
      );
      state.SingleProduct = products[0];
    },
    setDefaultActiveImg(state) {
      state.activeImg = state.SingleProduct.thumbnail;
    },
    setActiveImg(state, action) {
      state.activeImg = action.payload;
    },
  },
});

export const categoryProductsAction = categoryProducts.actions;
export default categoryProducts.reducer;
