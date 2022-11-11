import { FC } from "react";
import { useGetCategoryProductsQuery } from "../../redux/dummyJsonApi";
import { Link } from "react-router-dom";

const CategoryCard: FC<{ title: string }> = ({ title }) => {
  const { data, error, isFetching } = useGetCategoryProductsQuery(title);

  if (isFetching) {
    return <p></p>;
  }

  return (
    <Link to={`/categories/${title}`} className="group">
      <div className="w-[330px] h-[330px] bg-gray-100 rounded-xl p-4 flex flex-col justify-between group-hover:bg-[#ffe3d1]">
        <h1 className="font-bold capitalize text-xl group-hover:text-[#a75b29]">
          {title}
        </h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {data?.products.slice(0, 4).map((product) => (
            <img
              src={product.thumbnail}
              alt="img1"
              key={product.id}
              className="w-[130px] h-[100px] object-cover"
            />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
