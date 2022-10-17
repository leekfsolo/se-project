import React, { useMemo, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminSidenavOption } from "./model";
import AdminBreadCrumb from "./template/AdminBreadCrumb";
import Sidenav from "./template/Sidenav";
import PeopleIcon from "@mui/icons-material/People";
import HubIcon from "@mui/icons-material/Hub";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { PageUrl } from "../../configuration/enum";
import { useAppDispatch } from "../../app/hooks";
import { handleLoading } from "../../app/globalSlice";
import { logout } from "../Auth/authSlice";
import customToast, {
  ToastType,
} from "../../components/CustomToast/customToast";
import { useTranslation } from "react-i18next";

const StaffsManagement = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [sidenavOptions, setSidenavOptions] = useState<
    Array<AdminSidenavOption>
  >([
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      page: PageUrl.DASHBOARD,
      isActive: true,
    },
    {
      label: "Quản lý nhân viên",
      icon: <PeopleIcon />,
      page: PageUrl.STAFF_MANAGEMENT,
      isActive: false,
    },
    {
      label: "Quản lý MCP",
      icon: <HubIcon />,
      page: PageUrl.MCP_MANAGEMENT,
      isActive: false,
    },
    {
      label: "Quản lý phương tiện",
      icon: <DriveEtaIcon />,
      page: PageUrl.VEHICLE_MANAGEMENT,
      isActive: false,
    },
    {
      label: "Đăng ký",
      icon: <AssignmentIcon />,
      page: PageUrl.SIGNUP,
      isActive: false,
    },
    {
      label: "Đăng xuất",
      icon: <LogoutIcon />,
      page: PageUrl.LOGOUT,
      isActive: false,
    },
  ]);

  const activeSidenavTitle = useMemo(() => {
    const title = sidenavOptions.find((opt) => opt.isActive)?.label;
    return title ? title : "Dashboard";
  }, [sidenavOptions]);

  const logoutHandler = async () => {
    dispatch(handleLoading(true));
    const logoutResult: any = await dispatch(logout()).unwrap();
    const { message, success } = logoutResult;
    if (success) {
      navigate(`/${PageUrl.AUTH}/${PageUrl.LOGIN}`);
      customToast(ToastType.SUCCESS, t(`${message}`));
    } else {
      customToast(ToastType.ERROR, t(`${message}`));
    }
    dispatch(handleLoading(false));
  };

  const changeActiveNavOption = (option: AdminSidenavOption) => {
    const newSidenavOptions = sidenavOptions.map((opt) => {
      opt.isActive = option.label === opt.label;
      return opt;
    });
    setSidenavOptions(newSidenavOptions);
    if (option.page === PageUrl.SIGNUP) {
      navigate(`/${PageUrl.AUTH}/${PageUrl.SIGNUP}`);
      return;
    } else if (option.page === PageUrl.LOGOUT) {
      logoutHandler()
        .then((res) => {})
        .catch((err) => {});
      return;
    }
    navigate(option.page);
  };

  useEffect(() => {
    navigate(activeSidenavTitle.toLowerCase(), { replace: true });
  }, []);

  return (
    <div className="h-100 admin">
      <div className="h-100">
        <Sidenav
          sidenavOptions={sidenavOptions}
          changeActiveNavOption={changeActiveNavOption}
        />

        <div className="admin-page">
          <AdminBreadCrumb title={activeSidenavTitle} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StaffsManagement;
