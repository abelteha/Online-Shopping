import { useParams } from "react-router-dom";
import CategoryProducts from "../components/CategoryProducts";
import SideBar from "../components/SideBar";
import { useGetCategoryProductsQuery } from "../redux/dummyJsonApi";

const ContentPage = () => {
  return (
    <div className="flex h-[calc(100vh-110px)] ">
      <SideBar />
      <CategoryProducts />
    </div>
  );
};

export default ContentPage;
