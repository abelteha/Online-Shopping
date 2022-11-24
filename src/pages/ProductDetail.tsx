import { Fragment, useEffect, useRef, useState } from "react";
import Rating from "../components/UI/Rating";
import { Products } from "../types/types";
import { BsCartPlusFill } from "react-icons/bs";

import { ProductsAction } from "../redux/slices/products-slice";
import Galary from "../components/Product/Galary";
import Feedback from "../components/Product/Feedback";
import { useAppDispatch, useAppSelector } from "../model/hooks";
import { update } from "firebase/database";
import { db } from "../firebase";
import { uid } from "uid";

import { onValue, ref as reff } from "firebase/database";
import { setCart, setSuccessFullTransaction } from "../redux/slices/user-slice";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const user = useAppSelector((state) => state.userReducer);
  const auth = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const product: Products = JSON.parse(localStorage.getItem("SingleProduct")!);
  const activeImg: string = useAppSelector(
    (state) => state.productReducer.activeImg
  );
  const [index, setIndex] = useState<number>(product?.images.length - 1);

  useEffect(() => {
    dispatch(ProductsAction.setDefaultActiveImg());
    dispatch(setSuccessFullTransaction(false));
  }, []);

  const radioButtonCheckHandler = (img: string, i: number) => {
    dispatch(ProductsAction.setActiveImg(img));
    setIndex(i);
    console.log(product.images[index]);
  };
  const addToCartHandler = (name: string, price: number) => {
    if (auth.isAuthenticated === true) {
      const uuid = uid();
      const userid = localStorage.getItem("uid");

      if (user.cart.length > 0) {
        const cart = user.cart;

        for (let key in cart[0]) {
          if (cart[0][key].itemName === name) {
            update(reff(db, `users/${userid}/`), {
              totalNumberOfItem: user.totalCartItems + 1,
            });
            update(reff(db, `users/${userid}/cart/${key}`), {
              itemAmount: cart[0][key].itemAmount + 1,
            });
            return onValue(reff(db, `users/${userid}`), (snapshot) => {
              const data = snapshot.val();
              dispatch(setCart(data));
            });
          }
        }

        update(reff(db, `users/${userid}/cart/${uuid}`), {
          uid: uuid,
          itemName: name,
          itemImage: product.images[index],
          itemAmount: 1,
          itemPrice: price,
        });
      } else {
        update(reff(db, `users/${userid}/cart/${uuid}`), {
          uid: uuid,
          itemName: name,
          itemImage: product.images[index],
          itemAmount: 1,
          itemPrice: price,
        });
      }
      onValue(reff(db, `users/${userid}`), (snapshot) => {
        const data = snapshot.val();
        dispatch(setCart(data));
      });
      update(reff(db, `users/${userid}/`), {
        totalNumberOfItem: user.totalCartItems + 1,
      });
    } else {
      navigate("/signin");
    }
  };
  useEffect(() => {
    divRef.current!.scrollTop = 0;
  });
  return (
    <div ref={divRef}>
      <div className="flex  flex-col justify-center py-16 md:flex-row md:justify-between gap-10  animate-slideup  bg-gray-50  ">
        <div className="flex  flex-1 flex-col justify-center items-center md:ml-4">
          <img
            src={activeImg}
            alt=""
            className="w-[90%] h-[250px] sm:w-[500px] sm:h-[400px] object-contain"
          />
          <div className="flex flex-wrap justify-around mt-2 gap-4 px-5">
            {product?.images.map((img, i) => (
              <label>
                <input
                  type="radio"
                  name="radio"
                  value={i}
                  onChange={() => radioButtonCheckHandler(img, i)!}
                  className="radioInput absolute opacity-0 w-0 h-0 cursor-pointer"
                  defaultChecked={true}
                  checked={i === index}
                />
                <img
                  src={img}
                  alt=""
                  key={i}
                  className="radioImg w-12 h-12 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>
        <div className="flex  flex-1 flex-col  items-center md:items-start mt-10  px-4">
          <h1 className="text-2xl capitalize font-bold text-center md:text-start">
            {product.title}
          </h1>
          <p className="italic text-gray-500 text-center md:text-start mx-4 mt-2">
            {product.description}
          </p>
          <div className="flex flex-col items-center  md:items-start ">
            <table className="table-fixed  mt-10 w-[70%] sm:pl-10 sm:w-[50%] md:w-[70%] md:pl-0 ">
              <tbody>
                <tr>
                  <td className="font-bold mr-10">Brand:</td>
                  <td>{product.brand}</td>
                </tr>
                <tr>
                  <td className="font-bold">Rating:</td>
                  <td>
                    <div className="flex justify-start items-center gap-2">
                      <Rating rating={product.rating} clasName="" />
                      {product.rating}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Stock:</td>
                  <td>{product.stock}</td>
                </tr>
                <tr>
                  <td className="font-bold">Price:</td>
                  <td className="font-bold">${product.price}</td>
                </tr>
                <tr>
                  <td className="font-bold">Discount:</td>
                  <td>{product.discountPercentage}%</td>
                </tr>
              </tbody>
            </table>
            <button
              className="border-none px-5 py-2 hover:bg-[#a75b29] bg-[#C56E33] text-white rounded-lg w-[10rem] mt-6"
              onClick={() => addToCartHandler(product.title, product.price)}
            >
              Add To Cart <BsCartPlusFill className="inline ml-1" />
            </button>
          </div>
        </div>
      </div>
      <Galary />
      <Feedback />
    </div>
  );
};

export default ProductDetail;
