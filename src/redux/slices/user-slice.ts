import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { imagesFetchType, InitialUserState } from "../../types/types";

const initialState: InitialUserState = {
  uid: "",
  userName: "",
  email: localStorage.getItem("userEmail"),
  image: "",
  cart: [],
  totalCartItems: 0,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setUserCart(state, action: PayloadAction<any>) {
      state.userName = action.payload.name;
      state.totalCartItems = action.payload.totalCartItems;
      if (!!action.payload.cart) {
        state.cart.length = 0;
        state.cart = action.payload.cart;
      }
      console.log(state.userName, state.cart);
    },
  },
});

export default userSlice.reducer;
export const { setUserImage, setUserCart } = userSlice.actions;
