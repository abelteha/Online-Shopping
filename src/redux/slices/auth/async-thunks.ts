import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ForgotPasswordRequest,
  SignUporInRequest,
  UserRegister,
} from "../../../types/types";

const API_KEY = "AIzaSyDtC4a-ge3O-RgGH-Huy4p0Mj_8kKDnFi4";
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (requestObject: SignUporInRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        requestObject
      );
      const data = await response.data;
      return data;
    } catch (e: any) {
      if (e.response.data.error.message === "EMAIL_NOT_FOUND") {
        return rejectWithValue("No user with this email!");
      } else if (e.message === "Network Error") {
        return rejectWithValue("Connection error!, check your internet.");
      } else {
        return rejectWithValue("Username or password is incorrect!");
      }
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (requestObject: SignUporInRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        requestObject
      );
      const data = await response.data;
      return data;
    } catch (e: any) {
      if (e.message === "Network Error") {
        return rejectWithValue("Connection error!, check your internet.");
      } else {
        return rejectWithValue("Email already in use!, may be signin?");
      }
    }
  }
);

// export const userRegister = createAsyncThunk(
//   "user/userRegister",
//   async (requestObject, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `https://ecommerce-auth-7369e-default-rtdb.europe-west1.firebasedatabase.app/${API_KEY}?`,
//         requestObject
//       );
//       const data = await response.data;
//       return
//     } catch (e) {}
//   }
// );

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (requestObject: ForgotPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        requestObject
      );
      const data = await response.data;
      return data;
    } catch (e: any) {
      if (e.message === "Network Error") {
        return rejectWithValue("Connection error!, check your internet.");
      } else {
        return rejectWithValue("Email  not found!");
      }
    }
  }
);
