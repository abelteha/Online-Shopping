import logo from "../../assets/abay.svg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import Form from "./SearchForm";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex justify-between p-4 sticky top-0  bg-white backdrop:blur-lg items-center lg:px-[6rem] animate-slidedown py-7 border-b-2">
      <img
        src={logo}
        alt=""
        className="w-24 hover:cursor-pointer md:w-32"
        onClick={() => navigate("/")}
      />
      <Form value="mx-[3rem]" />
      <div className="flex items-center">
        <AiOutlineSearch className="md:w-10 md:h-10 w-8 h-8 text-[#a75b29] mr-4 md:hidden" />
        <AiOutlineShoppingCart className="md:w-10 md:h-10 w-8 h-8 text-[#a75b29]" />
      </div>
    </div>
  );
};

export default Header;
