import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { imagesFetchType, InitialUserState } from "../../types/types";

const initialState: InitialUserState = {
  uid: "",
  userName: "",
  email: localStorage.getItem("userEmail"),
  image: "",
  cart: [],
  itemExistInCart: false,
  totalCartItems: 0,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setIfItemExitsInCart(state, action: PayloadAction<boolean>) {
      state.itemExistInCart = action.payload;
    },
    setDefaultAmount(state, action: PayloadAction<number>) {
      state.totalCartItems = action.payload;
    },
    setUserCart(state, action: PayloadAction<any>) {
      const data = action.payload;
      for (let key in data) {
        const userEmail = localStorage.getItem("userEmail");

        if (data[key].email === userEmail) {
          state.userName = data[key].name;
          localStorage.setItem("totalAmt", data[key].totalNumberOfItem);

          console.log(state.totalCartItems);
          localStorage.setItem("uid", key);

          if (!!data[key].cart) {
            const onlineCart = data[key].cart;
            state.cart.length = 0;
            // for (let c in onlineCart) {
            //   state.cart.push(onlineCart[c]);
            // }
            state.cart = [onlineCart];
          }
        }
      }
    },
    setCart(state, action: PayloadAction<any>) {
      const cart = action.payload.cart;
      state.totalCartItems = action.payload.totalNumberOfItem;
      state.cart.length = 0;
      // for (let c in cart) {
      //   state.cart.push(cart[c]);
      // }
      state.cart = [cart];

      // console.log(state.cart);
    },
  },
});

export default userSlice.reducer;
export const {
  setUserImage,
  setUserCart,
  setCart,
  setDefaultAmount,
  setIfItemExitsInCart,
} = userSlice.actions;
