/** @format */

import React, { FC, ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { authSelector } from "../app/selector";
import { PageUrl } from "../configuration/enum";
import { getUserRole } from "../pages/Profile/userSlice";
import useGetJWT from "../utils/hooks/useGetJWT";

interface Props {
  children: ReactElement;
}

const AdminRoute: FC<Props> = (props: Props) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const isAuthenticated = useGetJWT() ? true : false;
  const userId = useSelector(authSelector).auth.id;

  useEffect(() => {
    const getRoleHandle = async () => {
      const result: any = await dispatch(getUserRole(userId)).unwrap();
      setIsAdmin(result.data === "auth.roles.officer");
    };

    getRoleHandle();
  }, []);

  return true ? (
    <>{children}</>
  ) : (
    <Navigate to={`/${PageUrl.AUTH}/${PageUrl.LOGIN}`} />
  );
};

export default AdminRoute;
