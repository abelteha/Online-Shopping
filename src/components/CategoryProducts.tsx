import { useParams } from "react-router-dom";
import { useGetCategoryProductsQuery } from "../redux/dummyJsonApi";

const CategoryProducts = () => {
  const param = useParams();
  const { data, error, isFetching } = useGetCategoryProductsQuery(
    param.categoryID
  );
  if (isFetching) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>Something is wrong!, Try Again!</div>;
  }

  return (
    <div className="flex-1 bg-red-200 animate-slideup">
      <ul>
        {data?.products.map((item) => (
          <li>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryProducts;
