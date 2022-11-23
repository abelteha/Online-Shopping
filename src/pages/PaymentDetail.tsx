import React from "react";
import payImg from "../assets/payment.jpg";
import { BsCreditCard2Back } from "react-icons/bs";

const PaymentDetail = () => {
  return (
    <div className="flex justify-between gap-10  lg:mx-10 animate-slideup">
      <img
        src={payImg}
        alt=""
        className="w-[40%] object-cover hidden md:block"
      />
      <div className="flex flex-col">
        <h1>Payment Detail</h1>
        <form className="flex flex-col gap-2">
          <div className="relative w-[18rem]">
            <input
              type="text"
              name="cardHolderName"
              id="cardHolderName"
              className="w-full bg-gray-100 rounded-lg h-[4rem] px-4 pt-2 text-base "
            />
            <span className="absolute left-4 top-2 z-10 text-xs text-gray-400">
              Cardholder name
            </span>
          </div>
          <div className="relative w-[18rem]">
            <input
              type="text"
              name="cardHolderName"
              id="cardHolderName"
              className="w-full bg-gray-100 rounded-lg h-[4rem] px-4 pt-2 text-base "
              placeholder="xxx-xxx-xxx-xxx"
            />
            <span className="absolute left-4 top-2 z-10 text-xs text-gray-400">
              <BsCreditCard2Back className="inline text-md mr-2" />
              Card number
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentDetail;
