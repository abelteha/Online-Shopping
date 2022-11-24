import React, { useEffect } from "react";
import payImg from "../assets/payment.jpg";
import { BsCreditCard2Back } from "react-icons/bs";
import { country_list } from "../model/countries";
import { useFormik } from "formik";
import * as YUP from "yup";
import { InitialFormikCheckOutState } from "../types/types";
import { usePrompt } from "../model/useBlocker";

import { useAppDispatch, useAppSelector } from "../model/hooks";
import {
  setIsEditingPaymentForm,
  setSuccessFullTransaction,
  setTotalPrice,
} from "../redux/slices/user-slice";
import { remove, ref as reff, update } from "firebase/database";
import { db } from "../firebase";

const InitialFormikValues: InitialFormikCheckOutState = {
  cardHolderName: "",
  cardNumber: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};
const PaymentDetail = () => {
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: InitialFormikValues,
    validationSchema: YUP.object({
      cardHolderName: YUP.string().required("required!"),
      cardNumber: YUP.string()
        .min(12, "You card number must be at least 12 digits!")
        .required("required!"),
      address: YUP.string().required("required!"),
      city: YUP.string().required("required!"),
      postalCode: YUP.string().required("required!"),
      country: YUP.string().required("Please select your country!"),
    }),
    onSubmit: (values) => {
      dispatch(setIsEditingPaymentForm(false));
      dispatch(setTotalPrice(0));
      dispatch(setSuccessFullTransaction(true));

      const userid = localStorage.getItem("uid");
      if (userid) {
        remove(reff(db, `users/${userid}/cart`));
        update(reff(db, `users/${userid}/`), {
          totalNumberOfItem: 0,
        });
      }
    },
  });

  useEffect(() => {
    if (formik.dirty) {
      dispatch(setIsEditingPaymentForm(true));
    }
  }, [formik.dirty]);
  const cardHolderErr =
    formik.touched.cardHolderName && formik.errors.cardHolderName;
  const cardNumberErr = formik.touched.cardNumber && formik.errors.cardNumber;
  const addressErr = formik.touched.address && formik.errors.address;
  const cityErr = formik.touched.city && formik.errors.city;
  const postalCErr = formik.touched.postalCode && formik.errors.postalCode;
  const countryErr = formik.touched.country && formik.errors.country;
  usePrompt(
    "You haven't finished filling the form, are you sure you want to leave this page?",
    user.isEditingPaymentForm
  );

  const payButtonHandler = () => {};

  return (
    <div className="flex justify-around sm:items-center  h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)] lg:mx-10 animate-slideup overflow-scroll">
      <img
        src={payImg}
        alt=""
        className="max-w-[25rem] object-cover hidden md:block"
      />
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl my-7">Payment Details</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="relative sm:w-[23rem] w-[19rem]">
            <input
              type="text"
              name="cardHolderName"
              id="cardHolderName"
              value={formik.values.cardHolderName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={`w-full bg-gray-100 rounded-lg sm:h-[4rem] h-[3.5rem] px-4 pt-3 sm:pt-2 text-base  ${
                cardHolderErr && "border-2 border-red-600"
              } outline-[#ffad76]`}
            />
            <span className="absolute left-4 top-2 z-10 text-xs text-gray-400">
              Cardholder name
            </span>
          </div>

          <div className="relative sm:w-[23rem] w-[19rem]">
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              value={formik.values.cardNumber}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={`w-full bg-gray-100 rounded-lg sm:h-[4rem] h-[3.5rem] px-4 pt-3 sm:pt-2  text-base ${
                cardNumberErr && "border-2 border-red-600"
              } outline-[#ffad76]`}
              placeholder="xxxx-xxxx-xxxx-xxxx"
            />
            <span className="absolute left-4 top-2 z-10 text-xs text-gray-400">
              <BsCreditCard2Back className="inline text-md mr-1" />
              Card number
            </span>
          </div>
          {cardNumberErr && (
            <p className="text-red-600 text-center">
              {formik.errors.cardNumber}
            </p>
          )}
          <p className="text-xl ">Billing Details</p>
          <div className="relative sm:w-[23rem] w-[19rem]">
            <input
              type="text"
              name="address"
              id="address"
              value={formik.values.address}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={`w-full bg-gray-100 rounded-lg sm:h-[4rem] h-[3.5rem] pt-3 sm:pt-2 px-[15px]  text-base ${
                addressErr && "border-2 border-red-600"
              } outline-[#ffad76]`}
            />
            <span className="absolute left-4 top-2 z-10 text-xs text-gray-400">
              Street Address
            </span>
          </div>

          <div className="flex gap-4">
            <div className="relative sm:w-[11rem] w-[9rem] ">
              <input
                type="text"
                name="city"
                id="city"
                value={formik.values.city}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={`w-full bg-gray-100 rounded-lg sm:h-[4rem] h-[3.5rem] pt-3 sm:pt-2 px-[15px] text-base ${
                  cityErr && "border-2 border-red-600"
                } outline-[#ffad76]`}
              />
              <span className="absolute left-4 top-2 z-10 text-xs text-gray-400">
                City
              </span>
            </div>

            <div className="relative sm:w-[11rem] w-[9rem]">
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                value={formik.values.postalCode}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={`w-full bg-gray-100 rounded-lg sm:h-[4rem] h-[3.5rem] pt-3 sm:pt-2 px-[15px]  text-base ${
                  postalCErr && "border-2 border-red-600"
                } outline-[#ffad76]`}
              />
              <span className="absolute left-4 top-2 z-10 text-xs text-gray-400">
                Postal Code
              </span>
            </div>
          </div>
          <div className="relative sm:w-[23rem] w-[19rem]">
            <select
              name="country"
              id="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              className={`w-full bg-gray-100 rounded-lg sm:h-[4rem] h-[3.5rem] pt-3 sm:pt-2 px-[11px] sm:px-[11px] text-base ${
                countryErr && "border-2 border-red-600"
              } outline-[#ffad76]`}
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
            <span className="absolute left-4 top-2 z-10 text-xs text-gray-400">
              Country
            </span>
          </div>

          <button
            className="bg-[#C56E33] hover:bg-[#a75b29] text-white h-[3rem] rounded-md"
            onClick={payButtonHandler}
          >
            Pay ${user.totalPrice}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentDetail;
