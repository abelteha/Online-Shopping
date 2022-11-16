import { BsFillCartCheckFill } from "react-icons/bs";
import cartImg from "../assets/cart.png";
const Cart = () => {
  return (
    <div className="flex justify-between gap-10  mx-5 lg:mx-10 animate-slideup">
      <img
        src={cartImg}
        alt=""
        className="w-[40%] object-cover hidden md:block"
      />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-[#a75b29] my-10">Your Cart</h1>
        <div
          className=" max-h-[calc(100vh-20rem)] min-h-[20rem] bg-gray-50
         w-full border"
        ></div>
        <button
          className="border-none px-5 py-2 hover:bg-[#a75b29] bg-[#C56E33] text-white rounded-lg w-[10rem] mt-6"
          onClick={() => {}}
          disabled={true}
        >
          Check Out <BsFillCartCheckFill className="inline ml-1 text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Cart;
