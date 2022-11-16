import React, { Fragment } from "react";
import ForgotPassword from "../components/Auth/ForgotPassword";
import Signin from "../components/Auth/Signin";
import Signup from "../components/Auth/Signup";

const AuthPage = () => {
  return (
    <Fragment>
      {/* <Signin /> */}
      {/* <Signup /> */}
      <ForgotPassword />
    </Fragment>
  );
};

export default AuthPage;
