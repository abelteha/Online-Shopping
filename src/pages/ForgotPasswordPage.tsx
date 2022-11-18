import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as YUP from "yup";
import { useAppDispatch, useAppSelector } from "../model/hooks";
import { setIsEditing } from "../redux/slices/auth/auth-slice";
import { usePrompt } from "../model/useBlocker";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../redux/slices/auth/async-thunks";
import SmallLoader from "../components/UI/SmallLoader";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      resetEmail: "",
    },
    validationSchema: YUP.object({
      resetEmail: YUP.string()
        .email("Invalid Email!")
        .required("email is required!"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      dispatch(setIsEditing(false));
      dispatch(
        forgotPassword({
          requestType: "PASSWORD_RESET",
          email: values.resetEmail,
        })
      );
    },
  });
  useEffect(() => {
    if (formik.submitCount > 0 && auth.isEditing === false) {
      // navigate("/");
    }
  }, [auth.isEditing]);
  useEffect(() => {
    if (formik.dirty && formik.submitCount === 0) {
      dispatch(setIsEditing(true));
    }
  }, [formik.dirty]);
  const emailErr = formik.touched.resetEmail && formik.errors.resetEmail;
  usePrompt("are you sure you want to leave this page?,", auth.isEditing);
  return (
    <div className="bg-gray-100 p-5 py-10 sm:p-10 max-w-[30rem] mx-auto mt-[5rem] rounded-lg animate-slideup">
      <h1 className="text-[#a75b29] text-2xl font-bold text-center mb-4">
        Reset password
      </h1>
      <form onSubmit={formik.handleSubmit} className="text-center">
        <input
          type="text"
          name="resetEmail"
          id="resetEmail"
          placeholder="reset email"
          value={formik.values.resetEmail}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="block h-[3rem] w-full border rounded-lg pl-4 my-4 text-sm sm:text-base outline-[#a75b29]"
        />
        {emailErr && (
          <p className="text-red-600 text-center">{formik.errors.resetEmail}</p>
        )}
        <div>
          <button
            type="submit"
            className="border-none px-5 py-2 hover:bg-[#a75b29] bg-[#C56E33] text-white rounded-lg w-[10rem] mt-4 mr-4"
            onClick={() => {}}
          >
            Reset
          </button>
        </div>
      </form>
      <Link to={"/signin"}>
        <p className="text-center mt-4 text-gray-400 hover:text-[#C56E33]">
          back to signin page?
        </p>
      </Link>
      {auth.isLoading && <SmallLoader />}
      {auth.error && (
        <p className="text-red-600 text-center mt-2">{auth.error}</p>
      )}
      {auth.success && (
        <p className="text-green-500 text-center mt-2">success!</p>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
