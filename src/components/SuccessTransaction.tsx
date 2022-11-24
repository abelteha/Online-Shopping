import React from "react";
import { useNavigate } from "react-router-dom";
import successImg from "../assets/checked.png";

const SuccessTransaction = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center mt-[5rem] gap-5 animate-slideup mx-4">
      <img src={successImg} alt="" className="w-[8rem] sm:w-[10rem]" />
      <h1 className="text-2xl md:text-6xl font-bold text-[#a75b29] text-center">
        Successfully Purchased!!!
      </h1>
      <p className="sm:text-xl text-lg italic text-gray-500 text-center">
        The order will be delivered to you with in 3 work days.
      </p>
      <button
        className="bg-[#C56E33] hover:bg-[#a75b29] text-white h-[3rem] rounded-md px-5"
        onClick={() => navigate("/")}
      >
        Go Back To Shopping
      </button>
    </div>
  );
};

export default SuccessTransaction;
