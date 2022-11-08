/** @format */

import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authSelector } from "../app/selector";
import { PageUrl } from "../configuration/enum";
import { useGetRoleQuery } from "../pages/Profile/userApiSlice";
import useGetJWT from "../utils/hooks/useGetJWT";

interface Props {
  children: ReactElement;
}

const AdminRoute: FC<Props> = (props: Props) => {
  const { children } = props;
  const userId = useSelector(authSelector).auth.id;
  const { data } = useGetRoleQuery(userId);
  const isAuthenticated = useGetJWT() ? true : false;
  const isAdmin = data === "auth.roles.officer";

  return isAdmin && isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={`/${PageUrl.AUTH}/${PageUrl.LOGIN}`} />
  );
};

export default AdminRoute;
