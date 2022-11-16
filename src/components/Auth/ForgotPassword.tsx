import React from "react";
import { useFormik } from "formik";
import * as YUP from "yup";
const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      resetEmail: "",
    },
    validationSchema: YUP.object({
      resetEmail: YUP.string()
        .email("Invalid Email!")
        .required("email is required!"),
    }),
    onSubmit: (values, { setSubmitting }) => {},
  });
  const emailErr = formik.touched.resetEmail && formik.errors.resetEmail;
  return (
    <div className="bg-gray-100 p-5 py-10 sm:p-10 max-w-[25rem] mx-5 mt-[5rem] rounded-lg">
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
        <button
          className="border-none px-5 py-2 hover:bg-[#a75b29] bg-[#C56E33] text-white rounded-lg w-[10rem] mt-4"
          onClick={() => {}}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
