import produce, { produceWithPatches } from "immer";
import { Fragment } from "react";
import CategoryCard from "../components/Cards/CategoryCard";
import Error from "../components/UI/Error";
import Loader from "../components/UI/Loader";
import { useGetAllCategoriesQuery } from "../redux/dummyJsonApi";

const HomePage = () => {
  const { data, error, isFetching } = useGetAllCategoriesQuery();

  if (isFetching) {
    return <Loader width={100} />;
  }
  if (error) {
    return <Error width={100} />;
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
