import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { handleLoading } from "../../app/globalSlice";
import { useAppDispatch } from "../../app/hooks";
import { authSelector } from "../../app/selector";
import { useGetMyInfoQuery } from "../../pages/Auth/authApiSlice";
import {
  useGetAvatarQuery,
  useGetRoleQuery,
} from "../../pages/Profile/userApiSlice";
import Footer from "../Footer";
import Header from "../Header";

type Props = {
  children: React.ReactElement;
};

const MainLayout = (props: Props) => {
  const dispatch = useAppDispatch();
  const userId = useSelector(authSelector).auth.id;
  const { isLoading: isLoadingInfo } = useGetMyInfoQuery();
  const { isLoading: isLoadingRole } = useGetRoleQuery(userId);
  const { isLoading: isLoadingAvatar } = useGetAvatarQuery(userId);
  const isLoading = isLoadingAvatar || isLoadingInfo || isLoadingRole;

  useEffect(() => {
    dispatch(handleLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <main className="main-layout">{props.children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
