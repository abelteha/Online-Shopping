import logo from "../../assets/abay.svg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

import { FC } from "react";
import { Catagories } from "../../model/catagories";
import { useNavigate } from "react-router-dom";

const Form: FC<{ value: string }> = ({ value }) => {
  return (
    <form className={`${value} w-full hidden md:block`}>
      <div className="flex border rounded-full">
        <select
          name=""
          id=""
          className=" h-12 w-auto text-center text-sm outline-none  bg-gray-100 rounded-l-full border-r"
        >
          <option value="all categories">All Categories</option>
          {Catagories.map((cat) => (
            <option value={`${cat.title}`}>{cat.title}</option>
          ))}
        </select>
        <input
          type="text"
          className="  border-[#fdb788] w-full h-12  pl-4 focus:border-t-2 focus:border-b-2 focus:border-[#fdb788] outline-none "
          placeholder="search"
        />
        <button
          type="submit"
          className="px-4 text-white tr right-1 bg-[#C56E33] hover:bg-[#a75b29] h-12 rounded-r-full"
        >
          <AiOutlineSearch className=" w-6 h-6 text-white" />
        </button>
      </div>
    </form>
  );
};

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
