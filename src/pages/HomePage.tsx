import produce, { produceWithPatches } from "immer";
import { Fragment, useEffect } from "react";
import CategoryCard from "../components/Cards/CategoryCard";
import Error from "../components/UI/Error";
import Loader from "../components/UI/Loader";
import { useAppDispatch } from "../model/hooks";
import { useGetAllCategoriesQuery } from "../redux/api/dummyJsonApi";
import { setSuccessFullTransaction } from "../redux/slices/user-slice";

const HomePage = () => {
  const { data, error, isFetching } = useGetAllCategoriesQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSuccessFullTransaction(false));
  }, []);

  if (isFetching) {
    return <Loader clasName="md:w-full" />;
  }
  if (error) {
    return <Error clasName="md:w-full" />;
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
