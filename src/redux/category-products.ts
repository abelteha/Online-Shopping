import { createSlice, current } from "@reduxjs/toolkit";
import { InitialState, Products } from "../model/Product";

const initialState: InitialState = {
  products: [],
  activeImg: "",
};

const categoryProducts = createSlice({
  name: "categoryProducts",
  initialState: initialState,
  reducers: {
    setNewCategoryProducts(state, action) {
      state.products = action.payload;
    },
    getSingleProduct(state, action) {
      const products = state.products.filter(
        (item: Products) => item.title === action.payload
      );

      if (products.length > 0) {
        localStorage.setItem("SingleProduct", JSON.stringify(products[0]));
        console.log(localStorage.getItem("SingleProduct"));
      }
    },
    setDefaultActiveImg(state) {
      const SingleProduct: Products = JSON.parse(
        localStorage.getItem("SingleProduct")!
      );

      state.activeImg = SingleProduct.thumbnail;
    },
    setActiveImg(state, action) {
      state.activeImg = action.payload;
    },
  },
});

export const categoryProductsAction = categoryProducts.actions;
export default categoryProducts.reducer;
