import { Reducer, ReducerState } from "react";
import { useSelector } from "react-redux";
import { Products } from "../model/Product";
import { RootState } from "../redux/store";

const Galary = () => {
  const product = useSelector(
    (state: RootState) => state.categoryReducer.SingleProduct
  );

  return (
    <div className=" bg-[#ffa37bd9] py-[2rem] flex flex-col items-center">
      <h1 className="text-center text-white text-[3rem] font-bold mb-10">
        Galary
      </h1>
      <div className="grid  grid-cols-1 sm:grid-cols-2 align-center  gap-x-10 gap-y-10   px-5 sm:px-10 lg:grid-cols-3 xl:gap-x-20  xl:px-20 ">
        {product.images.map((img) => (
          <img
            src={img}
            className="w-[380px] h-[250px] rounded-xl object-cover"
          />
        ))}
      </div>{" "}
    </div>
  );
};

export default Galary;
