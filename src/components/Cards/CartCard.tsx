import { update, ref as reff, onValue, remove } from "firebase/database";
import React, { FC } from "react";
import testImg from "../../assets/FB.jpg";
import { db } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { setCart } from "../../redux/slices/user-slice";
import { cart } from "../../types/types";

const CartCard: FC<{ item: cart }> = ({ item }) => {
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const userid = localStorage.getItem("uid");
  const addClickHandler = (name: string) => {
    for (let key in user.cart[0]) {
      if (user.cart[0][key].itemName === name) {
        update(reff(db, `users/${userid}/`), {
          totalNumberOfItem: user.totalCartItems + 1,
        });
        update(reff(db, `users/${userid}/cart/${key}`), {
          itemAmount: user.cart[0][key].itemAmount + 1,
        });
        onValue(reff(db, `users/${userid}`), (snapshot) => {
          const data = snapshot.val();
          dispatch(setCart(data));
        });
      }
    }
  };
  const subClickHandler = (name: string) => {
    for (let key in user.cart[0]) {
      if (
        user.cart[0][key].itemName === name &&
        user.cart[0][key].itemAmount > 1
      ) {
        update(reff(db, `users/${userid}/cart/${key}`), {
          itemAmount: user.cart[0][key].itemAmount - 1,
        });
      } else if (
        user.cart[0][key].itemName === name &&
        user.cart[0][key].itemAmount === 1
      ) {
        remove(reff(db, `users/${userid}/cart/${key}`));
      }
      onValue(reff(db, `users/${userid}`), (snapshot) => {
        const data = snapshot.val();
        dispatch(setCart(data));
      });
      update(reff(db, `users/${userid}/`), {
        totalNumberOfItem: user.totalCartItems - 1,
      });
    }
  };
  return (
    <div className="flex justify-between w-[95%]  sm:w-[98%] min-h-[8rem] py-4 px-4 bg-white shadow-lg rounded-lg">
      <div className="flex gap-4 items-center">
        <img
          src={item.itemImage}
          alt=""
          className="w-[5rem] h-[5rem] md:w-[7rem] md:h-[7rem] hidden sm:block object-contain"
        />
        <div className="flex flex-col sm:max-w-[10rem] max-w-[5rem]  ">
          <h2 className="text-lg sm:text-xl font-bold my-2">{item.itemName}</h2>
          <p>${item.itemPrice}</p>
        </div>
        <div className=" flex justify-center items-center border border-[#ccc] sm:h-10 sm:w-10 sm:text-base h-8 w-8 text-sm rounded-lg ">
          x{item.itemAmount}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex gap-1">
          <button
            className="  h-8 w-10 border border-[#a75b29] hover:border-transparent hover:bg-[#a75b29] hover:text-white rounded-md"
            onClick={() => subClickHandler(item.itemName)}
          >
            -
          </button>
          <button
            className="h-8 w-10 border border-[#a75b29] hover:border-transparent hover:bg-[#a75b29] hover:text-white rounded-md"
            onClick={() => addClickHandler(item.itemName)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
