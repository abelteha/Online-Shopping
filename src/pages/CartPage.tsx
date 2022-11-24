import { useEffect } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import cartImg from "../assets/cart.jpg";
import CartCard from "../components/Cards/CartCard";
import { useAppDispatch, useAppSelector } from "../model/hooks";
import { setTotalPrice } from "../redux/slices/user-slice";
const Cart = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  let cartArray = [];
  let totalPrice = 0;
  for (let key in user.cart[0]) {
    cartArray.push(user.cart[0][key]);
  }
  for (let i = 0; i < cartArray.length; i++) {
    totalPrice += cartArray[i].itemPrice * cartArray[i].itemAmount;
  }
  useEffect(() => {
    dispatch(setTotalPrice(totalPrice));
  });
  const checkOutHandler = () => {
    navigate("payment detail");
  };
  return (
    <div className="flex justify-between items-center gap-10  mx-5 lg:mx-10 animate-slideup sm:h-[calc(100vh-15rem)] mt-[2rem]">
      <img
        src={cartImg}
        alt=""
        className="object-cover hidden lg:block h-[90%]"
      />
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-[#a75b29] my-5">Your Cart</h1>
        <div
          className=" max-h-[calc(100vh-25rem)] min-h-[20rem] bg-gray-50
         w-full xl:w-[80%] border overflow-scroll"
        >
          {user.totalCartItems === 0 ? (
            <p className="text-center text-lg px-10 mt-[7rem]">
              No item in the cart!, May be add one?
            </p>
          ) : (
            <div className="flex flex-col gap-2 justify-center py-2 items-center">
              {/* <ul>

              </ul> */}
              {cartArray.map((item) => (
                <CartCard item={item} />
              ))}
            </div>
          )}
        </div>
        {user.totalCartItems > 0 && (
          <>
            <h1 className="text-xl font-bold mt-4">
              Total Price: ${user.totalPrice}
            </h1>
            <button
              className="border-none px-5 py-2 hover:bg-[#a75b29] bg-[#C56E33] text-white rounded-lg w-[10rem] mt-6"
              onClick={checkOutHandler}
            >
              Check Out <BsFillCartCheckFill className="inline ml-1 text-lg" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
