import React, { ChangeEventHandler, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as YUP from "yup";
import { country_list } from "../model/countries";
import { InitialFormikSignUPState } from "../types/types";
import { useAppDispatch, useAppSelector } from "../model/hooks";
import { db, storage } from "../firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { uid } from "uid";

import { usePrompt } from "../model/useBlocker";
import { Link } from "react-router-dom";
import {
  resetError,
  resetSuccess,
  setIsEditing,
} from "../redux/slices/auth/auth-slice";
import { signUp } from "../redux/slices/auth/async-thunks";
import SmallLoader from "../components/UI/SmallLoader";

import { set, ref as reff } from "firebase/database";

const InitialFormikValues: InitialFormikSignUPState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  country: "",
};
const SignupPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUploaded, setImageUploded] = useState<boolean>(true);

  const auth = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

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
    onSubmit: (values) => {
      if (image === null) return;
      dispatch(setIsEditing(false));
      dispatch(
        signUp({
          email: values.email,
          password: values.password,
          returnSecureToken: true,
        })
      );
    },
  });

  useEffect(() => {
    if (auth.success === true) {
      const imageRef = ref(storage, `images/${formik.values.email}`);

      const uuid = uid();
      set(reff(db, `/users/${uuid}`), {
        uid: uuid,
        name: formik.values.firstName + " " + formik.values.lastName,
        nationality: formik.values.country,
        email: formik.values.email,
        cart: [],
        totalNumberOfItem: 0,
      });
      uploadBytes(imageRef, image!).then(() => console.log("Image uploaded"));
      setTimeout(() => {
        dispatch(resetSuccess());
      }, 1500);
    }
    if (auth.error != null) {
      setTimeout(() => {
        dispatch(resetError());
      }, 1500);
    }
  }, [auth.success, auth.error]);
  useEffect(() => {
    if (formik.dirty) {
      dispatch(setIsEditing(true));
    }
  }, [formik.dirty]);
  const firstNErr = formik.touched.firstName && formik.errors.firstName;
  const lastNErr = formik.touched.lastName && formik.errors.lastName;
  const emailErr = formik.touched.email && formik.errors.email;
  const passwordErr = formik.touched.password && formik.errors.password;
  const countryErr = formik.touched.country && formik.errors.country;
  usePrompt(
    "You haven't finished filling the form, are you sure you want to leave this page?",
    auth.isEditing
  );

  const imageUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.currentTarget.files![0]);
  };
  const signUpClickHandler = () => {
    if (image === null) {
      setImageUploded(false);
    } else {
      setImageUploded(true);
    }
  };

  return (
    <div className="bg-gray-100 p-8 px-5 sm:px-8 max-w-[30rem] mx-auto mt-[3rem] rounded-lg animate-slideup ">
      <h1 className="text-[#a75b29] text-2xl font-bold text-center mb-4">
        Signup
      </h1>
      <form onSubmit={formik.handleSubmit} className="text-center">
        <div className="flex gap-2">
          <div className="flex flex-col flex-1">
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
          <div className=" flex flex-col flex-1">
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
        <div className="flex gap-2 mt-4">
          <div
            className={`${
              imageUploaded ? "" : "border-red-600"
            } border flex-1 px-2 py-2 text-start rounded-lg`}
          >
            {image?.name}
          </div>
          <label
            htmlFor="files"
            className="bg-[#C56E33] hover:bg-[#a75b29] text-white px-5 py-3 rounded-xl h-[3rem]"
          >
            Choose Image
          </label>
          <input
            id="files"
            type="file"
            className="hidden"
            onChange={imageUploadHandler}
          />
        </div>

        <button
          className="border-none px-5 py-2 hover:bg-[#a75b29] bg-[#C56E33] text-white rounded-lg w-[10rem] mt-4"
          onClick={signUpClickHandler}
        >
          Signup
        </button>
        <Link
          to={"/signin"}
          className="text-gray-400 text-sm mt-2 hover:text-[#C56E33] cursor-pointer block"
        >
          login with existing user
        </Link>
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

export default SignupPage;
