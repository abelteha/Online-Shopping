import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../UI/Rating";

const ProductCard: FC<{
  id: number;
  img: string;
  title: string;
  rating: number;
  price: number;
  discount: number;
}> = (props) => {
  const navigate = useNavigate();
  const originalPrice = (100 * +props.price) / (100 - +props.discount);
  return (
    <Link to={`${props.title}`} className="group">
      <div
        className="flex flex-col w-[300px] sm:w-[97%] sm:flex-row sm:justify-between justify-center items-center sm:items-start bg-white   m-5  gap-10 p-5 drop-shadow-2xl rounded-xl animate-slideup group-hover:bg-[#ffe3d1]"
        onClick={() => navigate("")}
      >
        <img
          src={props.img}
          alt=""
          loading="eager"
          className="sm:w-[200px] sm:h-[150px] w-[250px] h-[200px] object-cover"
        />
        <div className="flex flex-1 flex-col  ">
          <h1 className="font-bold text-2xl mb-2 group-hover:text-[#a75b29]">
            {props.title}
          </h1>
          <div className="flex items-center justify-start gap-4 mb-2 ">
            <Rating
              rating={props.rating}
              clasName="group-hover:text-gray-500"
            />
            <p className="text-md ">{props.rating} / 5</p>
          </div>
          <div className="flex items-end">
            <h2 className="text-2xl font-bold mr-2 group-hover:text-[#a75b29]">
              ${props.price}
            </h2>
            <p className="text-gray-600 text-sm pb-[2px]">
              <del>${Math.round(originalPrice)}</del>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
