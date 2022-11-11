import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import CategoryProduct from "./pages/CategoryProduct";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
const App = () => {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="categories/:categoryID">
          <Route index={true} element={<CategoryProduct />} />
          <Route index={false} path=":product" element={<ProductDetail />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Fragment>
  );
};

export default App;
