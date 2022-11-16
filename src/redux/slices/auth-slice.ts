import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isEditing: false,
    forgotPassword: false,
    token: null,
    user: null,
  },
  reducers: {
    setIsEditing(state, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
    },
    forgotPasswordClicked(state, action: PayloadAction<boolean>) {
      state.forgotPassword = action.payload;
    },
  },
});

export const { setIsEditing, forgotPasswordClicked } = authSlice.actions;

export default authSlice.reducer;
