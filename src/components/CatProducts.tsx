import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useGetCategoryProductsQuery } from "../redux/dummyJsonApi";
import ProductCard from "./Cards/ProductCard";
import Loader from "./UI/Loader";
import Error from "./UI/Error";
import { categoryProductsAction } from "../redux/category-products";
import { useAppDispatch } from "../model/hooks";

const CategoryProducts = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const { data, error, isFetching } = useGetCategoryProductsQuery(
    param.categoryID
  );
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = 0;
    }
  });
  if (error) {
    return <Error width={78} />;
  } else if (isFetching) {
    return <Loader clasName="xl:w-[78%] lg:w-[70%]  w-full" />;
  } else {
    dispatch(categoryProductsAction.setNewCategoryProducts(data?.products));
  }

  return (
    <div
      ref={divRef}
      className="flex-1 flex sm:block justify-center overflow-scroll "
    >
      <ul>
        {data?.products.map((item) => (
          <ProductCard
            id={item.id}
            key={item.id}
            img={item.thumbnail}
            title={item.title}
            rating={item.rating}
            price={item.price}
            discount={item.discountPercentage}
          />
        ))}
      </ul>
    </div>
  );
};

export default CategoryProducts;
