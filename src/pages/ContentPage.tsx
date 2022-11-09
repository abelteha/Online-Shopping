import { useParams } from "react-router-dom";
import CategoryProducts from "../components/Header/CategoryProducts";
import SideBar from "../components/Header/SideBar";
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
