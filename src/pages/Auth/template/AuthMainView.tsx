import React from "react";
import { Outlet } from "react-router-dom";
import { LogoBK } from "../../../assets";
import AuthScreenRight from "./AuthScreenRight";

const AuthMainView = () => {
  return (
    <div className="authpage">
      <div className="container-fluid p-0 h-100">
        <div className="row m-0 p-0 h-100">
          <div className="col-md-6 h-100 authpage-left">
            <img
              src={LogoBK}
              alt=""
              className="img-fluid authpage-left__img mb-4"
              width={80}
            />
            <Outlet />
          </div>
          <div className="col-md-6 p-2 authpage-right">
            <AuthScreenRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthMainView;
