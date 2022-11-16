import { Fragment, useEffect, useRef, useState } from "react";
import Rating from "../components/UI/Rating";
import { Products } from "../types/types";
import { BsCartPlusFill } from "react-icons/bs";

import { ProductsAction } from "../redux/slices/products-slice";
import Galary from "../components/Product/Galary";
import Feedback from "../components/Product/Feedback";
import { useAppDispatch, useAppSelector } from "../model/hooks";

const ProductDetail = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const product: Products = JSON.parse(localStorage.getItem("SingleProduct")!);
  const activeImg: string = useAppSelector(
    (state) => state.productReducer.activeImg
  );
  const [index, setIndex] = useState<number>(product?.images.length - 1);

  useEffect(() => {
    dispatch(ProductsAction.setDefaultActiveImg());
  }, []);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = 0;
    }
  });

  const radioButtonCheckHandler = (img: string, i: number) => {
    dispatch(ProductsAction.setActiveImg(img));
    setIndex(i);
    console.log(product.images[i]);
  };
  const addToCartHandler = () => {};
  return (
    <Fragment>
      <div
        ref={divRef}
        className="flex  flex-col justify-center py-16 md:flex-row md:justify-between gap-10  animate-slideup  bg-gray-50  "
      >
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
              onClick={addToCartHandler}
            >
              Add To Cart <BsCartPlusFill className="inline ml-1" />
            </button>
          </div>
        </div>
      </div>
      <Galary />
      <Feedback />
    </Fragment>
  );
};

export default ProductDetail;
