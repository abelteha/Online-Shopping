import React from "react";
import { useFormik } from "formik";
import * as YUP from "yup";
import { country_list } from "../../model/countries";
import { InitialFormikSignUPState } from "../../types/types";

const InitialFormikValues: InitialFormikSignUPState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  country: "",
};
const Signup = () => {
  const formik = useFormik({
    initialValues: InitialFormikValues,
    validationSchema: YUP.object({
      firstName: YUP.string().required("required!"),
      lastName: YUP.string().required("required!"),
      email: YUP.string()
        .email("Please enter a valid email")
        .required("Email must be provided!"),
      password: YUP.string()
        .min(6, "password must have atleast 6 characters!")
        .required("Password must be provided!"),
      country: YUP.string().required("Please select your country!"),
    }),
    onSubmit: (values, { setSubmitting }) => {},
  });
  const firstNErr = formik.touched.firstName && formik.errors.firstName;
  const lastNErr = formik.touched.lastName && formik.errors.lastName;
  const emailErr = formik.touched.email && formik.errors.email;
  const passwordErr = formik.touched.password && formik.errors.password;
  const countryErr = formik.touched.country && formik.errors.country;
  return (
    <div className="bg-gray-100 p-8 px-5 sm:px-8 max-w-[25rem] mx-5 mt-[3rem] rounded-lg ">
      <h1 className="text-[#a75b29] text-2xl font-bold text-center mb-4">
        Signup
      </h1>
      <form onSubmit={formik.handleSubmit} className="text-center">
        <div className="flex gap-2">
          <div className="flex flex-col">
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={formik.values.firstName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="block h-[3rem] w-full border rounded-lg pl-4  text-sm sm:text-base outline-[#a75b29]"
            />
            {firstNErr && (
              <p className="text-red-600 text-center">
                {formik.errors.firstName}
              </p>
            )}
          </div>
          <div className=" flex flex-col">
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={formik.values.lastName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="block h-[3rem] w-full border rounded-lg pl-4  text-sm sm:text-base outline-[#a75b29]"
            />
            {lastNErr && (
              <p className="text-red-600 text-center">
                {formik.errors.lastName}
              </p>
            )}
          </div>
        </div>

        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
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
          placeholder="Password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="block h-[3rem] w-full border rounded-lg pl-4 my-4 text-sm sm:text-base outline-[#a75b29]"
        />
        {passwordErr && (
          <p className="text-red-600 text-center">{formik.errors.password}</p>
        )}
        <select
          name="country"
          id="nationality"
          placeholder="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          className="block h-[3rem] w-full border rounded-lg px-4 my-4 text-sm sm:text-base outline-[#a75b29]"
        >
          <option value="" selected={true} disabled={true}>
            Choose your country
          </option>
          {country_list.map((country) => (
            <option value={country} key={country}>
              {country}
            </option>
          ))}
        </select>
        {countryErr && (
          <p className="text-red-600 text-center">{formik.errors.country}</p>
        )}
        <button
          className="border-none px-5 py-2 hover:bg-[#a75b29] bg-[#C56E33] text-white rounded-lg w-[10rem] mt-4"
          onClick={() => {}}
        >
          Signup
        </button>
        <p className="text-gray-400 text-sm mt-2 hover:text-[#C56E33] cursor-pointer">
          login with existing user
        </p>
      </form>
    </div>
  );
};

export default Signup;
