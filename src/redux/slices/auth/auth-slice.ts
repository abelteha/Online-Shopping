import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { InitialAuthState } from "../../../types/types";
import { forgotPassword, signIn, signUp } from "./async-thunks";

const InitialState: InitialAuthState = {
  isAuthenticated: false,
  isEditing: false,
  isLoading: false,
  error: null,
  success: false,
  data: null,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: InitialState,
  reducers: {
    setIsEditing(state, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
    },
    resetSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.error = null;
      state.data = null;
      state.isLoading = true;
      // console.log(state.isLoading);
    });
    builder.addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(signUp.pending, (state) => {
      state.error = null;
      state.data = null;
      state.isLoading = true;
    });
    builder.addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.error = null;
      state.data = null;
      state.isLoading = true;
    });
    builder.addCase(
      forgotPassword.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(
      forgotPassword.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.success = true;
      }
    );
  },
});

export const { setIsEditing, resetSuccess } = authSlice.actions;

export default authSlice.reducer;
