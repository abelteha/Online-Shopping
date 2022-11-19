import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { imagesFetchType, InitialUserState } from "../../types/types";

const initialState: InitialUserState = {
  uid: "",
  userName: "",
  email: "",
  image: "",
  cart: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUserImage } = userSlice.actions;
