import React from "react";

import useGetJWT from "../../utils/hooks/useGetJWT";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../pages/Auth/authSlice";
import { LogoBK } from "../../assets";
import Globe from "../Globe/Globe";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import customToast, { ToastType } from "../CustomToast/customToast";
import { useTranslation } from "react-i18next";
import { handleLoading } from "../../app/globalSlice";
import { PageUrl } from "../../configuration/enum";
import { useSelector } from "react-redux";
import { authSelector, userSelector } from "../../app/selector";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuthorized = useGetJWT() ? true : false;
  const avatar = useSelector(userSelector).avatar;
  const username = useSelector(authSelector).auth.userName;

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

  const navigateTo = (path: string) => {
    handleCloseUserMenu();
    if (path === "logout") {
      logoutHandler()
        .then((res) => {})
        .catch((err) => {});
      return;
    }
    navigate(`/${path}`);
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {isAuthorized ? (
        <header>
          <div className="container">
            <div className="row m-0 px-0 py-2">
              <div className="col d-flex align-items-center gap-4">
                <img src={LogoBK} alt="" className="img-fluid" width={60} />
                <nav className="menu-list d-flex align-items-center gap-3">
                  <div className="menu-item">Trang chủ</div>
                  <div className="menu-item">Tổng quan</div>
                  <div className="menu-item">Lịch làm việc</div>
                </nav>
              </div>
              <div className="col d-flex align-items-center justify-content-end gap-4">
                <Globe CStyle={{ fill: "#999" }} />
                <NotificationsNoneOutlinedIcon sx={{ fill: "#999" }} />
                <ChatBubbleOutlineOutlinedIcon
                  sx={{ fill: "#999", cursor: "pointer" }}
                  onClick={() => navigateTo(PageUrl.CHAT)}
                />
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="user-avatar" src={avatar}>
                        {username.slice(0, 2)}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => navigateTo(setting.toLowerCase())}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
