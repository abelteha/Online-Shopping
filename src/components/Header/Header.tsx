import logo from "../../assets/abay.svg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { TbZoomCancel } from "react-icons/tb";

import { useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";
import { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { searchAction } from "../../redux/search-slice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchPressed = useAppSelector(
    (state) => state.searchReducer.searchButtonPressed
  );

  const searchIconClickHandler = () => {
    dispatch(searchAction.toggleSearchBar(!searchPressed));
  };

  return (
    <Fragment>
      <div className=" flex justify-between p-4 sticky top-0  bg-white backdrop:blur-lg items-center lg:px-[6rem] animate-slidedown py-7 border-b-2">
        <img
          src={logo}
          alt=""
          className="w-24 hover:cursor-pointer md:w-32"
          onClick={() => navigate("/")}
        />
        <SearchForm value="mx-[3rem] hidden md:block" />
        <div className="flex items-center">
          {!searchPressed ? (
            <AiOutlineSearch
              className="md:w-10 md:h-10 w-8 h-8 text-[#a75b29] mr-4 md:hidden"
              onClick={searchIconClickHandler}
            />
          ) : (
            <TbZoomCancel
              className="md:w-10 md:h-10 w-8 h-8 text-[#a75b29] mr-4 md:hidden"
              onClick={searchIconClickHandler}
            />
          )}
          <AiOutlineShoppingCart className="md:w-10 md:h-10 w-8 h-8 text-[#a75b29]" />
        </div>
      </div>
      {searchPressed && (
        <div className="sticky z-10 bg-black bg-opacity-60 top-[5.5rem] ">
          <SearchForm value="pt-2" />
          <div
            className="absolute bg-black bg-opacity-60 w-full h-[calc(100vh-8.5rem)]"
            onClick={() =>
              dispatch(searchAction.toggleSearchBar(!searchPressed))
            }
          ></div>
        </div>
      )}
      {}
    </Fragment>
  );
};

export default Header;
