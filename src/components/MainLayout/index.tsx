import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { handleLoading } from "../../app/globalSlice";
import { useAppDispatch } from "../../app/hooks";
import { authSelector } from "../../app/selector";
import { getMyInfo } from "../../pages/Auth/authSlice";
import { getUserAvatar, getUserRole } from "../../pages/Profile/userSlice";
import Footer from "../Footer";
import Header from "../Header";

type Props = {
  children: React.ReactElement;
};

const MainLayout = (props: Props) => {
  const dispatch = useAppDispatch();
  const userId = useSelector(authSelector).auth.id;

  useEffect(() => {
    dispatch(handleLoading(true));
    const fetchData = async () => {
      await dispatch(getMyInfo());
      await dispatch(getUserRole(userId));
      await dispatch(getUserAvatar(userId));
      dispatch(handleLoading(false));
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main className="main-layout">{props.children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
