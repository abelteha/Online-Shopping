import { onValue, ref as reff } from "firebase/database";
import { getDownloadURL, list, ref } from "firebase/storage";
import { Fragment, lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Loader from "./components/UI/Loader";
// import SuccessTransaction from "./components/SuccessTransaction";
import { db, storage } from "./firebase";

import { useAppDispatch, useAppSelector } from "./model/hooks";

// import CartPage from "./pages/CartPage";

// import CategoryProductsPage from "./pages/CategoryProductPage";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import HomePage from "./pages/HomePage";
// import PaymentDetail from "./pages/PaymentDetail";
// import ProductDetail from "./pages/ProductDetail";
// import SearchPage from "./pages/SearchPage";
// import SigninPage from "./pages/SigninPage";
// import SignupPage from "./pages/SignupPage";

import {
  logOut,
  resetError,
  resetSuccess,
} from "./redux/slices/auth/auth-slice";
import { ProductsAction } from "./redux/slices/products-slice";
import {
  setDefaultAmount,
  setUserCart,
  setUserImage,
} from "./redux/slices/user-slice";

const HomePage = lazy(() => import("./pages/HomePage"));
const PaymentDetail = lazy(() => import("./pages/PaymentDetail"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const SigninPage = lazy(() => import("./pages/SigninPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const SuccessTransaction = lazy(
  () => import("./components/SuccessTransaction")
);
const CategoryProductsPage = lazy(() => import("./pages/CategoryProductPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));

const App = () => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.authReducer);
  const user = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    const time = localStorage.getItem("expireOn")!;
    const currentTime = new Date().getTime();

    if (time) {
      const toMiliseconds = new Date(time).getTime();
      const timeLeft = toMiliseconds - currentTime;
      setTimeout(() => {
        dispatch(logOut());
      }, timeLeft);
      console.log(timeLeft / 1000);
    }
  });
  useEffect(() => {
    if (auth.success === true && auth.isAuthenticated) {
      // dispatch(fetchUser());
      // // navigate("/");
      onValue(reff(db, "users"), (snapshot) => {
        const data = snapshot.val();
        dispatch(setUserCart(data));
      });

      setTimeout(() => {
        dispatch(resetSuccess());
      }, 1500);
    }
    if (auth.error != null) {
      setTimeout(() => {
        dispatch(resetError());
      }, 1500);
    }
  }, [auth.success, auth.error]);

  useEffect(() => {
    if (localStorage.getItem("userEmail")) {
      const imageRef = ref(
        storage,
        `images/${localStorage.getItem("userEmail")}`
      );
      list(imageRef).then((res) =>
        getDownloadURL(imageRef).then((res) => dispatch(setUserImage(res)))
      );
      onValue(reff(db, "users"), (snapshot) => {
        const data = snapshot.val();
        dispatch(setUserCart(data));
      });
    }
    if (localStorage.getItem("totalAmt")) {
      dispatch(setDefaultAmount(+localStorage.getItem("totalAmt")!));
    }
    if (localStorage.getItem("productId")) {
      dispatch(ProductsAction.setDefaultId());
    }
  }, []);
  useEffect(() => {
    onValue(reff(db, `feedbacks/`), (snapshot) => {
      const data = snapshot.val();
      dispatch(ProductsAction.setProductsFeedback(data));
    });
  }, []);

  return (
    <Fragment>
      <Header />
      <Suspense fallback={<Loader clasName="md:w-full" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!auth.isAuthenticated && (
            <Route path="/signin">
              <Route index={true} element={<SigninPage />} />
              <Route
                index={false}
                path="forgotPassword"
                element={<ForgotPasswordPage />}
              />
            </Route>
          )}

          {!auth.isAuthenticated && (
            <Route path="/signup" element={<SignupPage />} />
          )}

          <Route path="/cart">
            <Route index={true} element={<CartPage />} />
            <Route index={false} path="payment detail">
              {!user.successfullTransaction && user.totalCartItems > 0 && (
                <Route index={true} element={<PaymentDetail />} />
              )}
              {user.successfullTransaction && (
                <Route index={false} path="" element={<SuccessTransaction />} />
              )}
              <Route path="" element={<Navigate to="/cart" />}></Route>
            </Route>
          </Route>

          <Route path="categories/:categoryID">
            <Route index={true} element={<CategoryProductsPage />} />
            <Route index={false} path=":product" element={<ProductDetail />} />
            <Route index={false} path="search" element={<SearchPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
};

export default App;
