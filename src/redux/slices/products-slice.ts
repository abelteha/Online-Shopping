import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import {
  feedBacks,
  InitialProductState,
  Products,
  Search,
} from "../../types/types";

const initialState: InitialProductState = {
  products: [],
  activeImg: "",
  productsFeedback: [],
  singleProductFeedback: [],
  productId: null,
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
        localStorage.setItem("productId", `${products[0].id}`);
        state.productId = products[0].id;
      }
    },
    setDefaultActiveImg(state) {
      const SingleProduct: Products = JSON.parse(
        localStorage.getItem("SingleProduct")!
      );

      state.activeImg = SingleProduct.thumbnail;
    },
    setDefaultId(state) {
      state.productId = +localStorage.getItem("productId")!;
    },
    setProductsFeedback(state, action: PayloadAction<any[]>) {
      state.productsFeedback.length = 0;
      state.singleProductFeedback.length = 0;
      // console.log(action.payload, state.productId);
      const feedbacks = [action.payload];
      state.productsFeedback = feedbacks;
      console.log(state.productsFeedback);
      for (let key in state.productsFeedback[0]) {
        console.log("in loop");

        if (
          state.productsFeedback[0][key].id ===
          +localStorage.getItem("productId")!
        ) {
          state.singleProductFeedback.push(state.productsFeedback[0][key]);
        }
      }
      console.log(current(state.singleProductFeedback));
    },
    setSingleProductFeedback(state, action: PayloadAction<feedBacks[]>) {
      state.singleProductFeedback = action.payload;
    },
    setActiveImg(state, action: PayloadAction<string>) {
      state.activeImg = action.payload;
    },
  },
});

export const ProductsAction = Products.actions;
export default Products.reducer;
