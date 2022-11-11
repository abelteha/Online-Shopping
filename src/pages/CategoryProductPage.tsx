import { useParams } from "react-router-dom";
import CatProducts from "../components/CatProducts";
import SideBar from "../components/SideBar";

const CategoryProductsPage = () => {
  return (
    <div className="flex sm:h-[calc(100vh-110px)] h-[calc(100vh-90px)] ">
      <SideBar />
      <CatProducts />
    </div>
  );
};

export default CategoryProductsPage;
