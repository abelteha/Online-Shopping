import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import ContentPage from "./pages/ContentPage";
import HomePage from "./pages/HomePage";
const App = () => {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="categories/:categoryID" element={<ContentPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Fragment>
  );
};

export default App;
