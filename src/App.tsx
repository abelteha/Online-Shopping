import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";

import CategoryProductsPage from "./pages/CategoryProductPage";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import SearchPage from "./pages/SearchPage";
const App = () => {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
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
