import logo from "../../assets/abay.svg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { TbZoomCancel } from "react-icons/tb";

import { Link, useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";
import { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { searchAction } from "../../redux/slices/search-slice";

import CollabsibleMenu from "./CollabsibleMenu";
import { logOut } from "../../redux/slices/auth/auth-slice";

const Header = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const [toggleOpen, setToggleOpen] = useState(false);
  const searchPressed = useAppSelector(
    (state) => state.searchReducer.searchButtonPressed
  );

  const searchIconClickHandler = () => {
    dispatch(searchAction.toggleSearchBar(!searchPressed));
  };

  const hamburgerMenuHandler = () => {
    setToggleOpen((prev) => !prev);
  };

  return (
    <Fragment>
      <div className="sticky top-0 animate-slidedown backdrop-blur-xl z-20">
        <div className=" flex justify-between p-4  bg-white/70  items-center lg:px-[6rem]  py-5 border-b-2 ">
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
            <AiOutlineShoppingCart
              className="md:w-10 md:h-10 w-8 h-8 text-[#a75b29]"
              onClick={() => navigate("/cart")}
            />
            <div className="w-7 h-7 bg-[#ffad76] rounded-full">
              <p className="text-center mt-[2px]">0</p>
            </div>
          </div>
        </div>
        <div className="flex border-b-2 py-1 px-5 bg-gray-300/50 justify-between md:justify-end ">
          <button
            id="menu-btn"
            className={`block ${
              toggleOpen ? "open" : ""
            } hamburger md:hidden focus:outline-none`}
            onClick={hamburgerMenuHandler}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
          <div className="flex gap-5">
            <Link to={"/"} className="text-sm hover:text-[#a75b29] ">
              All Categories
            </Link>

            {auth.isAuthenticated ? (
              <Link
                to={"/"}
                className="text-sm hover:text-[#a75b29]"
                onClick={() => dispatch(logOut())}
              >
                Logout
              </Link>
            ) : (
              <Link to={"/signin"} className="text-sm hover:text-[#a75b29]">
                SignIn
              </Link>
            )}
          </div>
        </div>
      </div>
      {searchPressed && (
        <div className="sticky z-10 bg-black/50 backdrop-blur-xl bg-opacity-60 top-[6.9rem] ">
          <SearchForm value="pt-2" />
          <div
            className="absolute bg-black bg-opacity-60 w-full h-[calc(100vh-8.5rem)]"
            onClick={() =>
              dispatch(searchAction.toggleSearchBar(!searchPressed))
            }
          ></div>
        </div>
      )}
      <CollabsibleMenu
        toggleOpen={toggleOpen}
        hamburgerMenuHandler={hamburgerMenuHandler}
      />
    </Fragment>
  );
};

export default Header;
