import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Products } from "../model/Product";

import { categoryProductsAction } from "../redux/category-products";

const ProductDetail = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const product: Products = useSelector(
    (state: any) => state.categoryReducer.SingleProduct
  );
  const activeImg: string = useSelector(
    (state: any) => state.categoryReducer.activeImg
  );

  useEffect(() => {
    dispatch(categoryProductsAction.getSingleProduct(param.product));
    dispatch(categoryProductsAction.setDefaultActiveImg());
  }, []);

  if (product.images === undefined) {
    return <p></p>;
  }
  return (
    <div className="flex flex-col sm:mt-2 ">
      <div className="flex justify-center sm:bg-transparent  bg-gray-50">
        <div className="flex flex-col justify-center items-center">
          <img
            src={activeImg}
            alt=""
            className="w-[90%] h-[250px] sm:w-1/2 sm:h-1/2 object-cover"
          />
          <div className="flex flex-wrap justify-around mt-2 gap-4">
            {product?.images.map((img, i) => (
              <label>
                <input
                  type="radio"
                  name="radio"
                  value={i}
                  onChange={() =>
                    dispatch(categoryProductsAction.setActiveImg(img))
                  }
                  className="radioInput absolute opacity-0 w-0 h-0 cursor-pointer"
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
      </div>
    </div>
  );
};

export default ProductDetail;
