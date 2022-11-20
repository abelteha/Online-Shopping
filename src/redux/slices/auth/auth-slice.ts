import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { InitialAuthState } from "../../../types/types";
import { forgotPassword, signIn, signUp } from "./async-thunks";

const InitialState: InitialAuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
  timeToExpire: null,
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

    resetError(state) {
      state.error = null;
    },
    logOut(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("expireOn");
      localStorage.removeItem("userEmail");
      state.isAuthenticated = false;

      console.log(state.success);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.error = null;
      state.data = null;
      state.isLoading = true;
      console.log(state.success);
    });
    builder.addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.success = true;
      console.log();

      localStorage.setItem("token", state.data?.idToken!);
      localStorage.setItem("userEmail", state.data?.email!);

      state.isAuthenticated = true;
      const tokenSetTime = new Date().getTime();
      const tokenExpiringTime = tokenSetTime + 3600000;
      const toRealTime = new Date(tokenExpiringTime);

      localStorage.setItem("expireOn", toRealTime.toISOString());
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

export const { setIsEditing, resetSuccess, resetError, logOut } =
  authSlice.actions;

export default authSlice.reducer;
