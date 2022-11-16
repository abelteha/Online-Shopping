import React from "react";
import { useFormik } from "formik";
import * as YUP from "yup";
import { InitialFormikSignInState } from "../../types/types";

const Signin = () => {
  const formikInitialValues: InitialFormikSignInState = {
    email: "",
    password: "",
  };
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
    onSubmit: (values, { setSubmitting }) => {},
  });

  const emailErr = formik.touched.email && formik.errors.email;
  const passwordErr = formik.touched.password && formik.errors.password;
  return (
    <div className="bg-gray-100 p-5 py-10 sm:p-10 max-w-[25rem] mx-5 mt-[5rem] rounded-lg">
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
          className="block h-[3rem] w-full border rounded-lg pl-4 my-4 text-sm sm:text-base"
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
          className="block h-[3rem] w-full border rounded-lg pl-4 mt-4 text-sm sm:text-base"
        />
        <p className="text-gray-500 italic text-right hover:text-[#C56E33] cursor-pointer mb-2 text-sm sm:text-base">
          forgot password?
        </p>

        {passwordErr && (
          <p className="text-red-600 text-center">{formik.errors.password}</p>
        )}
        <button
          className="border-none px-5 py-2 hover:bg-[#a75b29] bg-[#C56E33] text-white rounded-lg w-[10rem] mt-4"
          onClick={() => {}}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Signin;
