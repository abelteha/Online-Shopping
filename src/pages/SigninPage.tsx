import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as YUP from "yup";
import { InitialFormikSignInState } from "../types/types";
import { useAppDispatch, useAppSelector } from "../model/hooks";
import { resetSuccess, setIsEditing } from "../redux/slices/auth/auth-slice";
import { Link, useNavigate } from "react-router-dom";
import { usePrompt } from "../model/useBlocker";
import Loader from "../components/UI/Loader";
import SmallLoader from "../components/UI/SmallLoader";
import { signIn } from "../redux/slices/auth/async-thunks";
const formikInitialValues: InitialFormikSignInState = {
  email: "",
  password: "",
};
const SigninPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.authReducer);

  const formik = useFormik({
    initialValues: formikInitialValues,
    validationSchema: YUP.object({
      email: YUP.string()
        .email("Invalid Email!")
        .required("email is required!"),
      password: YUP.string()
        .min(6, "password must have atleast 6 characters!")
        .required("Password is required!"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      dispatch(setIsEditing(false));
      dispatch(
        signIn({
          email: values.email,
          password: values.password,
          returnSecureToken: true,
        })
      );
    },
  });
  useEffect(() => {
    if (auth.success === true) {
      navigate("/");
    }
    setTimeout(() => {
      dispatch(resetSuccess());
    }, 1500);
  }, [auth.success]);
  useEffect(() => {
    if (formik.dirty) {
      dispatch(setIsEditing(true));
    }
  }, [formik.dirty]);

  const emailErr = formik.touched.email && formik.errors.email;
  const passwordErr = formik.touched.password && formik.errors.password;

  usePrompt(
    "You haven't finished filling the form, are you sure you want to leave this page?",
    auth.isEditing
  );
  return (
    <div className="bg-gray-100 p-5 py-10 sm:p-10 max-w-[30rem] mx-auto mt-[5rem] rounded-lg animate-slideup">
      <h1 className="text-[#a75b29] text-2xl font-bold text-center mb-4">
        Signin
      </h1>
      <form onSubmit={formik.handleSubmit} className="text-center">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="username or email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="block h-[3rem] w-full border rounded-lg pl-4 my-4 text-sm sm:text-base outline-[#a75b29]"
        />
        {emailErr && (
          <p className="text-red-600 text-center">{formik.errors.email}</p>
        )}
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="block h-[3rem] w-full border rounded-lg pl-4 mt-4 text-sm sm:text-base outline-[#a75b29]"
        />
        <Link
          to={"forgotPassword"}
          className="text-gray-500 italic text-right hover:text-[#C56E33] cursor-pointer mb-2 text-sm sm:text-base block"
        >
          forgot password?
        </Link>
        {passwordErr && (
          <p className="text-red-600 text-center">{formik.errors.password}</p>
        )}
        <button
          className="border-none px-5 py-2 hover:bg-[#a75b29] bg-[#C56E33] text-white rounded-lg w-[10rem] mt-4 "
          onClick={() => {}}
        >
          Login
        </button>
        <Link
          to={"/signup"}
          className="text-gray-400 text-sm mt-2 hover:text-[#C56E33] cursor-pointer block"
        >
          Create new account
        </Link>{" "}
        {auth.isLoading && <SmallLoader />}
        {auth.error && (
          <p className="text-red-600 text-center mt-2">{auth.error}</p>
        )}
        {auth.success && (
          <p className="text-green-500 text-center mt-2">success!</p>
        )}
      </form>
    </div>
  );
};

export default SigninPage;
