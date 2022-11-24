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
  feedbackNumber: 0,
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

      const feedbacks = [action.payload];
      state.productsFeedback = feedbacks;

      let cleanArry = [];
      for (let key in state.productsFeedback[0]) {
        if (state.productsFeedback[0][key].id) {
          // state.feedbackNumber++;
          cleanArry.push(state.productsFeedback[0][key]);
        }
        if (
          state.productsFeedback[0][key].id ===
          +localStorage.getItem("productId")!
        ) {
          state.singleProductFeedback.push(state.productsFeedback[0][key]);
        }
      }
      state.feedbackNumber = cleanArry.length;
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
