/** @format */

import React, { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { PageUrl } from "../configuration/enum";
import useGetJWT from "../utils/hooks/useGetJWT";

interface Props {
  children: ReactElement;
}

const PrivateRoute: FC<Props> = (props: Props) => {
  const { children } = props;
  const isAuthenticated = useGetJWT() ? true : false;

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={`${PageUrl.AUTH}/${PageUrl.LOGIN}`} />
  );
};

export default PrivateRoute;
