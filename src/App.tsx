import { getDownloadURL, list, listAll, ref } from "firebase/storage";
import { Fragment, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import { storage } from "./firebase";

import { useAppDispatch, useAppSelector } from "./model/hooks";

import CartPage from "./pages/CartPage";

import CategoryProductsPage from "./pages/CategoryProductPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import SearchPage from "./pages/SearchPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { logOut } from "./redux/slices/auth/auth-slice";
import { setUserImage } from "./redux/slices/user-slice";
const App = () => {
  const dispatch = useAppDispatch();
  const imageListRef = ref(storage, "images/");

  useEffect(() => {
    const time = localStorage.getItem("expireOn")!;
    const currentTime = new Date().getTime();

    if (time) {
      const toMiliseconds = new Date(time).getTime();
      const timeLeft = toMiliseconds - currentTime;
      setTimeout(() => {
        dispatch(logOut());
      }, timeLeft);
      console.log(timeLeft);
    }
  });

  useEffect(() => {
    // dispatch(resetImages());
    // listAll(imageListRef).then((res) => {
    //   res.items.forEach((item) => {
    //     getDownloadURL(item).then((url) => {
    //       dispatch(setImageList({ name: item.fullPath.slice(7), url: url }));
    //     });
    //   });
    // });
    const imageRef = ref(
      storage,
      `images/${localStorage.getItem("userEmail")}`
    );
    list(imageRef).then((res) =>
      getDownloadURL(imageRef).then((res) => dispatch(setUserImage(res)))
    );
  }, []);

  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin">
          <Route index={true} element={<SigninPage />} />
          <Route
            index={false}
            path="forgotPassword"
            element={<ForgotPasswordPage />}
          />
        </Route>

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="categories/:categoryID">
          <Route index={true} element={<CategoryProductsPage />} />
          <Route index={false} path=":product" element={<ProductDetail />} />
          <Route path="search" element={<SearchPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Fragment>
  );
};

export default App;
