import React, { Fragment } from "react";
import Signin from "../components/Auth/Signin";
import Signup from "../components/Auth/Signup";

const AuthPage = () => {
  return (
    <Fragment>
      {/* <Signin /> */}
      <Signup />
    </Fragment>
  );
};

export default AuthPage;
