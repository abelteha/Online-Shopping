import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  userName: "",
  cart: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
