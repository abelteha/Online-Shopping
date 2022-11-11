import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { categoryProductsAction } from "../redux/category-products";

const ProductDetail = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const product = useSelector(
    (state: any) => state.categoryReducer.SingleProduct
  );
  console.log(product);

  useEffect(() => {
    dispatch(categoryProductsAction.getSingleProduct(param.product));
  }, []);

  return (
    <div className="flex justify-center">
      <div>
        <img src={""} alt="" />
      </div>
    </div>
  );
};

export default ProductDetail;
