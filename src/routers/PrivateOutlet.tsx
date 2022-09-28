/** @format */

import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { PageUrl } from "../configuration/enum";
import useGetJWT from "../utils/hooks/useGetJWT";

const PrivateOutlet = () => {
  const isAuthenticated = useGetJWT() ? true : false;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`${PageUrl.AUTH}/${PageUrl.LOGIN}`} />
  );
};

export default PrivateOutlet;
