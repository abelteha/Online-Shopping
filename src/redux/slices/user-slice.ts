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
      // state.userName = action.payload.data.name;
      // state.totalCartItems = action.payload.data.totalNumberOfItem;
      // state.uid = action.payload.id;
      // if (!!action.payload.cart) {
      //   state.cart.length = 0;
      //   state.cart = action.payload.data.cart;
      // }

      const data = action.payload;
      for (let key in data) {
        const userEmail = localStorage.getItem("userEmail");

        if (data[key].email === userEmail) {
          state.userName = data[key].name;
          state.totalCartItems = data[key].totalNumberOfItem;
          if (!!data[key].cart) {
            state.cart.length = 0;
            state.cart = data[key].cart;
          }
        }
        console.log(state.userName, current(state.cart));
      }
    },
  },
});

export default userSlice.reducer;
export const { setUserImage, setUserCart } = userSlice.actions;
