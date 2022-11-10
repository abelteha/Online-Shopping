import produce, { produceWithPatches } from "immer";
import { Fragment } from "react";
import CategoryCard from "../components/Cards/CategoryCard";
import { useGetAllCategoriesQuery } from "../redux/dummyJsonApi";

const HomePage = () => {
  const { data, error, isFetching } = useGetAllCategoriesQuery();

  if (isFetching) {
    return <p>fetching products...</p>;
  }
  if (error) {
    return <p>Something went wrong!, Try again.</p>;
  }
  return (
    <div className="flex justify-center animate-slideup">
      <div className="grid grid-cols sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 justify-center items-center my-10">
        {data!.map((cat) => (
          <CategoryCard key={cat} title={cat} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
