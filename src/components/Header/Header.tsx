import logo from "../../assets/abay.svg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

import React, { FC, FormEvent, useRef, useState } from "react";
import { Catagories } from "../../model/catagories";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetSearchedItemQuery } from "../../redux/dummyJsonApi";
import { useAppDispatch } from "../../model/hooks";
import { searchAction } from "../../redux/search-slice";

const Form: FC<{ value: string }> = ({ value }) => {
  const [searchText, setSearchText] = useState<string>("");
  const selectRef = useRef<HTMLSelectElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // localStorage.setItem("category", "all categories");

  const searchChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };
  // const dropDownHandler = (e: FormEvent<HTMLSelectElement>) => {
  //   localStorage.setItem("category", e.currentTarget.value);
  // };
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(searchAction.setSelectedCategory(selectedCategory));
    localStorage.setItem(
      "category",
      selectRef.current?.value ? selectRef.current.value : "all categories"
    );

    const category = localStorage.getItem("category");

    if (searchText.trim().length === 0 && category === "all categories") {
      navigate("/");
    } else if (
      searchText.trim().length === 0 &&
      category !== "all categories"
    ) {
      navigate(`/categories/${category}`);
    } else if (searchText.trim().length > 0 && category === "all categories") {
      localStorage.setItem("searchText", searchText);
      localStorage.setItem("searchAllCategories", "true");

      navigate(`/categories/${category}/search`);
    } else if (searchText.trim().length > 0 && category !== "all categories") {
      localStorage.setItem("searchText", searchText);
      localStorage.setItem("searchAllCategories", "false");

      navigate(`/categories/${category}/search`);
    }
    console.log(category);
  };
  return (
    <form
      onSubmit={submitHandler}
      className={`${value} w-full hidden md:block`}
    >
      <div className="flex border rounded-full">
        <select
          name="select"
          id="select"
          ref={selectRef}
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
          value={searchText!}
          onChange={searchChangeHandler}
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
