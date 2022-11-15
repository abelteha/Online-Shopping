import SearchProducts from "../components/SearchProducts";
import SideBar from "../components/SideBar";

const SearchPage = () => {
  return (
    <div className="flex sm:h-[calc(100vh-110px)] h-[calc(100vh-90px)] ">
      <SideBar />
      <SearchProducts />
    </div>
  );
};

export default SearchPage;
