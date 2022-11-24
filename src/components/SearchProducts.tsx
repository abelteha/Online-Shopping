import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../model/hooks";
import { useGetSearchedItemQuery } from "../redux/api/dummyJsonApi";
import ProductCard from "../components/Cards/ProductCard";

import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";
import { searchAction } from "../redux/slices/search-slice";

import { useSearchParams } from "react-router-dom";
import { ProductsAction } from "../redux/slices/products-slice";

const SearchProducts = () => {
  const search = useAppSelector((state) => state.searchReducer);

  const searchText = localStorage.getItem("searchText");
  const isAllCategories = localStorage.getItem("searchAllCategories");
  const category = localStorage.getItem("category");
  const dispatch = useAppDispatch();
  const divRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  // const [data]

  const { data, isFetching, error } = useGetSearchedItemQuery(
    searchParams.get("q")!
  );
  const filteredProducts = search.searchResult
    ? search.searchResult.filter((item) => item.category === category)
    : [];

  useEffect(() => {
    setSearchParams({ q: searchText! });
  }, [search.searchResult]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = 0;
    }
  });

  if (error) {
    return <Error />;
  } else if (isFetching) {
    return <Loader clasName="md:w-[calc(100vw-300px)]" />;
  } else {
    dispatch(searchAction.searchResults(data?.products!));
    dispatch(ProductsAction.setNewCategoryProducts(data?.products!));
  }
  return (
    <div
      ref={divRef}
      className="flex-1 flex  sm:block justify-center overflow-scroll "
    >
      <ul>
        {(isAllCategories === "true"
          ? search.searchResult
          : filteredProducts
        ).map((item) => (
          <ProductCard
            id={item.id}
            key={item.id}
            img={item.thumbnail}
            title={item.title}
            rating={item.rating}
            price={item.price}
            discount={item.discountPercentage}
            category={item.category}
          />
        ))}
      </ul>
      {(
        isAllCategories === "true"
          ? search.searchResult.length === 0
          : filteredProducts.length === 0
      ) ? (
        <div className=" h-[100vh] bg-gray-100 pt-10 px-5">
          <p className="text-xl font-bold capitalize text-center pt-10 md:text-2xl ">
            no product found with the name "{searchText}" in {category}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchProducts;
