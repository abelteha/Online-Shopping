import { AiOutlineSearch } from "react-icons/ai";

import React, { FC, useRef, useState } from "react";
import { Catagories } from "../../model/catagories";
import { useNavigate } from "react-router-dom";

const Form: FC<{ value: string }> = ({ value }) => {
  const [searchText, setSearchText] = useState<string>("");
  const selectRef = useRef<HTMLSelectElement>(null);

  const navigate = useNavigate();

  const searchChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

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
export default Form;
