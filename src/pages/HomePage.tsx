import produce, { produceWithPatches } from "immer";
import { Fragment } from "react";
import { useGetAllProductsQuery } from "../redux/dummyJsonApi";

const HomePage = () => {
  const { data, error, isFetching } = useGetAllProductsQuery();

  if (isFetching) {
    return <p>fetching products...</p>;
  }
  if (error) {
    return <p>Something went wrong!, Try again.</p>;
  }
  return (
    <Fragment>
      <h1>Products</h1>
      <ul>
        {data!.products.map((product) => (
          <li>{product.title}</li>
        ))}
      </ul>
    </Fragment>
  );
};

export default HomePage;
