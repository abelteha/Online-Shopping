import { Fragment, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../model/hooks";
import { useGetSearchedItemQuery } from "../redux/dummyJsonApi";
import ProductCard from "../components/Cards/ProductCard";
import SideBar from "../components/SideBar";
import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";
import { searchAction } from "../redux/search-slice";
import { iteratorSymbol } from "immer/dist/internal";

const SearchProducts = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const search = useAppSelector((state) => state.searchReducer);
  const dispatch = useAppDispatch();
  // const [data]

  const { data, isFetching, error } = useGetSearchedItemQuery(
    search.searchText
  );
  const filteredProducts = search.searchResult
    ? search.searchResult.filter(
        (item) => item.category === search.selectedCategory
      )
    : [];

  if (error) {
    return <Error width={78} />;
  } else if (isFetching) {
    return <Loader clasName="xl:w-[78%] lg:w-[70%]  w-full" />;
  } else {
    dispatch(searchAction.searchResults(data?.products!));
  }
  return (
    <div className="flex">
      <SideBar />
      <div
        // ref={divRef}
        className="flex-1 flex sm:block justify-center overflow-scroll h-[] "
      >
        {(search.searchAllCategories === true
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
          />
        ))}
      </div>
    </div>
  );
};

export default SearchProducts;
