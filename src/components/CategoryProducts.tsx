import { useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useGetCategoryProductsQuery } from "../redux/dummyJsonApi";
import ProductCard from "./Cards/ProductCard";
import Loader from "./UI/Loader";
import Error from "./UI/Error";

const CategoryProducts = () => {
  const param = useParams();
  const { data, error, isFetching } = useGetCategoryProductsQuery(
    param.categoryID
  );
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = 0;
    }
  });
  if (isFetching) {
    return <Loader width={78} />;
  }
  if (error) {
    return <Error width={78} />;
  }

  return (
    <div ref={divRef} className="flex-1 overflow-scroll ">
      <ul>
        {data?.products.map((item) => (
          <ProductCard
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
